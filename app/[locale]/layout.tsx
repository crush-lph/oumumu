import React from 'react';
import { Language } from '@/shared/language';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Language }>;
}>) {
  const { locale } = await params;

  // locale 匹配不到时  重定向到404页面
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <>{children}</>;
}
