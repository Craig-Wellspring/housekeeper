import { currentUser, supabase } from '../auth';

const getHousemates = async () => {
  const { data } = await supabase.from('housemates').select('uid');
  return console.warn(data);
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

  return hm.hh_id;
};

const createHousemate = async () => {
  const user = currentUser();
  const { data } = await supabase
    .from('housemates')
    .insert([{ name: user.user_metadata.name, uid: user.id }]);

  return data;
};

const joinHousehold = async (hhID) => {
  const { data } = await supabase
    .from('housemates')
    .update({ hh_id: hhID })
    .eq('uid', currentUser().id);

  return data;
};

const leaveHousehold = async () => {
  await supabase
    .from('housemates')
    .update({ hh_id: null })
    .eq('uid', currentUser().id);
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
  getHousemates,
  getHousemate,
  getUserHHID,
  createHousemate,
  joinHousehold,
  leaveHousehold,
  updateHousemateName,
};
