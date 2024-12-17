import { useState, useEffect } from 'react';
import I18nProvider from './i18n';
import { HashRouter as Router } from 'react-router-dom';
import MyRoutes from './routes/MyRoutes';
import { AuthProvider } from './modules/AuthContext';
import ThemeProvider from './modules/ThemeProvider';

function App() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const lang = navigator.language;
    if (lang === 'en' || lang === 'tr') {
      setLocale(lang);
    }
  }, []);

  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <MyRoutes />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
