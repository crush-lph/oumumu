import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

const page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <h1>{t('hello')}</h1>
      <Link href='/dashboard'>dashboard</Link>
    </div>
  );
};

export default page;
