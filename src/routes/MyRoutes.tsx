import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import Home from '../pages/Home/Home';
import ForgotPassword from '../pages/Authentication/ForgotPassword/ForgotPassword';
import ResendConfirmEmail from '../pages/Authentication/ResendConfirmEmail/ResendConfirmEmail';
import { useAuth } from '../modules/AuthContext';
import ResetPassword from '../pages/Authentication/ResetPassword/ResetPassword';
import ConfirmEmail from '../pages/Authentication/ConfirmEmail/ConfirmEmail';
import Affiliation from '../pages/Affiliation/Affiliation';
import PrivateLayout from './PrivateLayout';
import Faculty from '../pages/Faculty/Faculty';
import SearchCollaborator from '../pages/SearchCollaborator/SearchCollaborator';

type Props = {};

// Private Routes Wrapper
const PrivateRoutes = () => {
  const { authenticated } = useAuth();

  if (!authenticated) return <Navigate to='/authentication/login' replace />;

  return <Outlet />;
};

// Catch-All Redirect for Unauthenticated Users
const AuthRedirect = () => {
  return <Navigate to='/authentication/login' replace />;
};

// Catch-All Redirect for Authenticated Users
const AuthenticatedRedirect = () => {
  return <Navigate to='/home' replace />;
};

const MyRoutes = (props: Props) => {
  const { authenticated } = useAuth(); // Check user authentication

  return (
    <Routes>
      <Route path='/authentication/login' element={<Login />} />
      <Route path='/authentication/register' element={<Register />} />
      <Route
        path='/authentication/forgot-password'
        element={<ForgotPassword />}
      />
      <Route
        path='/authentication/resend-confirm-email'
        element={<ResendConfirmEmail />}
      />
      <Route
        path='/authentication/reset-password'
        element={<ResetPassword />}
      />
      <Route path='/authentication/confirm-email' element={<ConfirmEmail />} />

      <Route element={<PrivateRoutes />}>
        <Route element={<PrivateLayout />}>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<Home />} />
          <Route path='/affiliation' element={<Affiliation />} />
          <Route path='/faculty' element={<Faculty />} />
          <Route path='/search-collaborator' element={<SearchCollaborator />} />
          <Route path='*' element={<AuthenticatedRedirect />} />
        </Route>
      </Route>

      {!authenticated && <Route path='*' element={<AuthRedirect />} />}
    </Routes>
  );
};

export default MyRoutes;
