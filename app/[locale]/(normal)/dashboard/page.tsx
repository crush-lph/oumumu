import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div>
      <h1>dashboard</h1>
      <Link href='/'>back to homepage</Link>
    </div>
  );
};

export default page;
