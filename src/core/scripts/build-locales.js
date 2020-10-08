const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'messages/',
  translationsDirectory: 'src/locales/',
  languages: [
    'ar',
    'de',
    'en',
    'es',
    'esla',
    'fr',
    'it',
    'ja',
    'ko',
    'pl',
    'pt',
    'ru',
    'tr',
    'zhcn',
    'zhtw',
  ],
});
