import React from "react"
import { useQuery } from "react-query"
import { useSigner } from "wagmi"
import { useDaoStore } from "../../stores/useDaoStore"
import Nav from "./Nav"
import dynamic from "next/dynamic"
const Search = dynamic(() => import("./Search"))
import { useLayoutStore } from "/stores/useLayoutStore"
import ConnectModal from "./ConnectModal"
import CreateThreadModal from "../Messages/CreateThreadModal"
import OfferModal from "../Collection/OfferModal"
import BuyModal from "../Collection/BuyModal"
import NetworkWarning from "./Nav/NetworkWarning"
import MobileNotificationsModal from "./MobileNotificationsModal"

const Layout = ({ children }) => {
  const searchOpen = useLayoutStore(state => state.searchOpen)
  const setSigner = useLayoutStore(state => state.setSigner)
  const { data, isError, isLoading } = useSigner()
  const signer = React.useMemo(() => {
    return data
  }, [isLoading, isError, data])

  React.useEffect(() => {
    console.log("signeeeeer", signer)
    if (!!signer) setSigner(signer)
  }, [signer])

  return (
    <main className="w-full">
      <Nav />
      <NetworkWarning />
      {searchOpen ? <Search /> : children}
      <ConnectModal />
      <CreateThreadModal />
      <OfferModal />
      <BuyModal />
      <MobileNotificationsModal />
    </main>
  )
}

export default Layout
