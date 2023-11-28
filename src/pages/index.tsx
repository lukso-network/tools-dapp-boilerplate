import MenuBar from '@/components/MenuBar'
import Image from 'next/image'

/**
 * Displays the contents of the landing page within the app.
 *
 * @returns {JSX.Element} - JSX structure of the landing page.
 */
export default function Home() {
  return (
    <>
      <MenuBar />
      <div className="home-background">
        <main className="flex flex-col items-center justify-between px-16 pb-4 pt-6">
          <div className="my-2 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center lg:static lg:w-auto  lg:rounded-xl lg:p-4 lg:border border-red-100 bg-pink-50 font-mono">
              Start 🆙 your development by editing&nbsp;
              <code className="font-mono font-bold">
                src/app/pages/index.tsx
              </code>
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://github.com/lukso-network"
                target="_blank"
                rel="noopener noreferrer"
              >
                by{' '}
                <div className="h-10 w-28 relative">
                  <Image
                    src="/lukso_wordmark_black.svg"
                    alt="LUKSO Wordmark"
                    className="dark:invert"
                    priority
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </a>
            </div>
          </div>

          <div>
            <div className="h-44 w-60 relative my-20">
              <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                src="/lyx_token_symbol.svg"
                alt="LYX Token Symbol"
                priority
                fill
                sizes="100vw"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
          <div>
            <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-2">
              <h2 className="text-2xl m-5">
                Learn about LUKSO and LSP Standards
              </h2>
              <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                  href="https://docs.lukso.tech/"
                  className="group rounded-lg border border-transparent px-5 py-4 hover:border-slate-200 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    Tech Docs{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Read guides and learn about standards, tools, and libraries.
                  </p>
                </a>

                <a
                  href="https://erc725-inspect.lukso.tech/"
                  className="group rounded-lg border border-transparent px-5 py-4 hover:border-slate-200 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    Inspector{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Use the ERC-725 Inspector to retrieve contract data.
                  </p>
                </a>

                <a
                  href="https://up-test-dapp.lukso.tech/"
                  className="group rounded-lg border border-transparent px-5 py-4 hover:border-slate-200 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    Test App{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Create tokens, edit profile data, or build and sign
                    transactions.
                  </p>
                </a>

                <a
                  href="https://github.com/lukso-network/lukso-playground"
                  className="group rounded-lg border border-transparent px-5 py-4 hover:border-slate-200 hover:bg-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className={`mb-3 text-2xl font-semibold`}>
                    Playground{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      -&gt;
                    </span>
                  </h2>
                  <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Try out code snippets to read and detect contracts.
                  </p>
                </a>
              </div>
            </div>

            <div className="rounded-lg border border-red-100 p-5 bg-pink-50 mt-4 text-center">
              This Application Framework was created using Next for React. Visit
              the{' '}
              <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {' '}
                Developer Documentation{' '}
              </a>
              and{' '}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                Guides
              </a>{' '}
              for further information.
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
