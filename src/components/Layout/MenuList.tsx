import {
  BankOutlined,
  BookOutlined,
  HomeOutlined,
  RightCircleOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './styles.css';
import { useIntl } from 'react-intl';

import ToggleThemeButton from '../ThemeItems/ToggleThemeButton';
import Logo from '../Logos/Logo';
import { useNavigate } from 'react-router';
import layoutResources from './messages';

const MenuList = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Menu mode='inline' className='menu-bar'>
      <Logo />

      <Menu.Item
        key='home'
        icon={<HomeOutlined />}
        onClick={() => navigate('/home')}
      >
        {intl.formatMessage(layoutResources.home)}
      </Menu.Item>
      <Menu.Item key='article' icon={<BookOutlined />}>
        {intl.formatMessage(layoutResources.article)}
      </Menu.Item>
      <Menu.Item key='author' icon={<UserOutlined />}>
        {intl.formatMessage(layoutResources.author)}
      </Menu.Item>

      <Menu.SubMenu
        key='facility'
        icon={<BankOutlined />}
        title={intl.formatMessage(layoutResources.facility)}
      >
        <Menu.Item
          key='affiliation'
          icon={<RightCircleOutlined />}
          onClick={() => navigate('/affiliation')}
        >
          {intl.formatMessage(layoutResources.affiliation)}
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu
        key='settings'
        icon={<SettingOutlined />}
        title={intl.formatMessage(layoutResources.settings)}
      ></Menu.SubMenu>

      <div className='toggle-theme-btn-container'>
        <ToggleThemeButton />
      </div>
    </Menu>
  );
};

export default MenuList;
