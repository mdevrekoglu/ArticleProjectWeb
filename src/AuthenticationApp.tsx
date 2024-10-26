import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import I18nProvider from './i18n';

function AuthenticationApp() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const lang = navigator.language;
    if (lang === 'en' || lang === 'tr') {
      setLocale(lang);
    }
  }, []);

  const switchLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <I18nProvider locale={locale}>
      <Outlet />
    </I18nProvider>
  );
}

export default AuthenticationApp;
