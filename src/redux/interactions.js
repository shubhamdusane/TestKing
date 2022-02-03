import { ethers } from 'ethers'
import {
	fumLoaded,
	metamaskError,
	metamaskLoaded,
	networkLoaded,
	usmLoaded,
	funBalanceLoaded,
	usmBalanceLoaded,
	dynamic_balance_loaded,
	etherBalanceLoaded,
	Burn_Fee_loaded,
	Defund_Fee_loaded,
	Tax_Fee_loaded,
	USDAOMint_Fee_loaded,
	Transfer_Fee_loaded,
	setInputAmountChange,
	setInputAmountSellChange,
	setInputAmountChange1,
	setInputAmountSellChange1
} from './actions'
import { loadCollateralData } from './interactions/cdp'
import { loadERC20Data } from './interactions/erc20'
import { loadOracleData } from './interactions/oracles'
import {
	WETH,
	Fetcher,
	Trade,
	Route,
	TokenAmount,
	TradeType
} from '@uniswap/sdk'
import JSBI from 'jsbi/dist/jsbi.mjs'
import web3 from 'web3'
import defiTokens from '../cryptos_abi.json'
import Swal from 'sweetalert2'
import { readContractFunction } from '../../src/app/sdk/tradingSdk'
import { decimalPlaces, toPercentage } from '../../src/utils'
import swal from 'sweetalert'
import { contractDetails } from '../app/sdk/ContractDetails'

const { fum, usm, usmView } = contractDetails

let currentUSMBalance, currentETHBalance, currentAssetBalance

export const getAccoundDetails = () =>{
	return new Promise((resolve, reject) =>{
		var myWeb3 = new web3(window.web3.currentProvider)
		myWeb3.eth.getAccounts(async (err, accounts) => {
			if (err) {
				//console.log(err);
			} else {
				if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
					reject('No accounts set')
				}
	
				const details = {};
	
				let networkType = await myWeb3.eth.net.getNetworkType()
				details.networkType = networkType;
				details.address = accounts[0];
				details.balance = ethers.utils.formatUnits(await myWeb3.eth.getBalance(accounts[0]), 18)
				resolve(details);
				//return details;
			}
		})
	})

}

export const getMetaMask = () => {
	const providerMetaMask = new ethers.providers.Web3Provider(window.ethereum)
	return providerMetaMask
}

export const loadNetwork = async (dispatch) => {
	if (typeof window.ethereum !== 'undefined') {
		const provider = new ethers.providers.JsonRpcProvider(
			`https://rinkeby.infura.io/v3/b001cbdee80c4e52806e2e072e601ce4`
		)

		// const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")

		const network = await provider.getNetwork()

		dispatch(networkLoaded(provider))
		loadUSM(dispatch, provider)
		loadFUM(dispatch, provider)
		loadBalance(dispatch, provider)
		loadUsmBalance(dispatch, provider)
		loadCryptoBalance(dispatch, provider)
		loadetherBalance(dispatch, provider)
	}
}
export const isMetamastConnected = new Promise((resolve, reject) => {
	if (window.ethereum) {
		web3 = new web3(window.ethereum)
		try {
			window.ethereum.enable().then(function () {
				resolve(true)
			})
		} catch (e) {
			reject(false)
		}
	}
	// Legacy DApp Browsers
	else if (window.web3) {
		resolve(true)
	}
	// Non-DApp Browsers
	else {
		reject(false)
	}
})

export const loadUSM = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)

	dispatch(usmLoaded(usmContract))
	loadERC20Data(dispatch, usm, usmContract)
	loadCollateralData(dispatch, usmContract, network, provider)
	loadOracleData(dispatch, usmContract)
	try {
		getAllTxs(usmContract, provider)
	} catch (error) {}
}

const getAllTxs = async (usmContract, provider, address) => {
	const event = usmContract.interface.events.FundAsset
	const logs = await provider
		.getLogs({
			address,
			fromBlock: '24248215',
			toBlock: 'latest',
			topic: event
		})
		.catch((err) => console.error('BACKEND CATASTROPHE: ', err))

	return logs
}

export const loadFUM = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = fum.abi
	const address = fum.address[network.chainId]
	const fumContract = new ethers.Contract(address, abi, provider)
	dispatch(fumLoaded(fumContract))
	loadERC20Data(dispatch, fum, fumContract)
}

