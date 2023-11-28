import React from 'react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { config } from '../app/config'

const inter = Inter({ subsets: ['latin'] })

/**
 * Defines the basic layout for the application. It includes the
 * global font styling and a consistent layout for all pages.
 *
 * @param {React.ReactNode} { children } - The child components to be rendered.
 * @returns {JSX.Element} - The JSX structure including header and content.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Head>
        <title>{config.metadata.title}</title>
        <meta name="description" content={config.metadata.description} />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <div className={inter.className}>{children}</div>
    </div>
  )
}
