import { supabase } from '../auth';
import { getUserHHID } from './housemates-data';

const currentListType = () => window.location.pathname.replace('/', '');

const getLists = async () => {
  const hhid = await getUserHHID();
  const { data } = await supabase.from('lists').select('*').eq('hh_id', hhid);

  return data;
};

const getList = async () => {
  const hhid = await getUserHHID();
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhid)
    .eq('type', currentListType());

  return data[0];
};

const getListID = async () => {
  const list = await getList();

  return list.id;
};

const getListData = async (type) => {
  const hhid = await getUserHHID();
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhid)
    .eq('type', type);

  return data[0];
};

const generateLists = async () => {
  const hhid = await getUserHHID();
  await supabase.from('lists').insert([
    { hh_id: hhid, type: 'todo' },
    { hh_id: hhid, type: 'grocery' },
    { hh_id: hhid, type: 'shopping' },
    { hh_id: hhid, type: 'maintenance' },
    { hh_id: hhid, type: 'cleaning' },
    { hh_id: hhid, type: 'bulletin' },
    { hh_id: hhid, type: 'pets' },
  ]);
};

const setListHidden = async (id, bool) => {
  await supabase
    .from('lists')
    .update({ hidden: bool })
    .eq('id', id);
};

export {
  getLists,
  getList,
  getListData,
  getListID,
  generateLists,
  currentListType,
  setListHidden,
};