export const loadBalance = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = fum.abi
	const address = fum.address[network.chainId]
	const fumContract = new ethers.Contract(address, abi, provider)
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			//console.log(err);
		} else {
			const balance = await fumContract.balanceOf(accounts[0])
			const funBalance = ethers.utils.formatUnits(balance, 18)
			currentAssetBalance = funBalance
			dispatch(funBalanceLoaded(funBalance))
		}
	})
}

export const loadetherBalance = async (dispatch, provider) => {
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			//console.log(err);
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}
			const balance = await myWeb3.eth.getBalance(accounts[0])
			currentETHBalance = ethers.utils.formatUnits(balance, 18)
			dispatch(etherBalanceLoaded(myWeb3.utils.fromWei(balance, 'ether')))
		}
	})
}

export const loadUsmBalance = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			//console.log(err);
		} else {
			const balance = await usmContract.balanceOf(accounts[0])
			const usmBalance = ethers.utils.formatUnits(balance, 18)
			currentUSMBalance = usmBalance

			dispatch(usmBalanceLoaded(usmBalance))
			return currentUSMBalance
		}
	})
}

export const loadUsmBalance1 = async (setUsmbalance) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			//console.log(err);
		} else {
			const balance = await usmContract.balanceOf(accounts[0])
			const usmBalance = ethers.utils.formatUnits(balance, 18)
			currentUSMBalance = usmBalance
			setUsmbalance(currentUSMBalance)
			return currentUSMBalance
		}
	})
}

export const loadCryptoBalance = async (dispatch, provider) => {
	const network = await provider.getNetwork()

	for (var key of Object.keys(defiTokens)) {
		const abi = defiTokens[key].abi
		const addressValue = defiTokens[key].address
		const dynamic_Contract = new ethers.Contract(addressValue, abi, provider)
		await storeTokenBalance(defiTokens[key], dynamic_Contract, dispatch)
	}
}

const storeTokenBalance = async (token, dynamic_Contract, dispatch) => {
	var myWeb3 = new ethers.providers.Web3Provider(window.ethereum)

	const myAccount = await myWeb3.listAccounts()

	if (typeof myAccount == 'object' && typeof myAccount[0] == 'string') {
		const balance = await dynamic_Contract.balanceOf(myAccount[0])
		const dynamic_balance = ethers.utils.formatUnits(balance, token.decimals)
		const name = token.name
		dispatch(dynamic_balance_loaded({ name, balance: dynamic_balance }))
	} else {
		console.error('Faied to store Token balance. Account not found')
	}
}

export const loadMetamask = async (dispatch) => {
	try {
		await window.ethereum.enable()
		const provider = await new ethers.providers.Web3Provider(window.ethereum)
		const signer = await provider.getSigner()
		const network = await provider.getNetwork()

		if (network.chainId !== 1) {
			//throw new Error("Must be on mainnet. Please alter Metamask network and refresh the page.")
		}
		const usmAbi = usm.abi
		const usmAddress = usm.address[network.chainId]
		const usmContract = new ethers.Contract(usmAddress, usmAbi, signer)
		window.usm = usmContract
		//load FUM with Metamask
		const fumAbi = fum.abi
		const fumAddress = fum.address[network.chainId]
		const fumContract = new ethers.Contract(fumAddress, fumAbi, signer)
		dispatch(metamaskLoaded(provider, signer, usmContract, fumContract))
	} catch (e) {
		dispatch(metamaskError(e))
		return false, false
	}
}

