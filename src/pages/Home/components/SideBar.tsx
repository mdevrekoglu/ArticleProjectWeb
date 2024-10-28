import React from 'react';
import { Button, Layout, theme } from 'antd';
import Logo from './Logo';
import MenuList from './MenuList';
import ToggleThemeButton from './ToggleThemeButton';
import './MenuStyles.css';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { UseAuth } from '../../../modules/AuthContext';

const { Header, Sider } = Layout;

interface SideBarProps {
  darkTheme: boolean;
  toggleTheme: () => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  darkTheme,
  toggleTheme,
  collapsed,
  toggleCollapsed
}) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const { logout } = UseAuth();

  return (
    <Layout>
      <Sider
        className='sider'
        collapsed={collapsed}
        collapsible
        theme={darkTheme ? 'dark' : 'light'}
        trigger={null}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} toggleTheme={toggleTheme} />
        <ToggleThemeButton
          darkTheme={darkTheme}
          toggleTheme={toggleTheme}
          collapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            className='collapse-btn'
            onClick={toggleCollapsed}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Button
            icon={<LogoutOutlined />}
            className='log-out-btn'
            onClick={logout}
          />
        </Header>
      </Layout>
    </Layout>
  );
};

export default SideBar;
