import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  login: (token: string) => void;
  logout: () => void;
};

const initialValue: IAuthContext = {
  authenticated: false,
  setAuthenticated: () => {},
  login: () => {},
  logout: () => {}
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authToken') ? true : false
  );
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setAuthenticated(true);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthenticated(false);
    navigate('/authentication/login');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
