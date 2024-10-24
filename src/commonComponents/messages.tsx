import { defineMessages } from 'react-intl';

// Define messages with IDs and default messages
const commonResources = {
  en: defineMessages({
    welcomeMessage: {
      id: 'app.welcomeMessage',
      defaultMessage: 'Welcome to the application'
    },
    login: {
      id: 'app.login',
      defaultMessage: 'Login'
    },
    logout: {
      id: 'app.logout',
      defaultMessage: 'Logout'
    },
    register: {
      id: 'app.register',
      defaultMessage: 'Register'
    },
    home: {
      id: 'common.home',
      defaultMessage: 'Home'
    }
  }),
  tr: defineMessages({
    welcomeMessage: {
      id: 'app.welcomeMessage',
      defaultMessage: 'Uygulamaya hoş geldiniz'
    },
    login: {
      id: 'app.login',
      defaultMessage: 'Giriş'
    },
    logout: {
      id: 'app.logout',
      defaultMessage: 'Çıkış'
    },
    register: {
      id: 'app.register',
      defaultMessage: 'Kayıt Ol'
    },
    home: {
      id: 'common.home',
      defaultMessage: 'Anasayfa'
    }
  })
};

export default commonResources;
