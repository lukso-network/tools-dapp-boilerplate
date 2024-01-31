import { useEthereum } from '@/contexts/EthereumContext'
import { useNetwork } from '@/contexts/NetworkContext'
import { useProfile } from '@/contexts/ProfileContext'
import signInWithEthereum from '@/utils/signInWithEthereum'
/**
 * Provides a button for signing in with a wallet or Universal
 * Profile and proofing ownership over an address. Docs:
 * https://docs.lukso.tech/learn/dapp-developer/siwe
 *
 * It leverages the following hooks:
 * - useEthereum: sign and verify the message
 * - useNetwork: restrict button to supported networks
 * - useProfile: show profile name once signed in.
 *
 * @returns {JSX.Element} - A JSX structure of the button
 */
const SignInButton: React.FC = () => {
  const { account, provider, isVerified, updateAccountInfo } = useEthereum()
  const { network } = useNetwork()
  const { profile } = useProfile()

  // Default button properties
  let buttonText: string = 'Sign in with UP'
  let buttonClass: string = 'bg-gray-300 text-gray-400'
  let isDisabled: boolean = true

  if (account && network && !isVerified) {
    // Adjust button when user is connected but not verified
    buttonClass = 'bg-lukso-pink text-white'
    isDisabled = false
  } else if (account && network && isVerified && profile) {
    // Adjust button when user is connected and verified
    const maxLength = 10
    const name = profile.name
    const profileName =
      name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
    buttonText = `Signed in as ${profileName}`
    buttonClass = 'bg-emerald-400 text-white'
  }

  const handleSignIn = async () => {
    if (provider && account) {
      const { chainId } = await provider.getNetwork()
      signInWithEthereum({
        account,
        provider,
        updateAccountInfo,
        chainId: Number(chainId),
      })
    }
  }

  return (
    <button
      className={`m-2 font-bold py-2 px-4 rounded ${buttonClass}`}
      onClick={handleSignIn}
      disabled={isDisabled}
    >
      {buttonText}
    </button>
  )
}

export default SignInButton
