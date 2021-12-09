import { supabase } from '../auth';
import { getUserHHID, getUserHMID } from './housemates-data';

const getCustomLists = async () => {
  const hhid = await getUserHHID();
  const { data } = await supabase.from('custom_lists').select('*').eq('hh_id', hhid);

  return data;
};

const getCList = async (listID) => {
  const { data } = await supabase
    .from('custom_lists')
    .select('*')
    .eq('id', listID);

  return data[0];
};

const createCList = async () => {
  const hhid = await getUserHHID();
  const hmid = await getUserHMID();
  await supabase.from('custom_lists').insert(
    { hh_id: hhid, hm_id: hmid, name: 'Custom List' },
  );
};

const setCListID = async (id, hmID) => {
  await supabase
    .from('custom_lists')
    .update({ hm_id: hmID })
    .eq('id', id);
};

const setCListPrivate = async (id, bool) => {
  await supabase
    .from('custom_lists')
    .update({ hidden: bool })
    .eq('id', id);
};

const setCListName = async (id, string) => {
  await supabase
    .from('custom_lists')
    .update({ name: string })
    .eq('id', id);
};

const setCListHidden = async (id, bool) => {
  await supabase
    .from('custom_lists')
    .update({ hidden: bool })
    .eq('id', id);
};

export {
  getCustomLists,
  getCList,
  createCList,
  setCListHidden,
  setCListID,
  setCListPrivate,
  setCListName,
};
