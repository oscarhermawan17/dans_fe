import { createContext } from 'react';
import { useCookies } from 'react-cookie';

import { userLogin } from "../../utils/api/auth"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookie, setCookie, removeCookie] = useCookies(['token']);
  const token = cookie?.token;

  const login = async (values) => {
    try {
      const res = await userLogin(values);
      setCookie('token', res.token, { path: '/' });
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
