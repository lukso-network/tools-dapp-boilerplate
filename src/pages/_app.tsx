import React from 'react'
import { AppProps } from 'next/app'
import '../app/globals.css'
import { EthereumProvider } from '../contexts/EthereumContext'
import RootLayout from '../app/layout'
import { NetworkProvider } from '@/contexts/NetworkContext'
import { ProfileProvider } from '@/contexts/ProfileContext'

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
