import Nav from "./Nav"
import ConnectModal from "./ConnectModal"
import AppSearchModal from "../AppSearchModal"
import CreateThreadModal from "../Messages/CreateThreadModal"
import FriendsModal from "../UserDashboard/FriendsModal"
import UnfriendModal from "../UserDashboard/UnfriendModal"
import OfferModal from "../OpenSeaCollection/OfferModal"
import BuyModal from "../OpenSeaCollection/BuyModal"
import NetworkWarning from "./Nav/NetworkWarning"

const Layout = ({ children }) => {
  return (
    <main className="h-screen w-full">
      <Nav />
      <NetworkWarning />
      {children}
      <ConnectModal />
      <AppSearchModal />
      <CreateThreadModal />
      <FriendsModal />
      <OfferModal />
      <BuyModal />
      <UnfriendModal />
    </main>
  )
}

export default Layout
