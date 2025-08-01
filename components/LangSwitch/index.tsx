'use client';

import { getLangList } from '@/shared/language';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const LangSwitch = () => {
  const t = useTranslations();
  const langList = getLangList(t);
  const locale = useLocale();
  console.log(langList);

  return (
    <div className='flex divide-x-1 text-black items-center'>
      {langList?.map((lang) => (
        <Link
          className={clsx(locale === lang.value ? 'text-red-500' : '', 'px-2')}
          key={lang.value}
          href={`/${lang.value}`}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
};

export default LangSwitch;
