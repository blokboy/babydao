import React from "react"
import { BsChatDotsFill } from "react-icons/bs"

const MessageViewToolbar = () => {
  return (
    <div className="flex mb-2 w-full h-[5%]">
      <button className="flex flex-row rounded-xl shadow bg-gray-50 dark:bg-gray-800 text-sm py-1 px-3">
        <span className="h-full pr-1 pt-1 text-gray-800 dark:text-white">
          <BsChatDotsFill />
        </span>
        messages
      </button>
    </div>
  )
}

export default MessageViewToolbar