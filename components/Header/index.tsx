import dynamic from 'next/dynamic';
import React from 'react';

const LangSwitch = dynamic(() => import('@/components/LangSwitch'));

const Header = () => {
  return (
    <header className='w-full flex h-10 bg-white'>
      <LangSwitch />
    </header>
  );
};

export default Header;
