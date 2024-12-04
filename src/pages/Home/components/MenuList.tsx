import {
  BankOutlined,
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './styles.css';
import { useIntl } from 'react-intl';
import commonResources from '../messages';
import ToggleThemeButton from '../../../components/ToggleThemeButton';
import Logo from '../../../components/Logo';

const MenuList = () => {
  const intl = useIntl();

  return (
    <Menu mode='inline' className='menu-bar'>
      <Logo />

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
      ></Menu.SubMenu>

      <div className='toggle-theme-btn-container'>
        <ToggleThemeButton />
      </div>
    </Menu>
  );
};

export default MenuList;
