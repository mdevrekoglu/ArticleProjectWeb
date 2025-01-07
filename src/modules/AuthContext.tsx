import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../models/UserModel';
import {
  userTokenInputModel,
  userTokenOutputModel
} from '../pages/Authentication/Login/models';
import ApiService from './ApiService';
import { jwtDecode } from 'jwt-decode';

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  user: UserModel | null;
  login: (token: string, refreshToken?: string) => void;
  logout: () => void;
  loading: boolean;
};

const initialValue: IAuthContext = {
  authenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: false
};

const AuthContext = createContext<IAuthContext>(initialValue);

let refreshPromise: Promise<void> | null = null; // Singleton promise guard

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const decodedToken = jwtDecode<any>(token);

          if (decodedToken.exp * 1000 > Date.now()) {
            setAuthenticated(true);
            setUserFromToken(decodedToken);
          } else {
            await handleTokenRefresh();
          }
        } catch (error) {
          resetLocalStorage();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTokenRefresh = async () => {
    if (!refreshPromise) {
      refreshPromise = new Promise(async (resolve, reject) => {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const token = localStorage.getItem('authToken');

          if (refreshToken && token) {
            const userRefreshTokenData: userTokenInputModel = {
              token,
              refreshToken
            };

            const response = await ApiService.UsePost<
              userTokenInputModel,
              userTokenOutputModel
            >('/Authentication/RefreshToken', userRefreshTokenData);

            if (response.isSuccessed) {
              localStorage.setItem('authToken', response.token);
              localStorage.setItem('refreshToken', response.refreshToken);
              setAuthenticated(true);
              setUserFromToken(jwtDecode<any>(response.token));
            } else {
              resetLocalStorage();
            }
          } else {
            resetLocalStorage();
          }

          resolve();
        } catch (error) {
          resetLocalStorage();
          reject(error);
        } finally {
          refreshPromise = null;
        }
      });
    }

    return refreshPromise;
  };

  const resetLocalStorage = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setAuthenticated(false);
    setUser(null);
  };

  const setUserFromToken = (decodedToken: any) => {
    const user: UserModel = {
      userFirstName:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ],
      userLastName:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
        ],
      userId:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ],
      userEmail:
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
        ],
      roles: [
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
      ],
      exp: decodedToken.exp,
      iss: decodedToken.iss,
      aud: decodedToken.aud
    };

    setUser(user);
  };

  const login = (token: string, refreshToken?: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken || '');
    setAuthenticated(true);
    navigate('/home');
  };

  const logout = () => {
    resetLocalStorage();
    navigate('/authentication/login');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
