import { useState, useEffect } from 'react';
import I18nProvider from './i18n';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes/MyRoutes';
import { AuthProvider } from './modules/AuthContext';
import ThemeProvider from './theme/ThemeProvider';

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
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <MyRoutes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
