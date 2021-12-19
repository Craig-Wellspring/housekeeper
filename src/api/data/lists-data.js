import { supabase } from '../auth';
import { getHousemate, getUserHHID, getUserHMID } from './households-data';

const currentListType = () => window.location.pathname.split('/')[1];
const currentListID = () => window.location.pathname.split('/')[2];
const sortLists = (a, b) => a.name.localeCompare(b.name);

const getLists = async () => {
  const hm = await getHousemate();
  const { data } = await supabase.from('lists').select('*').eq('hh_id', hm.hh_id);
  const filteredLists = data.filter((list) => !list.private || list.hm_id === hm.id);
  const sortedLists = filteredLists.sort(sortLists);

  return sortedLists;
};

const getListByType = async () => {
  const hhid = await getUserHHID();
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhid)
    .eq('type', currentListType());

  return data[0];
};

const getListByID = async (listID) => {
  const hhid = await getUserHHID();
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhid)
    .eq('id', listID);

  return data[0];
};

const getListID = async () => {
  const id = currentListID() || await getListByType().then((list) => list.id);

  return id;
};

const createList = async () => {
  const hhid = await getUserHHID();
  const hmid = await getUserHMID();
  await supabase.from('lists').insert(
    {
      hh_id: hhid, hm_id: hmid, name: 'Custom List', type: 'custom',
    },
  );
};

const deleteList = async (listID) => {
  await supabase.from('lists').delete().eq('id', listID);
};

const setListName = async (id, string) => {
  await supabase
    .from('lists')
    .update({ name: string })
    .eq('id', id);
};

const setListHidden = async (id, bool) => {
  await supabase
    .from('lists')
    .update({ hidden: bool })
    .eq('id', id);
};

const setListPrivate = async (id, bool) => {
  await supabase
    .from('lists')
    .update({ private: bool })
    .eq('id', id);
};

export {
  currentListType,
  currentListID,
  sortLists,
  getLists,
  getListByType,
  getListByID,
  getListID,
  createList,
  deleteList,
  setListName,
  setListHidden,
  setListPrivate,
};
