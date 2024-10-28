import { defineMessages } from 'react-intl';

// Define messages with IDs and default messages
const commonResources = defineMessages({
  welcomeMessage: {
    id: 'commonMessages.welcomeMessage',
    defaultMessage: 'Welcome to the application'
  },
  home: {
    id: 'commonMessages.home',
    defaultMessage: 'Home'
  },
  article: {
    id: 'commonMessages.article',
    defaultMessage: 'Article'
  },
  author: {
    id: 'commonMessages.author',
    defaultMessage: 'Author'
  },
  facility: {
    id: 'commonMessages.facility',
    defaultMessage: 'Facility'
  },
  settings: {
    id: 'commonMessages.settings',
    defaultMessage: 'Settings'
  }
});

export default commonResources;
