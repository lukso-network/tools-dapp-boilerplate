import { useEthereum } from '../../contexts/EthereumContext'
import { useNetwork } from '@/contexts/NetworkContext'
import { useProfile } from '../../contexts/ProfileContext'

/**
 * Provides a button for signing in with a wallet or Universal
 * Profile and proofing ownership over an address. It leverages
 * the useEthereum hook from the EthereumContext
 * for managing blockchain connections.
 *
 * @returns {JSX.Element} - A JSX structure of the button
 */
function SignInButton() {
  const { account, verified, signInWithEthereum } = useEthereum()
  const { network } = useNetwork()
  const { profile } = useProfile()

  let buttonText
  let buttonAction
  let buttonClass
  let disabled

  if (!account || !network) {
    // User is not connected or on the wrong network
    buttonText = 'Sign in with UP'
    buttonAction = null // No action
    buttonClass = 'm-2 bg-gray-300 text-gray-400 font-bold py-2 px-4 rounded'
    disabled = true
  } else if (account && !verified) {
    // User is connected but not verified
    buttonText = 'Sign in with UP'
    buttonAction = signInWithEthereum
    buttonClass = 'm-2 bg-lukso-pink text-white font-bold py-2 px-4 rounded'
    disabled = false
  } else if (account && verified && profile) {
    // User is connected and logged in
    const maxLength = 10
    const name = profile.name
    const profileName =
      name.length > maxLength ? `${name.substring(0, maxLength)}...` : name

    // User is connected and verified
    buttonText = `Signed in as ${profileName}`
    buttonAction = null
    buttonClass = 'm-2 bg-emerald-400 text-white font-bold py-2 px-4 rounded'
    disabled = true
  }

  return (
    <div>
      <button
        className={buttonClass}
        onClick={signInWithEthereum}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default SignInButton
