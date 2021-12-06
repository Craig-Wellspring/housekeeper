import { supabase } from '../auth';
import { getUserHHID } from './housemates-data';

const getLists = async (hhID) => {
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhID);

  return data;
};

const getList = async (hhID, type) => {
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhID)
    .eq('type', type);

  return data[0];
};

const currentListType = () => window.location.pathname.replace('/', '');

const getListID = async () => {
  const hhid = await getUserHHID();
  const list = await getList(hhid, currentListType());

  return list.id;
};

const generateLists = async (hhID) => {
  await supabase.from('lists').insert([
    { hh_id: hhID, type: 'todo' },
    { hh_id: hhID, type: 'grocery' },
    { hh_id: hhID, type: 'shopping' },
    { hh_id: hhID, type: 'maintenance' },
    { hh_id: hhID, type: 'cleaning' },
    { hh_id: hhID, type: 'bulletin' },
    { hh_id: hhID, type: 'pets' },
  ]);
};

export {
  getLists, getList, getListID, generateLists,
};
