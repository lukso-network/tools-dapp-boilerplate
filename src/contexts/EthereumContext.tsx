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

const EthereumContext = createContext<EthereumContextType>(defaultValue)

export function useEthereum() {
  return useContext(EthereumContext)
}

export function EthereumProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [account, setAccount] = useState<string | null>(null)

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      setProvider(provider)

      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || null)
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  const connect = async () => {
    if (!provider) {
      console.log('Provider is not set')
      return
    }
    try {
      const accounts = await provider.send('eth_requestAccounts', [])
      setAccount(accounts[0])
    } catch (error) {
      console.log('o accounts given')
    }
  }

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
