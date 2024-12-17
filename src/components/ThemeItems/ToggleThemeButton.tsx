import React from 'react';
import './styles.css';
import { Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { UseTheme } from '../../modules/ThemeProvider';

const ToggleThemeButton = () => {
  const { isDarkMode, toggleTheme } = UseTheme();

  return (
    <Button
      onClick={toggleTheme}
      className={isDarkMode ? 'dark-mode' : 'light-mode'}
    >
      {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
    </Button>
  );
};

export default ToggleThemeButton;
