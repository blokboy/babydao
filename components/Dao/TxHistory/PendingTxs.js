import React from "react"

const PendingTxs = ({ pendingTxs, threshold }) => {
  // pendingTxs.results: []
  console.log("PendingTxs", pendingTxs)
  return (
    <>
      <div className="flex flex-col rounded-lg shadow-inner mt-4 bg-slate-100 dark:bg-slate-800 p-2">
        <h1>Pending Transactions: {pendingTxs.count}</h1>
        {pendingTxs.results.map((tx, index) => (
          <div key={index} className="flex flex-row">
            <span>{tx.to}</span>
            {tx.confirmations.length >= threshold ? (
              <span className="ml-6">execute</span>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default PendingTxs