const verifyTransaction = (dispatch, hash, updateTotalSupply, token) => {
	Swal.fire({
		title: 'Sent to Blockchain',
		html: `<p>Waiting for Blockchain Confirmation...</p>
        <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
	})
	// check transaction
	const mProviderInner = getMetaMask()
	mProviderInner.waitForTransaction(hash).then(async (result) => {
		loadNetwork(dispatch)
		if (result.status) {
			if (token && updateTotalSupply) {
				const { totalSupply } = await readContractFunction(token)
				updateTotalSupply(
					decimalPlaces(ethers.utils.formatEther(await totalSupply()), 4)
				)
			}

			Swal.fire({
				icon: 'success',
				html: `<p>Transaction Successful</p>
        <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
			})
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				html: `<p>Transaction failed!</p>
        <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
			})
		}
	})

	//check transaction end
}

export const buyUSM = async (
	dispatch,
	usm,
	signer,
	amount,
	usm_balance,
	updateTotalSupply
) => {
	Swal.fire({
		title: 'Confirm',
		text: 'Waiting for Metamask Confirmation..'
	})

	const mProvider = getMetaMask()

	const weiAmount = ethers.utils.parseEther(amount)
	const address = await signer.getAddress()

	const gasLimit = await usm.estimateGas.mint(address, 0, { value: weiAmount })
	const gasPrice = await mProvider.getGasPrice()

	const sendtransaction = (gasPrice, gasLimit) => {
		let currentGasLimit = String(Number(gasLimit))
		usm
			.mint(address, 0, {
				value: weiAmount,
				gasPrice: gasPrice,
				gasLimit: currentGasLimit
			})
			.then((data) => {
				data &&
					data.hash &&
					verifyTransaction(dispatch, data.hash, updateTotalSupply, 'usm')
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!'
				})
				if (error.code === -32603) {
					const gasIncreaseBy = Math.pow(10, currentGasLimit.length - 2)
					currentGasLimit = Number(currentGasLimit) + gasIncreaseBy
					sendtransaction(gasPrice, currentGasLimit)
				}
				dispatch(metamaskError(error))
			})
	}
	sendtransaction(gasPrice, gasLimit)
}

export const sellUSM = async (
	dispatch,
	usm,
	signer,
	amount,
	ether_balance,
	updateTotalSupply
) => {
	Swal.fire({
		title: 'Confirm',
		text: 'Waiting for Metamask Confirmation..'
	})
	const mProvider = getMetaMask()
	const weiAmount = ethers.utils.parseEther(String(amount))
	const address = await signer.getAddress()
	const gasLimit = await usm.estimateGas.burn(address, weiAmount, 0)
	const gasPrice = await mProvider.getGasPrice()
	const sendtransaction = (gasPrice, gasLimit) => {
		let currentGasLimit = String(Number(gasLimit))
		usm
			.burn(address, weiAmount, 0, {
				gasPrice: gasPrice,
				gasLimit: currentGasLimit
			})
			.then((data) => {
				data &&
					data.hash &&
					verifyTransaction(dispatch, data.hash, updateTotalSupply, 'usm')
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!'
				})
				if (error.code === -32603) {
					const gasIncreaseBy = Math.pow(10, currentGasLimit.length - 2)
					currentGasLimit = Number(currentGasLimit) + gasIncreaseBy
					sendtransaction(gasPrice, currentGasLimit)
				}
				dispatch(metamaskError(error))
			})
	}
	sendtransaction(gasPrice, gasLimit)
}

export const buyFUM = async (
	dispatch,
	usm,
	signer,
	amount,
	ether_balance,
	updateTotalSupply
) => {
	Swal.fire({
		title: 'Confirm',
		text: 'Waiting for Metamask Confirmation..'
	})
	const mProvider = getMetaMask()
	const weiAmount = ethers.utils.parseEther(amount)
	const address = await signer.getAddress()
	const gasLimit = await usm.estimateGas.fund(address, 0, { value: weiAmount })
	const gasPrice = await mProvider.getGasPrice()

	const sendtransaction = (gasPrice, gasLimit) => {
		let currentGasLimit = String(Number(gasLimit))
		usm
			.fund(address, 0, {
				value: weiAmount,
				gasPrice: gasPrice,
				gasLimit: currentGasLimit
			})
			.then((data) => {
				data &&
					data.hash &&
					verifyTransaction(dispatch, data.hash, updateTotalSupply, 'fum')
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!'
				})
				if (error.code === -32603) {
					const gasIncreaseBy = Math.pow(10, currentGasLimit.length - 2)
					currentGasLimit = Number(currentGasLimit) + gasIncreaseBy
					sendtransaction(gasPrice, currentGasLimit)
				}
				dispatch(metamaskError(error))
			})
	}
	sendtransaction(gasPrice, gasLimit)
}

export const sellFUM = async (
	dispatch,
	usm,
	signer,
	amount,
	ether_balance,
	updateTotalSupply
) => {
	const mProvider = getMetaMask(),
		network = await mProvider.getNetwork(),
		usmViewabi = usmView.abi,
		usmViewAddress = usmView.address[network.chainId],
		usmViewContract = await new ethers.Contract(
			usmViewAddress,
			usmViewabi,
			mProvider
		),
		ratio = await usmViewContract.debtRatio(),
		formattedRatio = ethers.utils.formatEther(ratio),
		debtRatio = toPercentage(formattedRatio)
	if (Number(debtRatio) > 80) {
		swal('Debt Ratio is too high, please try again after sometime.')
		return
	}
	Swal.fire({
		title: 'Confirm',
		text: 'Waiting for Metamask Confirmation..'
	})
	const weiAmount = ethers.utils.parseEther(amount)
	const address = await signer.getAddress()
	const gasLimit = await usm.estimateGas.defund(address, weiAmount, 0)
	const gasPrice = await mProvider.getGasPrice()

	const sendtransaction = (gasPrice, gasLimit) => {
		let currentGasLimit = String(Number(gasLimit))
		usm
			.defund(address, weiAmount, 0, {
				gasPrice: gasPrice,
				gasLimit: currentGasLimit
			})
			.then((data) => {
				data &&
					data.hash &&
					verifyTransaction(dispatch, data.hash, updateTotalSupply, 'fum')
			})
			.catch((error) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!'
				})
				if (error.code === -32603) {
					const gasIncreaseBy = Math.pow(10, currentGasLimit.length - 2)
					currentGasLimit = Number(currentGasLimit) + gasIncreaseBy
					sendtransaction(gasPrice, currentGasLimit)
				}
				dispatch(metamaskError(error))
			})
	}
	sendtransaction(gasPrice, gasLimit)
}

export const SendUSDAO = async (
	dispatch,
	usm,
	signer,
	_amount,
	_address,
	usm_balance
) => {
	Swal.fire({
		title: 'Confirm',
		text: 'Waiting for Metamask Confirmation..'
	})
	const weiAmount = ethers.utils.parseEther(_amount)
	const Receiversaddress = ethers.utils.isAddress(_address)
	window.usm = usm
	if (!Receiversaddress) {
		dispatch(metamaskError('Invalid Address'))
	}
	usm
		.transfer(_address, String(weiAmount))
		.then((data) => {
			data && data.hash && verifyTransaction(dispatch, data.hash)
		})
		.catch((error) => dispatch(metamaskError(error)))
}

export const SendASSET = async (
	dispatch,
	fum,
	signer,
	_amount,
	_address,
	asset_balance
) => {
	Swal.fire({
		title: 'Confirm',
		text: 'Waiting for Metamask Confirmation..'
	})
	const weiAmount = ethers.utils.parseEther(_amount)
	const Receiversaddress = ethers.utils.isAddress(_address)
	if (!Receiversaddress) {
		dispatch(metamaskError('Invalid Address'))
	}
	fum
		.transfer(_address, String(weiAmount))
		.then((data) => {
			data && data.hash && verifyTransaction(dispatch, data.hash)
		})
		.catch((error) => dispatch(metamaskError(error)))
}

export const SetWithDraw1 = async (dispatch, usm, signer, value) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var value2 = await usmContract.saveUSDAOBurnFee()
	var value3 = await usmContract.revenueContract()

	value2 = ethers.utils.formatEther(value2)
	dispatch(Burn_Fee_loaded(value3, value2))
}

export const SetWithDraw2 = async (dispatch, usm, signer, value) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var value4 = await usmContract.taxationContract()
	var value3 = await usmContract.saveASSETBurnFee()
	value3 = ethers.utils.formatEther(value3)
	dispatch(Defund_Fee_loaded(value4, value3))
}

export const SetWithDraw3 = async (dispatch, usm, signer, value) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var value3 = await usmContract.taxationContract()
	var value4 = await usmContract.saveASSETMintFee()
	value4 = ethers.utils.formatEther(value4)
	dispatch(Tax_Fee_loaded(value3, value4))
}

export const SetWithDraw4 = async (dispatch, usm, signer, value) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var value3 = await usmContract.revenueContract()
	var value5 = await usmContract.saveUSDAOMintFee()
	value5 = ethers.utils.formatEther(value5)
	dispatch(USDAOMint_Fee_loaded(value3, value5))
}

export const SetWithDraw5 = async (dispatch, usm, signer, value) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	var value3 = await usmContract.revenueContract()
	var value1 = await usmContract.saveTransferFee()
	value1 = ethers.utils.formatEther(value1)
	dispatch(Transfer_Fee_loaded(value3, value1))
}

export const ChangeFeeValueState = async (
	dispatch,
	usm,
	fee_arr,
	boolvalue
) => {
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const signer = await provider.getSigner()
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, signer)
	usmContract
		.changeFeeValueState(boolvalue, fee_arr)
		.then((fee) => {})
		.catch((err) => {})
}

export const fetchWithdrawFee = async (dispatch, usm, values) => {
	const provider = await new ethers.providers.JsonRpcProvider(
		`https://rinkeby.infura.io/v3/ad3b219cf3254a9ea9815d52438578d5`
	)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, provider)
	const mintFee = await usmContract.saveUSDAOMintFee()
	const formatedMintFee = ethers.utils.formatEther(mintFee)
}

