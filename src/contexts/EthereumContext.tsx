import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

interface EthereumContextType {
  provider: any
  account: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const defaultValue: EthereumContextType = {
  provider: null,
  account: null,
  connect: async () => {},
  disconnect: async () => {},
}

// Set up the empty React context
const EthereumContext = createContext<EthereumContextType>(defaultValue)

/**
 * Custom hook to use the Ethereum context across the application.
 *
 * @returns {EthereumContextType} - The provider, account, and connect/disconnect functions.
 */
export function useEthereum() {
  return useContext(EthereumContext)
}

/**
 * Provider component for the Ethereum context, handling account connectivity and
 * maintaining its state during account and chain changes.
 *
 * @param {React.ReactNode} { children } - Child components using the Ethereum context.
 * @returns {JSX.Element} - The JSX structure that wraps the child components to provide
 *                          access to it's state and functionalities.
 */

export function EthereumProvider({ children }: { children: React.ReactNode }) {
  // State for the Ethereum provider and the connected account
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  // Initialize the provider and listen for account/chain changes
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })

      // Reload the page when the chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  // Connect to the Ethereum network using the user's extension
  const connect = async () => {
    if (!provider) {
      console.log('Provider is not set')
      return
    }
    try {
      const accounts = await provider.send('eth_requestAccounts', [])
      setAccount(accounts[0])
    } catch (error) {
      console.log('User denied connection request')
    }
  }

  // Disconnect the provider by resetting the app's account
  const disconnect = () => {
    setAccount(null)
  }

  return (
    <EthereumContext.Provider
      value={{ provider, account, connect, disconnect }}
    >
      {children}
    </EthereumContext.Provider>
  )
}
