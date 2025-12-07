import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({children}){
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ft_user'));
    } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('ft_token') || null);

  useEffect(()=>{
    if(token){
      localStorage.setItem('ft_token', token);
      api.setToken(token);
    } else {
      localStorage.removeItem('ft_token');
      api.setToken(null);
    }
  }, [token]);

  useEffect(()=>{
    if(user) localStorage.setItem('ft_user', JSON.stringify(user));
    else localStorage.removeItem('ft_user');
  }, [user]);

  const login = (userObj, jwt) => {
    setUser(userObj);
    setToken(jwt);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{user, token, login, logout}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
