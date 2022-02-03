import {
	writeContractFunction,
	readContractFunction
} from '../../app/sdk/tradingSdk'
import { decimalPlaces, toPercentage } from '../../utils'
import { ethers } from 'ethers'
import Swal from 'sweetalert2'
import web3 from 'web3'
import { getCoingeckoPrice } from '../../redux/interactions/oracles'
import { fetchStaked } from '../../redux/staking'
import swal from 'sweetalert'

// const tokenSaleContract = await writeContractFunction('tokenSale')
// const compSaleContract = await writeContractFunction('comp')
// const usmContract = await readContractFunction('usm')
// const usmViewContract = await readContractFunction('usmView')
// const { totalSupply: fumTotalSupplyFum } = await readContractFunction('fum')

export const getMetaMask = () => {
	const providerMetaMask = new ethers.providers.Web3Provider(window.ethereum)
	return providerMetaMask
}

export const fetchInitialWeb3Data = async () => {
	return new Promise(async (resolve, reject) => {
		const usmContract = await readContractFunction('usm')
		const fumContract = await readContractFunction('fum')

		var myWeb3 = new web3(window.web3.currentProvider)
		myWeb3.eth.getAccounts(async (err, accounts) => {
			if (err) {
				//console.log(err);
			} else {
				const balance = await fumContract.balanceOf(accounts[0])
				const usmbBalance = await usmContract.balanceOf(accounts[0])
				const usmBalanceFormatted = ethers.utils.formatUnits(usmbBalance, 18)

				const etherBalance = await myWeb3.eth.getBalance(accounts[0])
				const etherBalanceFormatted = myWeb3.utils.fromWei(
					etherBalance,
					'ether'
				)

				const assetBalance = ethers.utils.formatUnits(balance, 18)

				resolve({ assetBalance, usmBalanceFormatted, etherBalanceFormatted })
			}
		})
	})
}

const stakedPromise = new Promise(async (resolve, reject) => {
	const stakedBalance = await fetchStaked()
	resolve(stakedBalance)
})

const debtPromise = (usmViewContract) => {
	return new Promise(async (resolve, reject) => {
		const ratio = await usmViewContract.debtRatio()
		const debtRatio = ethers.utils.formatEther(ratio)
		resolve(debtRatio)
	})
}

const marketPricePromise = (usmContract) => {
	return new Promise(async (resolve, reject) => {
		const marketPrice = await usmContract.latestPrice()
		resolve(Number(marketPrice) / 10e17)
	})
}

const totalBufferPromise = (usmViewContract) => {
	return new Promise(async (resolve, reject) => {
		const coingecko = await getCoingeckoPrice()
		const ethBuffer = await usmViewContract.ethBuffer(false)
		const formattedBuffer = ethers.utils.formatEther(ethBuffer)
		const totalBuffer = formattedBuffer * coingecko

		resolve(totalBuffer)
	})
}

const totalCollateralPromise = (usmContract) => {
	return new Promise(async (resolve, reject) => {
		const collateral = await usmContract.ethPool()
		const coingecko = await getCoingeckoPrice()
		const formattedCollateral = ethers.utils.formatEther(collateral)
		const totalCollateral = formattedCollateral * coingecko

		resolve(totalCollateral)
	})
}

const usmTotalSupplyPromise = (usmContract) => {
	return new Promise(async (resolve, reject) => {
		const usmTotalSupply = await usmContract.totalSupply()
		const formatedUsmSupply = decimalPlaces(
			ethers.utils.formatEther(usmTotalSupply),
			4
		)
		resolve(formatedUsmSupply)
	})
}

const fumTotSUpPromise = (fumTotalSupplyFum) => {
	return new Promise(async (resolve, reject) => {
		const fumTotalSupply = await fumTotalSupplyFum()
		const formatedFumSupply = decimalPlaces(
			ethers.utils.formatEther(fumTotalSupply),
			4
		)
		resolve(formatedFumSupply)
	})
}

const govSupplyPromise = (compSaleContract, tokenSaleContract) => {
	return new Promise(async (resolve, reject) => {
		const govSupplyValue = (
			(Number(await compSaleContract.totalSupply()) -
				Number(await tokenSaleContract.currentTotalTokens())) /
			10e17
		).toLocaleString()
		resolve(govSupplyValue)
	})
}

