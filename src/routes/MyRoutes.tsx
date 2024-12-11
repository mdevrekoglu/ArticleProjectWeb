import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import Home from '../pages/Home/Home';
import ForgotPassword from '../pages/Authentication/ForgotPassword/ForgotPassword';
import ResendConfirmEmail from '../pages/Authentication/ResendConfirmEmail/ResendConfirmEmail';
import { useAuth } from '../modules/AuthContext';
import ResetPassword from '../pages/Authentication/ResetPassword/ResetPassword';
import ConfirmEmail from '../pages/Authentication/ConfirmEmail/ConfirmEmail';

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = useAuth();

  if (!authenticated) return <Navigate to='/authentication/login' replace />;

  return <Outlet />;
};

const MyRoutes = (props: Props) => {
  return (
    <Router>
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
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Route>
    </Router>
  );
};

export default MyRoutes;
