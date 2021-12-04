import { supabase } from '../auth';

const getHouseholds = async () => {
  const { data } = await supabase
    .from('households')
    .select();
  return console.warn(data);
};

export default getHouseholds;
