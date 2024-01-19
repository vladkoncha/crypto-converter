import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/src/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Converter',
  description: 'Simple crypto converter for 3 top currencies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
