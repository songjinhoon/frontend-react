import client from './client';

const ROOT_PATH = 'auth';

export const signin = ({ id, pwd }) => client.post(`/${ROOT_PATH}/signin`, { id, pwd });

export const signup = ({ id, pwd, nm }) => client.post(`/${ROOT_PATH}/signup`, { id, pwd, nm });

export const check = () => client.get(`/${ROOT_PATH}/check`);

// export const logout = () => client.post(`/${ROOT_PATH}/logout`);
