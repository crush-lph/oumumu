import { Language } from '@/shared/language';
import React from 'react';

interface Iprops {
  locale: Language;
}

const Logo = ({ locale }: Iprops) => {
  return <div className='text-black flex justify-center items-center'>Oumomo-{locale}</div>;
};

export default Logo;
