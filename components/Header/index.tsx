import dynamic from 'next/dynamic';
import React from 'react';
import Logo from '../Logo';
import { getLocale } from 'next-intl/server';

const LangSwitch = dynamic(() => import('@/components/LangSwitch'));

const Header = async () => {
  const locale = await getLocale();
  return (
    <header className='w-full flex h-10 bg-white justify-between px-10'>
      <Logo locale={locale} />
      <LangSwitch />
    </header>
  );
};

export default Header;
