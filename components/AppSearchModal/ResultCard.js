import React from "react"
import { useAccountStore } from "stores/useAccountStore"
import { useMutation } from "react-query"
import * as api from "query"
import Link from "next/link"
import { useEnsLookup } from "wagmi"

const ResultCard = ({ address, targetId }) => {
  const { id: initiatorId } = useAccountStore.getState().userData
  const { status, mutateAsync } = useMutation(api.reqRelationship)

  const [{ data, error, loading }, lookupAddress] = useEnsLookup({
    address: address,
  })

  const handleRequest = () => {
    if (!id) return
    const req = {
      initiatorId: initiatorId,
      targetId: targetId,
      status: 3,
    }

    mutateAsync(req)
  }

  return (
    <div className="flex flex-row mb-3 rounded-lg bg-slate-50 dark:bg-slate-800 justify-between py-2 px-1 w-full">
      <Link href={`/user/${address}`}>
        <a>
          <span>@{data ? data : `@${address.substring(0, 12) + "..."}`}</span>
        </a>
      </Link>
      {status === "loading" ? (
        <span className="mr-4 border rounded-lg text-xs p-1">loading</span>
      ) : status === "success" ? (
        <span className="mr-4 border border-green-400 rounded-lg text-xs text-green-400 p-1">
          requested
        </span>
      ) : (
        <button
          className="border rounded-lg text-xs mr-4 p-1"
          onClick={handleRequest}
        >
          request
        </button>
      )}
    </div>
  )
}

export default ResultCard
