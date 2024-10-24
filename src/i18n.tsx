import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from './locales/en.json';
import trMessages from './locales/tr.json'; // Example for French

// Define available languages
const messages: { [key: string]: Record<string, string> } = {
  en: enMessages,
  tr: trMessages
};

interface I18nProviderProps {
  locale: string;
  children: ReactNode;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ locale, children }) => {
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};

export default I18nProvider;
