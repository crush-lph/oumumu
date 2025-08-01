import { Language } from '@/shared/language';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.keys(Language) as Language[],

  // 语言为默认语言时,不添加路由前缀
  localePrefix: 'as-needed',

  // Used when no locale matches
  defaultLocale: Language.EN
});
