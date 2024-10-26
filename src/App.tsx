import { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import { Outlet } from 'react-router';
import I18nProvider from './i18n';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const lang = navigator.language;
    if (lang === 'en' || lang === 'tr') {
      setLocale(lang);
    }
  }, []); // Empty dependency array to run this only once on component mount

  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const switchLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <I18nProvider locale={locale}>
      <SideBar
        darkTheme={darkTheme}
        toggleTheme={toggleDarkTheme}
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
      />
      <Outlet />
    </I18nProvider>
  );
}

export default App;
