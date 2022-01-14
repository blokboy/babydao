import React from "react"
import useForm from "hooks/useForm"
import { ethers } from "ethers"
import { EthersAdapter } from "@gnosis.pm/safe-core-sdk"
import Safe, { SafeFactory, SafeAccountConfig } from "@gnosis.pm/safe-core-sdk"
import { SafeTransactionDataPartial } from "@gnosis.pm/safe-core-sdk-types"
import SafeServiceClient from "@gnosis.pm/safe-service-client"
import { useAccount } from "wagmi"

let safeSdk

const TransactionForm = ({ safeAddress }) => {
  const { state, setState, handleChange } = useForm()
  const { signers, setSigners } = React.useState()
  const [{ data, error, loading }, disconnect] = useAccount()

  // const { safe, setSafe } = React.useState()
  // const { safeTransaction, setSafeTransaction } = React.useState()

  /*
  const safeService = new SafeServiceClient("https://safe-transaction.gnosis.io")

  - set Safe Address -
  // uses safe address and provider.signer() and creates safeSdk
  const setSafeAddress = async () => {
		// console.log(safeAddress)
    await window.ethereum.enable()
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		const signer = provider.getSigner();
		const ethAdapter = new EthersAdapter({ ethers, signer });
		safeSdk = await Safe.create({
			ethAdapter,
			safeAddress: this.state.safeAddress,
		});
	}

  - Sign -
  const sign = async () => {
		if (!safeTransaction) {
			const contract = new ethers.Contract(
				REACT_APP_CONTRACT_ADDRESS,
				Popcat.abi,
				provider
			);

      // contract address to send to 
			const transactions = [
				{
					to: REACT_APP_CONTRACT_ADDRESS,
					value: '0',
					data: contract.interface.encodeFunctionData('updateChampion', [
						this.state.newChampion,
					]),
					safeTxGas: 0,
				},
			];
			safeTransaction = await safeSdk.createTransaction(...transactions);
		}

		// Sign the transaction off-chain (in wallet)
		await safeSdk.signTransaction(safeTransaction);

    // to view wallets that have signed transaction
		const signers = [];
		safeTransaction.signatures.forEach((element) => {
			signers.push(element.signer);
		});
		this.setState({
			signers,
		});
	}


  - Execute - 
  const execute = async () => {
		const signer = provider.getSigner();
		const ethAdapter = new EthersAdapter({ ethers, signer });
		const safeSdk2 = await safeSdk.connect({
			ethAdapter,
			safeAddress: this.state.safeAddress,
		});
		await safeSdk2.executeTransaction(safeTransaction);
	}

	handleChange(e) {
		this.setState({
			[e.target.id]: e.target.value,
		});
	}


  */

  React.useEffect(() => {
    setSafeAddress()
    console.log(safeSdk)
  }, [])

  const setSafeAddress = async () => {
    console.log("setSafeAddress run")
    await window.ethereum.enable()
    await window.ethereum.request({ method: "eth_requestAccounts" })

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(provider.provider.selectedAddress)

    const ethAdapter = new EthersAdapter({ ethers, signer })
    safeSdk = await Safe.create({
      ethAdapter,
      safeAddress: safeAddress,
    })
  }

  const sign = async () => {
    // if (!safeTransaction) {
    //   const contract = new ethers.Contract(
    //     REACT_APP_CONTRACT_ADDRESS,
    //     Popcat.abi,
    //     provider
    //   )

    await window.ethereum.enable()
    await window.ethereum.request({ method: "eth_requestAccounts" })

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(provider.provider.selectedAddress)

    // contract address to send to
    let wei = ethers.utils.parseEther(state.value)
    let weiString = wei.toString()
    const transactions = [
      {
        to: state.to,
        value: weiString,
        data: ethers.utils.hexlify([1]),
        // data: contract.interface.encodeFunctionData('updateChampion', [
        //   this.state.newChampion,
        // ])
        // safeTxGas: 0,
      },
    ]
    const safeTransaction = await safeSdk.createTransaction(...transactions)
    console.log("safeTransaction", safeTransaction)

    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)

    // Sign the transaction off-chain (in wallet)
    const signedTransaction = await safeSdk.signTransaction(safeTransaction)
    console.log("signedTransaction", signedTransaction)

    const safeService = new SafeServiceClient(
      "https://safe-transaction.gnosis.io"
    )

    const transactionConfig = {
      safeAddress,
      safeTransaction,
      safeTxHash,
      senderAddress: data.address,
    }
    const proposedTx = await safeService.proposeTransaction(transactionConfig)
    console.log("proposedTx", proposedTx)
    // let signers = []
    // safeTransaction.signatures.forEach(element => {
    //   signers.push(element.signer)
    // })
    // setSigners(signers)
  }

  const execute = async () => {
    await window.ethereum.enable()
    await window.ethereum.request({ method: "eth_requestAccounts" })

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(provider.provider.selectedAddress)

    const ethAdapter = new EthersAdapter({ ethers, signer })
    const safeSdk2 = await safeSdk.connect({
      ethAdapter,
      safeAddress: safeAddress,
    })
    // await safeSdk2.executeTransaction(safeTransaction)
  }

  // const submitTransaction = async safeAddress => {
  //   if (!safeAddress) {
  //     console.log("no safe address")
  //     return
  //   }
  //   console.log("safeAddress", safeAddress)

  //   await window.ethereum.enable()

  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const owner1 = provider.getSigner(provider.provider.selectedAddress)
  //   console.log("owner1", owner1)

  //   const ethAdapter = new EthersAdapter({
  //     ethers,
  //     signer: owner1,
  //   })
  //   console.log("ethAdapter", ethAdapter)

  //   const safeSdk = await Safe.create({
  //     ethAdapter: ethAdapter,
  //     safeAddress: safeAddress,
  //     isL1SafeMasterCopy: true,
  //   })

  //   console.log("safeSdk", safeSdk)

  //   let wei = ethers.utils.parseEther(state.value)
  //   let weiString = wei.toString()
  //   console.log("weiString", weiString)

  //   const transaction = {
  //     to: state.to,
  //     value: weiString,
  //     data: state.data,
  //   }
  //   console.log("transaction", transaction)

  //   const safeTransaction = await safeSdk.createTransaction(transaction)
  //   console.log("safeTransaction", safeTransaction)
  //   const txHash = await safeSdk.getTransactionHash(safeTransaction)
  //   console.log("txHash", txHash)

  //   const safeService = new SafeServiceClient(
  //     "https://safe-transaction.gnosis.io"
  //   )

  //   const transactionConfig = {
  //     safeAddress: safeAddress,
  //     safeTransaction: safeTransaction,
  //     safeTxHash: txHash,
  //     senderAddress: provider.provider.selectedAddress,
  //   }
  //   await safeService.proposeTransaction(transactionConfig)
  //   // console.log("proposed", proposed)

  //   // const owner1Signature = await safeSdk.signTransaction(safeTransaction)
  //   // console.log("owner1Signature", owner1Signature)
  //   // return txHash
  // }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   submitTransaction(safeAddress)
  //   setState({})
  // }

  return (
    <div className="flex flex-col mt-24 mx-auto z-50 rounded shadow-xl w-full md:w-3/6 md:rounded-xl px-8 pt-6 pb-8 mb-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full text-xl text-center font-bold mb-8">
        transaction
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          to
        </label>
        <input
          value={state.to || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 dark:bg-gray-800"
          id="name"
          name="to"
          type="text"
          placeholder="address"
          required
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          value
        </label>
        <input
          value={state.value || ""}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 dark:bg-gray-800"
          id="name"
          name="value"
          type="number"
          placeholder="value"
          required
        />
      </div>

      <div className="flex flex-row items-center justify-between">
        <button
          className="w-full font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-xl bg-gray-200 dark:bg-gray-800"
          // type="submit"
          onClick={sign}
        >
          sign
        </button>
        <button
          // change color & disabled based on safe threshold vs signers (in state)
          className="w-full font-bold py-3 px-4 mx-1 rounded-xl focus:outline-none focus:shadow-outline shadow-xl bg-gray-200 dark:bg-gray-800"
          // type="submit"
          // onClick={execute}
        >
          execute
        </button>
      </div>
    </div>
  )
}

export default TransactionForm
