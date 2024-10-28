import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from '../modules/AuthContext';
import Login from '../pages/Authentication/Login/Login';
import Register from '../pages/Authentication/Register/Register';
import Home from '../pages/Home/Home';

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = UseAuth();

  if (!authenticated) return <Navigate to='/authentication/login' replace />;

  return <Outlet />;
};

const MyRoutes = (props: Props) => {
  return (
    <Router>
      <Route path='/authentication/login' element={<Login />} />
      <Route path='/authentication/register' element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Route>
    </Router>
  );
};

export default MyRoutes;
