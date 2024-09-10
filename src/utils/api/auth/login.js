import { APIClient } from '../client';

export const userLogin = async (value) => {
  try {
    const response = await APIClient.post(`/api/${import.meta.env.VITE_BE_API_VERSION}/auth/login`, value);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

