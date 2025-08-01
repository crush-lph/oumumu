import { formats } from '@/i18n/request';
import locales from './locales/zh/origin.json';
import { Language } from './shared/language';

declare module 'next-intl' {
  interface AppConfig {
    Locale: Language;
    Messages: typeof locales;
    Formats: typeof formats;
  }
}
