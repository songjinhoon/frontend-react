import client from './client';

const ROOT_PATH = 'auth';

export const signin = ({ username, password }) =>
  client.post(`/${ROOT_PATH}/signin`, { username, password });

export const signup = ({ username, password }) =>
  client.post(`/${ROOT_PATH}/signup`, { username, password });

export const check = () => client.get(`/${ROOT_PATH}/check`);
