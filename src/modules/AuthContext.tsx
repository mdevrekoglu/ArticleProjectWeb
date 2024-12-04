import { jwtDecode } from 'jwt-decode';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../models/UserModel';

type Props = {
  children: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  user: UserModel | null;
  login: (token: string) => void;
  logout: () => void;
};

const initialValue: IAuthContext = {
  authenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
};

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const decodedToken = jwtDecode<any>(token);

      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      } else {
        localStorage.removeItem('authToken');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      return false;
    }
  }
  return false;
};

const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState<UserModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwtDecode<any>(token);

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
        } catch (error) {
          localStorage.removeItem('authToken');
          setUser(null);
        }
      } else {
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [authenticated]);

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
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
