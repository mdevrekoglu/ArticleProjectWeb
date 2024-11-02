import React from 'react';
import { Button, Layout, theme } from 'antd';
import MenuList from './MenuList';
import './styles.css';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { UseAuth } from '../../../modules/AuthContext';

const { Header, Sider } = Layout;

interface SideBarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, toggleCollapsed }) => {
  const { token } = theme.useToken();

  const { logout } = UseAuth();

  return (
    <Layout>
      <Sider className='sider' collapsed={collapsed} collapsible trigger={null}>
        <MenuList />
      </Sider>

      <Layout style={{ backgroundColor: token.colorBgLayout }}>
        <Header
          className='header'
          style={{ backgroundColor: token.colorBgContainer }}
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
      </Layout>
    </Layout>
  );
};

export default SideBar;
