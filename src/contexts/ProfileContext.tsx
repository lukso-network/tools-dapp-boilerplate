import React, { createContext, useContext, useState, useEffect } from 'react'
import { useEthereum } from './EthereumContext' // Import your Ethereum context
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js'
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json' assert { type: 'json' }
import { useNetwork } from './NetworkContext'
import supportedNetworks from '../consts/SupportedNetworks.json'

interface Profile {
  name: string
  description: string
  tags: string[]
  links: Link[]
  profileImage: Image[]
  backgroundImage: Image[]
}

interface Link {
  title: string
  url: string
}

interface Image {
  width: number
  height: number
  hashFunction: string
  hash: string
  url: string
}

interface ProfileContextType {
  profile: Profile | null
}

const initialProfileContextValue: ProfileContextType = {
  profile: null,
}

const ProfileContext = createContext<ProfileContextType>(
  initialProfileContextValue
)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { account } = useEthereum()
  const { network } = useNetwork()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!account || !network) {
        setProfile(null)
        return
      }

      const currentNetwork = supportedNetworks.find(
        (net) => net.name === network
      )

      if (!currentNetwork) {
        setProfile(null)
        return
      }

      const erc725js = new ERC725(
        lsp3ProfileSchema as ERC725JSONSchema[],
        account,
        currentNetwork.rpcUrl,
        { ipfsGateway: currentNetwork.ipfsGateway }
      )

      try {
        const profileMetaData = await erc725js.fetchData('LSP3Profile')
        if (
          profileMetaData.value &&
          typeof profileMetaData.value === 'object' &&
          'LSP3Profile' in profileMetaData.value
        ) {
          setProfile(profileMetaData.value.LSP3Profile)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }

    fetchProfileData()
  }, [account, network])

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