export const fetchAllInitialValues = async () => {
	const tokenSaleContract = await writeContractFunction('tokenSale')
	const compSaleContract = await writeContractFunction('comp')
	const usmContract = await readContractFunction('usm')
	const usmViewContract = await readContractFunction('usmView')
	const { totalSupply: fumTotalSupplyFum } = await readContractFunction('fum')

	const pricePromises = await Promise.all([
		stakedPromise,
		debtPromise(usmViewContract),
		marketPricePromise(usmContract),
		totalBufferPromise(usmViewContract),
		totalCollateralPromise(usmContract),
		usmTotalSupplyPromise(usmContract),
		fumTotSUpPromise(fumTotalSupplyFum),
		govSupplyPromise(compSaleContract, tokenSaleContract)
	])

	return {
		supply: {
			govSupply: pricePromises[7],
			assetSupply: pricePromises[6],
			usmSupply: pricePromises[5]
		},
		prices: {
			stakedBalance: pricePromises[0],
			debtRatio: pricePromises[1],
			marketPrice: pricePromises[2],
			totalBuffer: pricePromises[3],
			totalCollateral: pricePromises[4]
		}
	}
}

export const buyUSM = async (amount) => {
	if (!amount || amount == '0') {
		Swal.fire({
			title: 'Error',
			text: 'Please enter a valid amount.'
		})
		return
	}

	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const usm = await writeContractFunction('usm')

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
				data && data.hash && verifyTransaction(data.hash, 'usm')
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
				// dispatch(metamaskError(error))
			})
	}
	sendtransaction(gasPrice, gasLimit)
}

export const sellUsm = async (amount, balance) => {
	const provider = await new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const usm = await writeContractFunction('usm')
	try {
		await isMetamastConnected
	} catch (e) {
		swal(`You have to install MetaMask !`)
		return false
	}
	if (!amount || amount == '0') {
		if (Number(balance) == 0) {
			swal("You don't have sufficient balance")
			return
		} else {
			swal(`Please Enter USDAO Amount.`)
			return false
		}
	}

	if (Number(amount) > Number(balance)) {
		swal("You don't have sufficient balance")
	} else {
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
					data && data.hash && verifyTransaction(data.hash, 'usm')
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
				})
		}
		sendtransaction(gasPrice, gasLimit)
	}
}

export const buyFum = async (amount, balance) => {
	try {
		await isMetamastConnected
	} catch (e) {
		swal(`You have to install MetaMask !`)
		return false
	}
	if (!amount || amount == 0) {
		if (Number(balance) == 0) {
			swal("You don't have sufficient balance")
			return false
		} else {
			swal(`Please Enter ETH Amount.`)
			return false
		}
	}
	if (Number(amount) > Number(balance)) {
		swal("You don't have sufficient balance")
	} else {
		// buy fum logic
		Swal.fire({
			title: 'Confirm',
			text: 'Waiting for Metamask Confirmation..'
		})
		const mProvider = getMetaMask()
		const weiAmount = ethers.utils.parseEther(amount)
		const provider = await new ethers.providers.Web3Provider(window.ethereum)
		const signer = await provider.getSigner()
		const address = await signer.getAddress()
		const usm = await writeContractFunction('usm')
		const gasLimit = await usm.estimateGas.fund(address, 0, {
			value: weiAmount
		})
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
					data && data.hash && verifyTransaction(data.hash, 'fum')
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
				})
		}
		sendtransaction(gasPrice, gasLimit)
	}
}

