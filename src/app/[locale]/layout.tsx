import { ThemeRegistry } from '@/theme/ThemeRegistry';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';

export function generateStaticParams() {
  return [{ locale: 'cs' }, { locale: 'en' }];
}

export const metadata = {
  title: 'Katalog her | Mystica Brno',
  icon: '/Mystica_Facebook_400x400_150dpi-300x300.png',
  apple: [
    { url: '/Mystica_Facebook_400x400_150dpi-150x150.png', sizes: '32x32', type: 'image/png' },
    { url: '/Mystica_Facebook_400x400_150dpi-300x300.png', sizes: '192x192', type: 'image/png' },
  ],
};

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({ children, params: { locale } }: Props) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