export const sendToPool = async (valObj, setDisabled) => {
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId],
		signer = await provider.getSigner()
	const usmContract = new ethers.Contract(address, abi, signer)
	let withdraw
	try {
		withdraw = await usmContract.withdrawFee(
			valObj.withdraw_mint_fee,
			valObj.withdraw_burn_fee,
			valObj.withdraw_fund_fee,
			valObj.withdraw_defund_fee,
			valObj.withdraw_transfer_fee
		)
	} catch (e) {
		console.log(e)
		if (e.code === 4001) {
			return swal('User denied transaction.').then((value) => {
				window.location.reload()
			})
		}
	}
	if (withdraw) {
		swal(`Please wait as your request is being processed.`)
		setDisabled(true)
		provider.waitForTransaction(withdraw.hash).then((result, error) => {
			setDisabled(false)
			if (result.status) {
				swal(`Send to Pool!`).then((value) => {
					window.location.reload()
				})
			} else {
				swal(`Your transaction is failed`)
			}
		})
	}
}

export const withDrawFee = async (dispatch, usm) => {
	await window.ethereum.enable()
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	const usmContract = new ethers.Contract(address, abi, signer)

	usmContract
		.withdrawFee()
		.then((found) => {})
		.catch((err) => {})
}

export const setEthToUsm = async (dispatch, usmview, _amount) => {
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const network = await provider.getNetwork()
	const abi = usmview.abi
	const address = usmview.address[network.chainId]
	const usmviewContract = new ethers.Contract(address, abi, provider)
	const data1 = await usmviewContract.usmMint(weiAmount)
	if (data1) {
		const usmBalance1 = ethers.utils.formatEther(data1['usmOut'], 18)
		const usmViewBalance = usmBalance1 == 0.0 ? 0 : usmBalance1
		dispatch(setInputAmountChange(usmview.name, usmViewBalance))
	} else {
	}
}

