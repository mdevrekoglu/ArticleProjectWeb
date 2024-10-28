import React, { useState } from 'react';
import SideBar from './components/SideBar';

const Home = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SideBar
      darkTheme={darkTheme}
      toggleTheme={toggleDarkTheme}
      collapsed={collapsed}
      toggleCollapsed={toggleCollapsed}
    />
  );
};

export default Home;
