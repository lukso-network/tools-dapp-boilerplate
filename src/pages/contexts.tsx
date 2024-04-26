/**
 * Displays the contents of the contexts page within the app.
 */
export default function Contexts() {
  return (
    <div className="flex flex-col items-center justify-center main-content">
      <h1 className="text-2xl">Built-in Context States:</h1>
      <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4">
        <h4 className="text-xl mb-2 font-bold">🔑 Ethereum Provider</h4>
        <div className="mb-32 lg:mb-0 lg:max-w-3xl opacity-70 text-sm">
          You can import the
          <code className="font-bold ml-1">useEthereum</code>
          context within any page or component in order to globally manage the
          connected Universal Profile Browser Extension. The
          <code className="font-bold mx-1">
            src/contexts/EthereumContext.tsx
          </code>
          can:
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left group mt-4">
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Get the current browser provider
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Connect and remove the Universal Profile
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Act on provider or address changes
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white text-center">
              Toggle Web3 Onboard functionality
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4">
        <h4 className="text-xl mb-2 font-bold">👩‍🎤 Profile Provider</h4>
        <div className="mb-32 lg:mb-0 lg:max-w-3xl opacity-70 text-sm">
          You can import the
          <code className="font-bold mr-1">useProfile</code>
          context within any page or component in order to globally manage
          profile data from the Universal Profile Browser Extension. The
          <code className="font-bold mx-1">
            src/contexts/EthereumContext.tsx
          </code>
          can:
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left group mt-4">
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Retrieve and decode metadata of the Universal Profile
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Store and update information based on provider changes
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white text-center">
              Optimize image selection and frontend rendering
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4">
        <h4 className="text-xl mb-2 font-bold">🕸️ Network Provider</h4>
        <div className="mb-32 lg:mb-0 lg:max-w-3xl opacity-70 text-sm">
          You can import the
          <code className="font-bold mr-1">useNetwork</code>
          context within any page or component in order to globally manage the
          network connection of the Universal Profile Browser Extension. The
          <code className="font-bold mx-1">
            src/contexts/NetworkContext.tsx
          </code>
          can:
          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left group mt-4">
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Get the current selected network
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Check if the network is supported
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white mr-2 text-center">
              Switch networks or act on changes
            </p>
            <p className="text-sm rounded-lg border px-5 py-4 border-slate-200 bg-white text-center">
              Control related RPCs and IPFS Gateways
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
