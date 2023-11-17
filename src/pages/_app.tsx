import React from 'react'
import { AppProps } from 'next/app'
import '../app/globals.css'
import { EthereumProvider } from '../contexts/Ethereum'
import RootLayout from '../app/layout'

function LYXBuilder({ Component, pageProps }: AppProps) {
  return (
    <EthereumProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </EthereumProvider>
  )
}

export default LYXBuilder
