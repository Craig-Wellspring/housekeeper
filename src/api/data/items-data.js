import { supabase } from '../auth';
import { getUserHMID } from './households-data';
import { getListID } from './lists-data';

const getItems = async () => {
  const listID = await getListID();
  const { data } = await supabase
    .from('items')
    .select('*')
    .eq('list_id', listID);

  return data;
};

const getItem = async (itemID) => {
  const { data } = await supabase.from('items').select('*').eq('id', itemID);

  return data;
};

const createItem = async (name) => {
  const listID = await getListID();
  const HMID = await getUserHMID();
  await supabase.from('items').insert({ list_id: listID, hm_id: HMID, name });

  return getItems();
};

const deleteItem = async (itemID) => {
  await supabase.from('items').delete().eq('id', itemID);

  return getItems();
};

const setItemComplete = async (itemID, bool) => {
  await supabase
    .from('items')
    .update({
      completed: bool,
    })
    .eq('id', itemID);

  return bool;
};

const updateItemName = async (itemID, string) => {
  await supabase
    .from('items')
    .update({
      name: string,
    })
    .eq('id', itemID);

  return getItems();
};

export {
  getItems,
  getItem,
  createItem,
  deleteItem,
  setItemComplete,
  updateItemName,
};
