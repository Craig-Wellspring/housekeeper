import { supabase } from '../auth';

const getLists = async (hhID) => {
  const { data } = await supabase
    .from('lists')
    .select('*')
    .eq('hh_id', hhID);

  return data;
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

export { getLists, generateLists };
