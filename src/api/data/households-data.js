import { currentUser, supabase } from '../auth';

const removeAllSubscriptions = () => {
  const subs = supabase.getSubscriptions();
  const activeSubs = subs.filter((sub) => sub.isJoined());
  activeSubs.forEach((aSub) => supabase.removeSubscription(aSub));
};

const getHousemate = async () => {
  const { data } = await supabase
    .from('housemates')
    .select('*')
    .eq('uid', currentUser().id);
  return data[0] ? data[0] : null;
};

const getUserHHID = async () => {
  const hm = await getHousemate();
  return hm?.hh_id;
};

const getUserHMID = async () => {
  const hm = await getHousemate();
  return hm.id;
};

const getHousehold = async () => {
  const HHID = await getUserHHID();
  const { data } = await supabase.from('households').select('*').eq('id', HHID);
  return data[0];
};

const getHouseholdByHHID = async (HHID) => {
  const { data } = await supabase.from('households').select('*').eq('id', HHID);
  return data[0];
};

const increaseHMCount = async (HHID) => {
  const hh = await getHouseholdByHHID(HHID);
  await supabase
    .from('households')
    .update({ hm_count: hh.hm_count + 1 })
    .eq('id', HHID);
};

const decreaseHMCount = async (HHID) => {
  const hh = await getHouseholdByHHID(HHID);
  await supabase
    .from('households')
    .update({ hm_count: hh.hm_count - 1 })
    .eq('id', HHID);
};

const joinHousehold = async (HHID) => {
  const { data } = await supabase
    .from('housemates')
    .update({ hh_id: HHID })
    .eq('uid', currentUser().id);
  return data;
};

const generateLists = async () => {
  const hhid = await getUserHHID();
  await supabase.from('lists').insert([
    { hh_id: hhid, type: 'todo', name: 'To-Do' },
    { hh_id: hhid, type: 'grocery', name: 'Groceries' },
    { hh_id: hhid, type: 'shopping', name: 'Shopping' },
    { hh_id: hhid, type: 'maintenance', name: 'Maintenance' },
    { hh_id: hhid, type: 'cleaning', name: 'Cleaning' },
    { hh_id: hhid, type: 'bulletin', name: 'Bulletin Board' },
    // { hh_id: hhid, type: 'pets', name: 'Pets' },
  ]);
};

const createHousehold = async (name, id) => {
  const { data } = await supabase.from('households').insert([
    {
      name,
      HoH_id: id,
      hm_count: 0,
      invite_code: crypto.randomUUID().substring(0, 6),
    },
  ]);
  await joinHousehold(data[0].id);
  generateLists();
  return data[0].id;
};

const updateHouseholdName = async (string) => {
  const hhID = await getUserHHID();
  const { data } = await supabase
    .from('households')
    .update({ name: string })
    .eq('id', hhID);
  return data[0].name;
};

const deleteHousehold = async () => {
  removeAllSubscriptions();
  const hhID = await getUserHHID();
  await supabase.from('households').delete().eq('id', hhID);
  await supabase.from('housemates').update({ hh_id: null }).eq('hh_id', hhID);
  const { data } = await supabase.from('lists').select('id').eq('hh_id', hhID);
  const listIDArray = data.map((list) => list.id);
  await supabase.from('items').delete().in('list_id', listIDArray);
  await supabase.from('lists').delete().eq('hh_id', hhID);
};

// INVITE CODE MANAGEMENT

const getJoinCode = async () => {
  const HHID = await getUserHHID();
  const { data } = await supabase
    .from('households')
    .select('invite_code')
    .eq('id', HHID);
  return data[0].invite_code || 'No code';
};

const validateJoinCode = async (code) => {
  const { data } = await supabase
    .from('households')
    .select('id')
    .eq('invite_code', code);
  return data[0]?.id;
};

const regenerateJoinCode = async () => {
  const HHID = await getUserHHID();
  const { data } = await supabase
    .from('households')
    .update({ invite_code: crypto.randomUUID().substring(0, 6) })
    .eq('id', HHID);
  return data[0].invite_code;
};

// HOUSEMATES MANAGEMENT

const getHousemateByID = async (HMID) => {
  const { data } = await supabase
    .from('housemates')
    .select('*')
    .eq('id', HMID);
  return data[0] ? data[0] : null;
};

const getHousematesByHHID = async (HHID) => {
  const { data } = await supabase
    .from('housemates')
    .select('*')
    .eq('hh_id', HHID);
  return data;
};

const createHousemate = async () => {
  const user = currentUser();
  const { data } = await supabase
    .from('housemates')
    .insert([{ name: user.user_metadata.name, uid: user.id }]);
  return data;
};

const promoteHousemate = async (HMID) => {
  const HHID = await getUserHHID();
  await supabase
    .from('households')
    .update({ HoH_id: HMID })
    .eq('id', HHID);
};

const leaveHousehold = async () => {
  const hh = await getHousehold();
  const hm = await getHousemate();
  if (hh.HoH_id === hm.id) {
    const mates = await getHousematesByHHID(hh.id);
    const filteredMates = mates.filter((mate) => mate.id !== hm.id);
    if (filteredMates.length > 0) {
      await decreaseHMCount(hh.id);
      promoteHousemate(filteredMates[0].id);
      removeAllSubscriptions();
      await supabase
        .from('housemates')
        .update({ hh_id: null })
        .eq('uid', currentUser().id);
    } else {
      deleteHousehold();
    }
  } else {
    await decreaseHMCount(hh.id);
    removeAllSubscriptions();
    await supabase
      .from('housemates')
      .update({ hh_id: null })
      .eq('uid', currentUser().id);
  }
};

const removeHousemate = async (HMID) => {
  const hh = await getHousehold();
  await supabase
    .from('housemates')
    .update({ hh_id: null })
    .eq('id', HMID);
  await decreaseHMCount(hh.id);
};

const updateHousemateName = async (string) => {
  const hm = await getHousemate();
  const { data } = await supabase
    .from('housemates')
    .update({ name: string })
    .eq('id', hm.id);
  return data[0].name;
};

export {
  getHousemate,
  getUserHMID,
  getUserHHID,
  getHousehold,
  increaseHMCount,
  createHousehold,
  joinHousehold,
  updateHouseholdName,
  deleteHousehold,
  getJoinCode,
  validateJoinCode,
  regenerateJoinCode,
  getHousemateByID,
  getHousematesByHHID,
  promoteHousemate,
  createHousemate,
  leaveHousehold,
  removeHousemate,
  updateHousemateName,
};
