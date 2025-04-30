import {
  BankOutlined,
  BookOutlined,
  DesktopOutlined,
  HomeOutlined,
  RightCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './styles.css';
import { useIntl } from 'react-intl';
import ToggleThemeButton from '../ThemeItems/ToggleThemeButton';
import Logo from '../Logos/Logo';
import { useNavigate } from 'react-router';
import layoutResources from './messages';
import Permission from '../Permission/Permission';

interface MenuListProps {
  collapsed?: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ collapsed }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const iconStyle = !collapsed ? { paddingLeft: '24px' } : undefined; // For permission items

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

      <Menu.Item key='researcherSearch' icon={<UserOutlined />}>
        {intl.formatMessage(layoutResources.researcher)}
      </Menu.Item>

      <Menu.Item
        key='search-collaborator'
        icon={<SearchOutlined />}
        onClick={() => navigate('/search-collaborator')}
      >
        {intl.formatMessage(layoutResources.findCollaborator)}
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

        <Menu.Item
          key='faculty'
          icon={<RightCircleOutlined />}
          onClick={() => navigate('/faculty')}
        >
          {intl.formatMessage(layoutResources.faculty)}
        </Menu.Item>

        <Menu.Item
          key='researcher'
          icon={<RightCircleOutlined />}
          onClick={() => navigate('/researcher')}
        >
          {intl.formatMessage(layoutResources.researcher)}
        </Menu.Item>

        <Menu.Item
          key='department'
          icon={<RightCircleOutlined />}
          onClick={() => navigate('/department')}
        >
          {intl.formatMessage(layoutResources.department)}
        </Menu.Item>
      </Menu.SubMenu>

      {/* Permissionlardan dolayı düzgün görüntülenmiyor. inline css ile sorun çözüldü şimdilik */}
      <Permission roles={['Admin']}>
        <Menu.SubMenu
          key='adminPanel'
          icon={<DesktopOutlined style={iconStyle} />}
          title={intl.formatMessage(layoutResources.adminPanel)}
        >
          <Menu.Item
            key='userPanel'
            icon={<UserOutlined style={iconStyle} />}
            onClick={() => navigate('/user-panel')}
          >
            {intl.formatMessage(layoutResources.userPanel)}
          </Menu.Item>

          <Menu.Item
            key='rolePanel'
            icon={<UserSwitchOutlined style={iconStyle} />}
            // onClick={() => navigate('/role-panel')}
          >
            {intl.formatMessage(layoutResources.rolePanel)}
          </Menu.Item>
        </Menu.SubMenu>
      </Permission>

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
