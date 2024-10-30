import React from 'react';
import { Button, Layout, theme } from 'antd';
import Logo from './Logo';
import MenuList from './MenuList';
import ToggleThemeButton from '../../../components/ToggleThemeButton';
import './styles.css';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { UseAuth } from '../../../modules/AuthContext';
import { UseTheme } from '../../../theme/ThemeProvider';

const { Header, Sider } = Layout;

interface SideBarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  collapsed,
  toggleCollapsed
}) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const { logout } = UseAuth();
  const { isDarkMode, toggleTheme } = UseTheme();

  return (
    <Layout>
      <Sider
        className='sider'
        collapsed={collapsed}
        collapsible
        theme={isDarkMode ? 'dark' : 'light'}
        trigger={null}
      >
        <Logo />
        <MenuList darkTheme={isDarkMode} toggleTheme={toggleTheme} />
        <ToggleThemeButton />
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
