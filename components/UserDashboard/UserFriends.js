import React from "react"
import * as api from "query"
import { useQuery } from "react-query"

const UserFriends = ({ id }) => {
  const { data } = useQuery(
    "friends",
    () => api.getFriends({ initiatorId: id, targetId: id }),
    { refetchOnWindowFocus: false }
    // { onSettled: data => console.log("settled UserFriends data", data) }
  )

  console.log("UserFriends data:", data)

  return (
    <div className="flex flex-col my-2 items-center md:items-start">
      <span>
        {data?.length} {data?.length === 1 ? "friend" : "friends"}
      </span>
      <div className="flex flex-row mt-4">
        <div className="w-12 h-12 rounded-full border border-white bg-slate-200 dark:bg-slate-900"></div>
        <div className="w-12 h-12 rounded-full border border-white -ml-3 bg-slate-200 dark:bg-slate-900"></div>
        <div className="w-12 h-12 rounded-full border border-white -ml-3 bg-slate-200 dark:bg-slate-900"></div>
        <div className="w-12 h-12 rounded-full border border-white -ml-3 bg-slate-200 dark:bg-slate-900"></div>
      </div>
      <button className="mt-4">view all</button>
    </div>
  )
}

export default UserFriends
