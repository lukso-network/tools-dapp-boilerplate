import React from 'react'
import { AppProps } from 'next/app'
import '../app/globals.css'
import { EthereumProvider } from '../contexts/EthereumContext'
import RootLayout from '../app/layout'
import { NetworkProvider } from '@/contexts/NetworkContext'

function LYXBuilder({ Component, pageProps }: AppProps) {
  return (
    <EthereumProvider>
      <NetworkProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </NetworkProvider>
    </EthereumProvider>
  )
}

export default LYXBuilder
