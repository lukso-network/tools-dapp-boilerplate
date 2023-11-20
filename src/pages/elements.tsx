import ConnectButton from '@/components/ConnectButton'
import NetworkSwitcher from '@/components/NetworkSwitcher/NetworkSwitcher'

export default function Home() {
  return (
    <div className="home-background">
      <div className="flex items-center justify-center h-screen">
        <ConnectButton />
        <NetworkSwitcher />
      </div>
    </div>
  )
}
