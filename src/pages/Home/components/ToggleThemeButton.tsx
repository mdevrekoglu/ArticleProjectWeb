import React from 'react';
import { Button } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import './MenuStyles.css';

// Define the interface for the props
interface ToggleThemeButtonProps {
  darkTheme: boolean;
  toggleTheme: () => void;
  collapsed: boolean;
}

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({
  darkTheme,
  toggleTheme,
  collapsed
}) => {
  return (
    <div className='toggle-theme-btn'>
      <Button
        onClick={toggleTheme}
        className={`toggle-theme-btn ${
          darkTheme ? 'dark-mode' : 'light-mode'
        } ${collapsed ? 'ttb-collapsed' : 'ttb-expanded'}`}
      >
        {darkTheme ? <SunOutlined /> : <MoonOutlined />}
      </Button>
    </div>
  );
};

export default ToggleThemeButton;
