import { supabase } from '../auth';
import { getUserHHID, getUserHMID } from './housemates-data';

const currentListType = () => window.location.pathname.split('/')[1];
const currentListID = () => window.location.pathname.split('/')[2];

const getLists = async () => {
  const hhid = await getUserHHID();
  const { data } = await supabase.from('lists').select('*').eq('hh_id', hhid);

  return data;
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

const generateLists = async () => {
  const hhid = await getUserHHID();
  await supabase.from('lists').insert([
    { hh_id: hhid, type: 'todo', name: 'To-Do' },
    { hh_id: hhid, type: 'grocery', name: 'Groceries' },
    { hh_id: hhid, type: 'shopping', name: 'Shopping' },
    { hh_id: hhid, type: 'maintenance', name: 'Maintenance' },
    { hh_id: hhid, type: 'cleaning', name: 'Cleaning' },
    { hh_id: hhid, type: 'bulletin', name: 'Bulletin Board' },
    { hh_id: hhid, type: 'pets', name: 'Pets' },
  ]);
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
  getLists,
  getListByType,
  getListByID,
  getListID,
  createList,
  deleteList,
  generateLists,
  setListName,
  setListHidden,
  setListPrivate,
};
