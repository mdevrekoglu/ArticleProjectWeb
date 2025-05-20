import React, { useEffect, useState } from 'react';
import {
  Layout,
  Button,
  theme,
  Badge,
  Typography,
  Space,
  Avatar,
  Card
} from 'antd';
import MenuList from './MenuList';
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import './styles.css';
import ApiService from '../../modules/ApiService';
import { useNavigate } from 'react-router';
import { UserCredentialsModel } from '../../models/UserModel';

const { Header, Sider } = Layout;
const { Text } = Typography;

interface SideBarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ collapsed, onCollapseChange }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [count, setCount] = useState<number>();
  const [userCredentials, setUserCredentials] =
    useState<UserCredentialsModel>();

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
    } catch (error) {}
  };

  const fetchUserCredentials = async () => {
    try {
      const response = await ApiService.UseGet<null, UserCredentialsModel>(
        '/Authentication/GetUserCredentials',
        null
      );
      setUserCredentials(response);
    } catch (error) {}
  };

  const handleNotificationClick = () => {
    navigate('/user-notification');
    fetchNotificationCount();
  };

  useEffect(() => {
    fetchUserCredentials();
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
          borderBottom: `1px solid ${token.colorSplit}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type='text'
            style={{
              marginLeft: collapsed ? '80px' : '200px'
            }}
            onClick={toggleCollapsed}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />

          {userCredentials && (
            <Text strong style={{ fontSize: 18, paddingLeft: '30px' }}>
              {[
                userCredentials.affiliationName,
                userCredentials.facultyName,
                userCredentials.departmentName
              ]
                .filter(Boolean)
                .join(' - ')}
            </Text>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {userCredentials && (
            <Card
              styles={{ body: { padding: '6px 12px' } }}
              style={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 8
              }}
            >
              <Space align='center'>
                <Avatar
                  size='large'
                  src={`data:image/jpeg;base64,${userCredentials.image}`}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text
                    strong
                  >{`${userCredentials.firstName} ${userCredentials.lastName}`}</Text>
                  <Text type='secondary' style={{ fontSize: 12 }}>
                    {userCredentials.email}
                  </Text>
                </div>
                <Badge count={count} className='header-btn' size='small'>
                  <Button
                    icon={<BellOutlined />}
                    onClick={handleNotificationClick}
                  />
                </Badge>
              </Space>
            </Card>
          )}
        </div>
      </Header>
    </>
  );
};

export default SideBar;
