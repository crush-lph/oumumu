'use client';

import { Language } from '@/types';
import { useLocale as useL } from 'next-intl';

export const useLocale = () => {
  const locale = useL();

  const isZH = locale === Language.ZH;
  const isEN = locale === Language.EN;

  return {
    locale,
    isZH,
    isEN
  };
};
export default useLocale;