export const setEthToUsm1 = async (usmviewContract, _amount) => {
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()

	const data1 = await usmviewContract.usmMint(weiAmount)
	if (data1) {
		const usmBalance1 = ethers.utils.formatEther(data1['usmOut'], 18)
		const usmViewBalance = usmBalance1 == 0.0 ? 0 : usmBalance1
		return usmViewBalance
	} else {
	}
}

export const setUsmToEth = async (dispatch, usmview, _amount) => {
	if (_amount == 0) {
		dispatch(setInputAmountSellChange(usmview.name, 0))
	}
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const network = await provider.getNetwork()
	const abi = usmview.abi
	const address = usmview.address[network.chainId]
	const usmviewContract = new ethers.Contract(address, abi, provider)
	const data = await usmviewContract.usmBurn(weiAmount)
	if (data) {
		const usmBalance = ethers.utils.formatUnits(data['ethOut'], 18)
		const ETHViewBalance = usmBalance == 0.0 ? 0 : usmBalance
		dispatch(setInputAmountSellChange(usmview.name, ETHViewBalance))
	} else {
	}
}

export const setUsmToEth1 = async (usmviewContract, _amount) => {
	if (_amount == 0) {
		return 0
	}
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()

	const data = await usmviewContract.usmBurn(weiAmount)
	if (data) {
		const usmBalance = ethers.utils.formatUnits(data['ethOut'], 18)
		const ETHViewBalance = usmBalance == 0.0 ? 0 : usmBalance
		return ETHViewBalance
	}
}

