import React from 'react'
import { AppProps } from 'next/app'
import '../app/globals.css'
import { EthereumProvider } from '../contexts/EthereumContext'
import RootLayout from '../app/layout'
import { NetworkProvider } from '@/contexts/NetworkContext'
import { ProfileProvider } from '@/contexts/ProfileContext'

/**
 * The root component of this application. It wraps all pages
 * with the context providers and a consistent layout.
 *
 * @param {AppProps} { Component, pageProps } - Current page and its properties.
 * @returns {JSX.Element} - The JSX structure for the root of the application.
 */
function LYXBuilder({ Component, pageProps }: AppProps) {
  return (
    <EthereumProvider>
      <NetworkProvider>
        <ProfileProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ProfileProvider>
      </NetworkProvider>
    </EthereumProvider>
  )
}

export default LYXBuilder
