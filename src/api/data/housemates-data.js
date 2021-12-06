import { currentUser, supabase } from '../auth';

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

const createHousemate = async () => {
  const user = currentUser();
  const { data } = await supabase
    .from('housemates')
    .insert([
      { name: user.user_metadata.name, uid: user.id },
    ]);

  return data;
};

const updateHousemate = async (uid, hhID) => {
  const { data } = await supabase
    .from('housemates')
    .update({ hh_id: hhID })
    .eq('uid', uid);

  return data;
};

export {
  getHousemates,
  getHousemate,
  createHousemate,
  updateHousemate,
};
