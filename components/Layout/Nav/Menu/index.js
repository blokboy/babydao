import React from "react"
import ClickAwayListener from "react-click-away-listener"
import { HiDotsHorizontal } from "react-icons/hi"
import DashboardLink from "./DashboardLink"
import MenuThemeToggle from "./MenuThemeToggle"
import MessagesLink from "./MessagesLink"
import ExploreLink from "./ExploreLink"
import FeedLink from "./FeedLink"
import AboutLink from "./AboutLink"
import { useConnect } from "wagmi"

const Menu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [{ data }, connect] = useConnect()

  const clickAway = () => {
    if (!menuOpen) {
      return
    }
    setMenuOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={clickAway}>
      <div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 rounded-xl border border-slate-400 shadow text-xl text-slate-800 bg-slate-200 hover:bg-slate-100 dark:text-white dark:bg-slate-900 dark:hover:bg-slate-700 h-10 px-3 py-2"
        >
          <HiDotsHorizontal />
        </button>
        <div
          className={
            (menuOpen ? "absolute " : "hidden ") +
            "top-0 right-0 md:-translate-x-20 translate-y-20 z-50 rounded border shadow px-2 py-2 text-slate-800 bg-slate-200 dark:text-white dark:bg-slate-900 w-2/6 md:w-1/6"
          }
        >
          <ul className="py-1" onClick={clickAway}>
            {data.connected ? <DashboardLink /> : <></>}
            <MenuThemeToggle />
            {data.connected ? <MessagesLink /> : <></>}
            <ExploreLink />
            {data.connected ? <FeedLink /> : <></>}
            <AboutLink />
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default Menu
