import React from 'react';
import {
  BankOutlined,
  BookOutlined,
  CrownOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './MenuStyles.css';
import { useIntl } from 'react-intl';
import commonResources from './messages';

interface MenuListProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ darkTheme, toggleTheme }) => {
  const intl = useIntl();

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode='inline'
      className='menu-bar'
    >
      <Menu.Item key='home' icon={<HomeOutlined />}>
        {intl.formatMessage(commonResources.en.home)}
      </Menu.Item>
      <Menu.Item key='article' icon={<BookOutlined />}>
        Articles
      </Menu.Item>
      <Menu.Item key='author' icon={<UserOutlined />}>
        Authors
      </Menu.Item>
      <Menu.Item key='facility' icon={<BankOutlined />}>
        Facilities
      </Menu.Item>

      <Menu.SubMenu key='test' icon={<CrownOutlined />} title='test'>
        <Menu.Item key='settingstest' icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key='settings' icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
