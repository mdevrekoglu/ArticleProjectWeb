import React from 'react';
import { Layout, Button, theme } from 'antd';
import MenuList from './MenuList';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import './styles.css';
import { useAuth } from '../../modules/AuthContext';

const { Header, Sider } = Layout;

interface SideBarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, onCollapseChange }) => {
  const { logout } = useAuth();
  const { token } = theme.useToken();

  const toggleCollapsed = () => {
    onCollapseChange(!collapsed);
  };

  return (
    <>
      <Sider
        className='sider'
        collapsed={collapsed}
        collapsible
        trigger={null}
        width={200}
        style={{ height: '100vh', position: 'fixed', left: 0 }}
      >
        <MenuList />
      </Sider>
      <Header
        className='header'
        style={{
          marginLeft: collapsed ? 80 : 200,
          position: 'fixed',
          width: `calc(100% - ${collapsed ? 80 : 200}px)`,
          backgroundColor: token.colorBgContainer,
          zIndex: 1
        }}
      >
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
    </>
  );
};

export default SideBar;
