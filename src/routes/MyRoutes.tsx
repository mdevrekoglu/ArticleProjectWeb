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
import Loader from '../components/Loader/Loader';
import UserPanel from '../pages/UserPanel/UserPanel';
import Researcher from '../pages/Researcher/Researcher';
import SearchArticle from '../pages/SearchArticle/SearchArticle';
import Journal from '../pages/Journal/Journal';
import Department from '../pages/Department/Department';
import UserNotification from '../pages/UserNotification/UserNotification';
import Notification from '../pages/Notification/Notification';
import ResearcherDetail from '../pages/ResearcherDetail/ResearcherDetail';

const PrivateRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!authenticated) {
    return <Navigate to='/authentication/login' replace />;
  }

  return <Outlet />;
};

const MyRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

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
          <Route path='/department' element={<Department />} />
          <Route path='/search-collaborator' element={<SearchCollaborator />} />
          <Route path='/user-panel' element={<UserPanel />} />
          <Route path='/researcher' element={<Researcher />} />
          <Route
            path='/researcher/detail/:id/:origin'
            element={<ResearcherDetail />}
          />
          <Route path='/search-article' element={<SearchArticle />} />
          <Route path='/journal' element={<Journal />} />
          <Route path='/user-notification' element={<UserNotification />} />
          <Route path='/notification' element={<Notification />} />
        </Route>
      </Route>

      <Route
        path='*'
        element={
          <Navigate to={authenticated ? '/home' : '/authentication/login'} />
        }
      />
    </Routes>
  );
};

export default MyRoutes;