export const sellFum = async (amount, balance) => {
	console.log(amount, balance, 'amount and balance')
	try {
		await isMetamastConnected
	} catch (e) {
		swal(`You have to install MetaMask !`)
		return false
	}
	if (!amount || amount == 0) {
		if (Number(balance) == 0) {
			swal("You don't have sufficient balance")
			return false
		} else {
			swal(`Please Enter ASSET Amount.`)
			return false
		}
	}
	if (Number(amount) > Number(balance)) {
		swal("You don't have sufficient balance")
	} else if (Number(amount) == Number(balance)) {
		swal('You can sell max amount only')
	} else {
		const provider = await new ethers.providers.Web3Provider(window.ethereum)
		const mProvider = getMetaMask(),
			usmViewContract = await readContractFunction('usmView'),
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
		try {
			const weiAmount = ethers.utils.parseEther(amount)
			const signer = await provider.getSigner()
			const address = await signer.getAddress()
			const usm = await writeContractFunction('usm')
			const gasLimit = await usm.estimateGas.defund(address, weiAmount, 0)
			const gasPrice = await mProvider.getGasPrice()

			const sendtransaction = (gasPrice, gasLimit) => {
				console.log('in send')
				let currentGasLimit = String(Number(gasLimit))
				usm
					.defund(address, weiAmount, 0, {
						gasPrice: gasPrice,
						gasLimit: currentGasLimit
					})
					.then((data) => {
						console.log('in then data', data)
						data && data.hash && verifyTransaction(data.hash, 'fum')
					})
					.catch((error) => {
						console.log('in catch error', error)
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
					})
			}
			sendtransaction(gasPrice, gasLimit)
		} catch (error) {
			// console.log(error.message., 'this is message')
			swal(
				error.message.indexOf('Not allowed during prefund') !== -1
					? 'Not allowed during prefund'
					: 'Something went wrong.'
			)
		}
	}
}

export const sendUsdao = async (address, amount, balance) => {
	try {
		await isMetamastConnected
	} catch (e) {
		swal(`You have to install MetaMask !`)
		return false
	}
	if (address === undefined) {
		swal(`Please Enter Address.`)
		return false
	}
	if (Number(amount) === 0 || amount === undefined) {
		swal(`Please Enter USDAO Amount.`)
		return false
	}
	if (Number(amount) > Number(balance)) {
		swal(`You don't have sufficient USDAO balance. USDAO Balance : ${balance}`)
		return false
	} else {
		const usm = await writeContractFunction('usm')
		Swal.fire({
			title: 'Confirm',
			text: 'Waiting for Metamask Confirmation..'
		})
		const weiAmount = ethers.utils.parseEther(amount)
		const Receiversaddress = ethers.utils.isAddress(address)
		window.usm = usm
		if (!Receiversaddress) {
			swal('Invalid Address.')
		}
		usm
			.transfer(address, String(weiAmount))
			.then((data) => {
				data && data.hash && verifyTransaction(data.hash)
			})
			.catch((error) => console.log(error.toString()))
	}
}

export const sendAsset = async (address, amount, balance) => {
	try {
		await isMetamastConnected
	} catch (e) {
		swal(`You have to install MetaMask !`)
		return false
	}
	// const balance = Number(await metamaskFUM.balanceOf(await metamaskSigner.getAddress()));
	//var fum_balance = Number(ethers.utils.formatEther(String(balance)));
	if (address === undefined) {
		swal(`Please Enter Address.`)
		return false
	}
	if (Number(amount) == 0 || amount === undefined) {
		swal(`Please Enter ASSET Amount.`)
		return false
	}
	if (Number(amount) > Number(balance)) {
		swal(`You don't have sufficient ASSET balance. ASSET Balance : ${balance}`)
		return false
	} else {
		Swal.fire({
			title: 'Confirm',
			text: 'Waiting for Metamask Confirmation..'
		})
		const weiAmount = ethers.utils.parseEther(amount)
		const Receiversaddress = ethers.utils.isAddress(address)
		const fum = await writeContractFunction('fum')
		if (!Receiversaddress) {
			swal('Invalid Address')
		}
		fum
			.transfer(address, String(weiAmount))
			.then((data) => {
				data && data.hash && verifyTransaction(data.hash)
			})
			.catch((error) => console.log(error.toString()))
	}
}

const verifyTransaction = (hash, token) => {
	Swal.fire({
		title: 'Sent to Blockchain',
		html: `<p>Waiting for Blockchain Confirmation...</p>
        <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
	})
	// check transaction
	const mProviderInner = getMetaMask()
	mProviderInner.waitForTransaction(hash).then(async (result) => {
		if (result.status) {
			Swal.fire({
				icon: 'success',
				html: `<p>Transaction Successful</p>
        <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
			})

			if (token) {
				const { totalSupply } = await readContractFunction(token)
				return decimalPlaces(ethers.utils.formatEther(await totalSupply()), 4)
			}
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				html: `<p>Transaction failed!</p>
        <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
			})
		}
	})
}

const isMetamastConnected = new Promise((resolve, reject) => {
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
