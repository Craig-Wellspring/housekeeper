import { currentUser, supabase } from '../auth';
import { updateHousemate } from './housemates-data';
import { generateLists } from './lists-data';

const getHouseholds = async () => {
  const { data } = await supabase
    .from('households')
    .select();
  return data;
};

const createHousehold = async (name, id) => {
  const { data } = await supabase
    .from('households')
    .insert([
      { name, HoH_id: id },
    ]);

  updateHousemate(currentUser().id, data[0].id);
  generateLists(data[0].id);

  return data[0];
};

export {
  getHouseholds,
  createHousehold,
};
