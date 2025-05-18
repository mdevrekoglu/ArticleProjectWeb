import React, { useEffect, useState } from 'react';
import { Layout, Button, theme, Badge, notification } from 'antd';
import MenuList from './MenuList';
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import './styles.css';
import { useAuth } from '../../modules/AuthContext';
import ApiService from '../../modules/ApiService';
import commonResources from '../../messages';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

const { Header, Sider } = Layout;

interface SideBarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, onCollapseChange }) => {
  const intl = useIntl();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [count, setCount] = useState<number>();

  const toggleCollapsed = () => {
    onCollapseChange(!collapsed);
  };

  const fetchNotificationCount = async () => {
    try {
      const response = await ApiService.UseGet<null, number>(
        '/Notification/GetNotificationCount',
        null
      );
      setCount(response);
    } catch (error) {
      notification.error({
        message: intl.formatMessage(commonResources.unknownError),
        placement: 'topRight',
        duration: 5,
        style: { width: '400px' }
      });
    }
  };

  const handleNotificationClick = () => {
    navigate('/user-notification');
    fetchNotificationCount();
  };

  useEffect(() => {
    fetchNotificationCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Sider
        className='sider'
        collapsed={collapsed}
        collapsible
        trigger={null}
        width={200}
        style={{ height: '100vh', position: 'fixed', left: 0, zIndex: 10 }}
      >
        <MenuList collapsed={collapsed} />
      </Sider>
      <Header
        className='header'
        style={{
          position: 'fixed',
          width: '100%',
          backgroundColor: token.colorBgContainer,
          zIndex: 9,
          borderBottom: `1px solid ${token.colorSplit}`
        }}
      >
        <Button
          type='text'
          style={{
            marginTop: '10px',
            marginLeft: collapsed ? '80px' : '200px'
          }}
          onClick={toggleCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />

        <Button
          icon={<LogoutOutlined />}
          className='header-btn'
          onClick={logout}
        />

        <Badge count={count} className='header-btn' size='small'>
          <Button icon={<BellOutlined />} onClick={handleNotificationClick} />
        </Badge>
      </Header>
    </>
  );
};

export default SideBar;
