import React from 'react';
import {
  BankOutlined,
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './MenuStyles.css';
import { useIntl } from 'react-intl';
import commonResources from './messages';
import { useNavigate } from 'react-router-dom';

interface MenuListProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ darkTheme, toggleTheme }) => {
  const intl = useIntl();
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode='inline'
      className='menu-bar'
    >
      <Menu.Item key='home' icon={<HomeOutlined />}>
        {intl.formatMessage(commonResources.home)}
      </Menu.Item>
      <Menu.Item key='article' icon={<BookOutlined />}>
        {intl.formatMessage(commonResources.article)}
      </Menu.Item>
      <Menu.Item key='author' icon={<UserOutlined />}>
        {intl.formatMessage(commonResources.author)}
      </Menu.Item>
      <Menu.Item key='facility' icon={<BankOutlined />}>
        {intl.formatMessage(commonResources.facility)}
      </Menu.Item>

      <Menu.SubMenu
        key='settings'
        icon={<SettingOutlined />}
        title={intl.formatMessage(commonResources.settings)}
      >
        <Menu.Item key='login' onClick={() => navigate('/login')}>
          login
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MenuList;
