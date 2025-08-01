'use client';

import { getLangList } from '@/shared/language';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

const LangSwitch = () => {
  const t = useTranslations();
  const langList = getLangList(t);
  console.log(langList);

  return (
    <div className='flex flex-col text-red-500'>
      {langList?.map((lang) => (
        <Link key={lang.value} href={`/${lang.value}`}>
          {lang.label}
        </Link>
      ))}
    </div>
  );
};

export default LangSwitch;
