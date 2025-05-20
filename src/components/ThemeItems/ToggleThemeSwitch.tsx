import React from 'react';
import { Switch, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { UseTheme } from '../../modules/ThemeProvider';
import { defineMessages, useIntl } from 'react-intl';

const toggleThemeResources = defineMessages({
  switchToLightMode: {
    id: 'layout.switchToLightMode',
    defaultMessage: 'Switch to light mode'
  },
  switchToDarkMode: {
    id: 'layout.switchToDarkMode',
    defaultMessage: 'Switch to dark mode'
  }
});

const ToggleThemeSwitch: React.FC = () => {
  const { isDarkMode, toggleTheme } = UseTheme();
  const intl = useIntl();

  return (
    <Tooltip
      title={
        isDarkMode
          ? intl.formatMessage(toggleThemeResources.switchToLightMode)
          : intl.formatMessage(toggleThemeResources.switchToDarkMode)
      }
    >
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
      />
    </Tooltip>
  );
};

export default ToggleThemeSwitch;