export const setEthToUsmOne = async (dispatch, usmview, _amount) => {
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const network = await provider.getNetwork()
	const abi = usmview.abi
	const address = usmview.address[network.chainId]
	const usmviewContract = new ethers.Contract(address, abi, provider)
	const data = await usmviewContract.fumFund(weiAmount)
	if (data) {
		const usmBalance = ethers.utils.formatUnits(data['fumOut'], 18)
		dispatch(setInputAmountChange1(usmview.name, usmBalance))
	} else {
	}
}

export const setEthToUsmOne1 = async (usmviewContract, _amount) => {
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()

	const data = await usmviewContract.fumFund(weiAmount)
	if (data) {
		const usmBalance = ethers.utils.formatUnits(data['fumOut'], 18)
		return usmBalance
	} else {
	}
}

export const setUsmToEthOne = async (dispatch, usmview, _amount) => {
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const network = await provider.getNetwork()
	const abi = usmview.abi
	const address = usmview.address[network.chainId]
	const usmviewContract = new ethers.Contract(address, abi, provider)
	const data = await usmviewContract.fumDeFund(weiAmount)

	if (data) {
		const usmBalance = ethers.utils.formatUnits(data['ethOut'], 18)
		dispatch(setInputAmountSellChange1(usmview.name, usmBalance))
	} else {
	}
}

export const setUsmToEthOne1 = async (usmviewContract, _amount) => {
	const weiAmount = ethers.utils.parseEther(String(_amount))
	await window.ethereum.enable()

	const data = await usmviewContract.fumDeFund(weiAmount)

	if (data) {
		const usmBalance = ethers.utils.formatUnits(data['ethOut'], 18)
		return usmBalance
	}
}

export const ERCTOKEN_TO_WETH = async (
	signer,
	amount,
	INPUT_TOKEN = {},
	provider
) => {
	try {
		const uniswapV2Address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' // Don't change

		const network = await provider.getNetwork()

		const receiverAddress = await signer.getAddress()
		let tradeAmount = amount

		// Convert input amount in wei
		const tradeAmountWei = ethers.utils.parseUnits(
			tradeAmount,
			INPUT_TOKEN['decimals']
		)

		if (tradeAmountWei.isNegative()) {
			alert('Invalid amount entered')
			return false
		}

		const chainId = network.chainId

		let max_trade_life = 20
		const tokenAddress = INPUT_TOKEN['address']
		const ercToken = await Fetcher.fetchTokenData(chainId, tokenAddress)

		const weth = WETH[chainId]
		const pair = await Fetcher.fetchPairData(weth, ercToken)
		const route = new Route([pair], ercToken)
		const tradeAmountBN = new TokenAmount(ercToken, JSBI.BigInt(tradeAmountWei))

		const trade = new Trade(route, tradeAmountBN, TradeType.EXACT_INPUT)

		// Convert input amount back to wei
		const amountIn = tradeAmountWei._hex

		const ercToken_to_weth = route.midPrice.toSignificant(6)
		const weth_to_ercToken = route.midPrice.invert().toSignificant(6)
		const execution_price = trade.executionPrice.toSignificant(6)
		const nextMidPrice = trade.nextMidPrice.toSignificant(6)

		// Extract maximum ether possible and multiply by 0.9 to increase chance of swap
		let amountOutMin = ethers.utils
			.parseEther(trade.outputAmount.toExact())
			.mul(9)
			.div(10)
		amountOutMin = amountOutMin['_hex']

		const path = [ercToken.address, weth.address]
		const to = receiverAddress // should be a checksummed recipient address
		const deadline = Math.floor(Date.now() / 1000) + 60 * max_trade_life // 20 minutes from the current Unix time

		const abi = INPUT_TOKEN['abi']

		const tokenContract = new ethers.Contract(tokenAddress, abi, signer)
		const approve_tx = await tokenContract.approve(uniswapV2Address, amountIn)

		// wait for the transaction to be mined
		const tx_approved = await approve_tx.wait()

		const uniswap = new ethers.Contract(
			uniswapV2Address,
			[
				`function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts)`
			],
			signer
		)

		let gasPrice = await provider.getGasPrice()

		const tx = await uniswap.swapExactTokensForETH(
			amountIn,
			amountOutMin,
			path,
			to,
			deadline,
			{ gasPrice: gasPrice._hex }
		)

		alert(
			`Tx successful. Please visit ${network.chainId} network block explorer to see tx: ${tx.hash}`
		)

		const receipt = await tx.wait()
		return ethers.utils.formatEther(amountOutMin)
	} catch (error) {}
}
