import { ethers } from 'ethers'
import {
	setCollateral,
	setDebtRatio,
	setEthBuffer,
	setFUMPrice,
	setUSMPrice,
	setUsmToEth,
	setEthToUsm
} from '../actions'
import { contractDetails } from '../../app/sdk/ContractDetails'
const { usmView } = contractDetails
export const loadCollateralData = async (
	dispatch,
	contract,
	network,
	provider
) => {
	const usmViewabi = usmView.abi
	const address = usmView.address[network.chainId]
	const usmViewContract = await new ethers.Contract(
		address,
		usmViewabi,
		provider
	)

	getCollateral(dispatch, contract)
	getDebtRatio(dispatch, usmViewContract)
	getEthToUsm(dispatch, usmViewContract)
	getUsmToEth(dispatch, usmViewContract)
	getEthBuffer(dispatch, usmViewContract)
	getUSMPrice(dispatch, usmViewContract)
	getFUMPrice(dispatch, usmViewContract)
}

export const getCollateral = async (dispatch, contract) => {
	const collateral = await contract.ethPool()
	//console.log("collateral", collateral)
	const formattedCollateral = ethers.utils.formatEther(collateral)
	dispatch(setCollateral(formattedCollateral))
}

export const getDebtRatio = async (dispatch, contract) => {
	const ratio = await contract.debtRatio()
	//console.log("debitratio: "+ratio)
	const formattedRatio = ethers.utils.formatEther(ratio)
	dispatch(setDebtRatio(formattedRatio))
}

export const getEthBuffer = async (dispatch, smcontract) => {
	//console.log("logggg", smcontract)
	const ethBuffer = await smcontract.ethBuffer(false)
	//console.log("ethBuffer", ethBuffer)
	const formattedBuffer = ethers.utils.formatEther(ethBuffer)
	dispatch(setEthBuffer(formattedBuffer))
}

export const getEthToUsm = async (dispatch, contract) => {
	//   //console.log("getEthToUsm")
	// const buyPrice = await contract.ethToUsm(0)
	// //console.log("getEthToUsm", buyPrice)
	// const formattedBuyPrice = ethers.utils.formatEther(buyPrice)
	// const sellPrice = await contract.ethToUsm(1)
	// const formattedSellPrice = ethers.utils.formatEther(sellPrice)
	// dispatch(setEthToUsm(formattedBuyPrice, formattedSellPrice))
}

export const getUsmToEth = async (dispatch, contract) => {
	//   //console.log("getUsmToEth")
	// const buyPrice = await contract.usmToEth(0)
	// //console.log("getUsmToEth", buyPrice)
	// const formattedBuyPrice = ethers.utils.formatEther(buyPrice)
	// const sellPrice = await contract.usmToEth(1)
	// const formattedSellPrice = ethers.utils.formatEther(sellPrice)
	// dispatch(setUsmToEth(formattedBuyPrice, formattedSellPrice))
}

export const getUSMPrice = async (dispatch, contract) => {
	window.usmView = contract
	// console.log("usm contract--",contra);
	//console.log("buyPrice")
	// const buyPrice = await contract.usmMint(String(1e18))
	// //console.log("buyPrice", buyPrice)
	// const formattedBuyPrice = ethers.utils.formatEther(buyPrice)
	// const sellPrice = await contract.usmBurn(String(100e18))
	// const formattedSellPrice = ethers.utils.formatEther(sellPrice)
	// dispatch(setUSMPrice(formattedBuyPrice, formattedSellPrice))
}

export const getFUMPrice = async (dispatch, contract) => {
	console.log('const buyPrice = await contract.fumPrice(0)', contract)
	const buyPrice = await contract.fumPrice(0, 0)
	const formattedBuyPrice = ethers.utils.formatEther(buyPrice)
	const sellPrice = await contract.fumPrice(1, 0)
	const formattedSellPrice = ethers.utils.formatEther(sellPrice)
	dispatch(setFUMPrice(formattedBuyPrice, formattedSellPrice))
}
