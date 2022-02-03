import { ethers } from 'ethers'
import { contractDetails } from './ContractDetails'
import web3 from 'web3'

const provider = new ethers.providers.JsonRpcProvider(
	'https://rinkeby.infura.io/v3/b001cbdee80c4e52806e2e072e601ce4'
)

const getMetaMask = () => {
	const providerMetaMask = new ethers.providers.Web3Provider(window.ethereum)
	return providerMetaMask
}

const getChainId = async () => {
	const network = await provider.getNetwork()
	return network.chainId
}

const readContractFunction = async (token) => {
	const chainId = await getChainId()
	return new ethers.Contract(
		contractDetails[token].address[chainId],
		contractDetails[token].abi,
		provider
	)
}

const writeContractFunction = async (token) => {
	const mProviderInner = getMetaMask()
	const signer = await mProviderInner.getSigner()
	const chainId = await getChainId()
	return new ethers.Contract(
		contractDetails[token].address[chainId],
		contractDetails[token].abi,
		signer
	)
}

const getContractAddress = async (token) => {
	const chainId = await getChainId()
	return contractDetails[token].address[chainId]
}

const writeContractPrivate = async (token) => {
	let privateKey = localStorage.getItem('userPrivateKey')
	const signer = new ethers.Wallet(privateKey)
	const account = signer.connect(provider)
	const chainId = await getChainId()
	// console.log("latest", await account.getTransactionCount("latest" ));
	return new ethers.Contract(
		contractDetails[token].address[chainId],
		contractDetails[token].abi,
		account
	)
}
const getAddress = async () => {
		var myWeb3 = new web3(window.web3.currentProvider)
		const account = await myWeb3.eth.getAccounts()
		return account[0]
	},
	balanceOf = async (token) => {
		const readFunction = await readContractFunction(token)
		const balance = await readFunction.balanceOf(await getAddress())
		const decimal = await readFunction.decimals()
		const formatedBalance = ethers.utils.formatUnits(balance, decimal)

		return parseInt(formatedBalance)
	},
	balanceOfAddress = async (token, address) => {
		const readFunction = await readContractFunction(token)
		const balance = await readFunction.balanceOf(address)
		const decimal = await readFunction.decimals()
		const formatedBalance = ethers.utils.formatUnits(balance, decimal)

		return parseInt(formatedBalance)
	}

;(async () => {
	if (typeof window.ethereum !== 'undefined') {
		let currentAdd = await getAddress()

		setInterval(async () => {
			const currentAddress = await getAddress()
			if (currentAddress != currentAdd) {
				window.location.reload()
			}
		}, 3000)
	}
})()

export {
	readContractFunction,
	writeContractFunction,
	getAddress,
	balanceOf,
	balanceOfAddress,
	writeContractPrivate,
	getContractAddress,
	getMetaMask
}
