import { supabase } from '../auth';
import { getUserHHID, joinHousehold } from './housemates-data';
import { generateLists } from './lists-data';

const getHousehold = async () => {
  const hhID = await getUserHHID();
  const { data } = await supabase.from('households').select('*').eq('id', hhID);
  return data[0];
};

const createHousehold = async (name, id) => {
  const { data } = await supabase
    .from('households')
    .insert([
      { name, HoH_id: id, invite_code: crypto.randomUUID().substring(0, 6) },
    ]);

  await joinHousehold(data[0].id);
  generateLists();

  return data[0];
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
  const hhID = await getUserHHID();
  await supabase.from('households').delete().eq('id', hhID);
  await supabase.from('housemates').update({ hh_id: null }).eq('hh_id', hhID);
  const { data } = await supabase.from('lists').select('id').eq('hh_id', hhID);
  const listIDArray = data.map((list) => list.id);
  await supabase.from('items').delete().in('list_id', listIDArray);
  await supabase.from('lists').delete().eq('hh_id', hhID);
};

const getJoinCode = async () => {
  const hhID = await getUserHHID();
  const { data } = await supabase
    .from('households')
    .select('invite_code')
    .eq('id', hhID);

  return data[0].invite_code || 'No code';
};

const validateJoinCode = async (code) => {
  const { data } = await supabase
    .from('households')
    .select('id')
    .eq('invite_code', code);

  return data[0]?.id;
};

export {
  getHousehold,
  createHousehold,
  updateHouseholdName,
  deleteHousehold,
  getJoinCode,
  validateJoinCode,
};
