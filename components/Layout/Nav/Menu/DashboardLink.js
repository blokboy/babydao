import React from "react"
import Link from "next/link"
import { BsPersonCircle } from "react-icons/bs"
import { useAccount } from "wagmi"

const DashboardLink = () => {
  const [{ data, error, loading }, disconnect] = useAccount()

  return (
    <li className="w-full">
      <Link href={data?.address ? `/user/${data.address}` : "/"}>
        <a className="flex flex-row rounded hover:shadow text-sm text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-1 py-2 justify-between">
          Dashboard
          <span className="self-center">
            <BsPersonCircle />
          </span>
        </a>
      </Link>
    </li>
  )
}

export default DashboardLink
