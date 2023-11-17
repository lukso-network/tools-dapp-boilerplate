import React from 'react'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </Head>
      <div className={inter.className}>{children}</div>
    </div>
  )
}
