import React from "react"
import Head from "next/head"
import Explore from "components/Explore"
import { useConnect, useAccount, useProvider } from "wagmi"

const Home = () => {
  const [{ data, error }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (mounted) {
      return
    }
    setMounted(true)
  }, []) /* eslint-disable-line react-hooks/exhaustive-deps */

  const connectButtons = React.useMemo(() => {
    return (
      <div className="flex flex-col">
        {data.connectors.map(connector =>
          connector.ready ? (
            <button
              className="border rounded-xl shadow bg-gray-200 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-700 my-2 py-3 px-6"
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
            </button>
          ) : (
            <button
              className="border rounded-xl bg-zinc-500 my-2 py-3 px-6"
              key={connector.id}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
            </button>
          )
        )}

        {error && <div>{error?.message ?? "Failed to connect"}</div>}
      </div>
    )
  }, [data]) /* eslint-disable-line react-hooks/exhaustive-deps */

  if (accountData && data?.connected && mounted) {
    return <Explore accountData={accountData} />
  }

  return (
    <>
      <Head>
        <title>babydao</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w- full min-h-screen">
        <h1 className="text-3xl sm:text-5xl mb-3">Welcome to babydao</h1>
        <p className="mb-3">Get started by connecting your wallet </p>

        {data && mounted ? connectButtons : <></>}
      </main>
    </>
  )
}

export default Home
