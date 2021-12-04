import { supabase } from '../auth';

const getHousemates = async () => {
  const { data } = await supabase
    .from('housemates')
    .select('uid');
  return console.warn(data);
};

const getHousemate = async (uid) => {
  const { data } = await supabase
    .from('housemates')
    .select('*')
    .eq('uid', uid);

  return data[0] ? data[0] : null;
};

export {
  getHousemates,
  getHousemate,
};
