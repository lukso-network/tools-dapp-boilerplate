import React from 'react';
import Head from 'next/head';

import { config } from '@/app/config';

/**
 * Defines the basic layout for the application. It includes the
 * global font styling and a consistent layout for all pages.
 *
 * @param children - The pages to be rendered within the layout and header.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Head>
        <title>{config.metadata.title}</title>
        <meta name="description" content={config.metadata.description} />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <div>{children}</div>
    </div>
  );
}
