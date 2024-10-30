import React, { useState } from 'react';
import SideBar from './components/SideBar';

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />;
};

export default Home;
