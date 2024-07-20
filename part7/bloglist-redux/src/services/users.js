import axios from 'axios';

const baseUrl = '/api/users';

const getUsers = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const getUserById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`);
  return data;
};

export default { getUsers, getUserById };
