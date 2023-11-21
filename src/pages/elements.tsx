import ConnectButton from '@/components/ConnectButton'
import NetworkSwitcher from '@/components/NetworkSwitcher/NetworkSwitcher'
import ProfilePreview from '@/components/ProfilePreview'

export default function Elements() {
  return (
    <div className="home-background">
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="elementDescription">
            <label className="coloredHeading">ConnectButton.tsx</label>
            <div className="elementBox">
              <ConnectButton />
            </div>
          </div>
          <div className="elementDescription">
            <label className="coloredHeading">NetworkSwitcher.tsx</label>
            <div className="elementBox">
              <NetworkSwitcher />
            </div>
          </div>
        </div>
        <div>
          <div className="elementDescription">
            <label className="coloredHeading">ProfilePreview.tsx</label>
            <div className="elementBox">
              <ProfilePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
