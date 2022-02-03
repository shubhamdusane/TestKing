import React, { useState } from 'react'
import TodoListComponent from '../apps/Input'
import TodoListComponentOne from '../apps/Input1'
import { stringMul, decimalPlaces } from '../../utils'
import BuyForm from '../apps/InputSend'
import { connect } from 'react-redux'
import {
	coingeckoPriceSelector,
	metamaskSelector,
	usmInputAmountSelector,
	usmInputAmountOneSelector,
	usmInputAmountChangeSelector,
	usmInputAmountSellChangeSelector,
	usmInputAmountChangeSelector1,
	usmInputAmountSellChangeSelector1,
	metamaskSignerSelector,
	metamaskUSMSelector,
	usmBurnsSelector,
	usmBuyPriceSelector,
	usmMintsSelector,
	usmSellPriceSelector,
	usmSupplySelector,
	fumBalanceSelector,
	usmBalanceSelector,
	dynamicBalanceSelector,
	etherBalanceSelector,
	metamaskFUMSelector,
	medianPriceSelector
} from '../../redux/selectors'
import {
	buyUSM,
	loadMetamask,
	sellUSM,
	buyFUM,
	sellFUM,
	SendUSDAO,
	SendASSET,
	setEthToUsm,
	setEthToUsmOne,
	setUsmToEthOne,
	setUsmToEth,
	isMetamastConnected
} from '../../redux/interactions'
import { setInputAmount, setInputAmount1 } from '../../redux/actions'
import { reset } from 'redux-form'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import swal from 'sweetalert'
import { contractDetails } from '../sdk/ContractDetails'
const { TabPane } = Tabs
const { usm, usmView } = contractDetails

const WorkingArea = ({
	dispatch,
	usmSupply,
	usmMints,
	usmBurns,
	usmMarketCap,
	usmMarketCapUSD,
	usmBuyPrice,
	usmBuyPriceUSD,
	usmSellPrice,
	usmSellPriceUSD,
	metamaskSigner,
	metamaskConnected,
	metamaskFUM,
	metamaskUSM,
	inputAmount,
	inputAmountOne,
	inputAmountChange,
	inputAmountSellChange,
	inputAmountChange1,
	inputAmountSellChange1,
	fum_balance,
	usm_balance,
	dynamic_balance,
	ether_balance,
	usdaoBuyRef,
	assetRef,
	setFumSupply,
	setUsmSupply,
	marketPrice,
	mode
}) => {
	const [usdao_eth_value, setUSDAOEthValue] = useState(),
		[usdao_value, setUSDAOValue] = useState(),
		[eth_asset_value, setASSETEthValue] = useState(),
		[eth_usdao_value, setEthUSDAOVALUE] = useState(),
		[eth_usdao_value_buy, setEthUSDAOVALUEBUY] = useState(),
		[asset_value, setASSETValue] = useState()
	const [sellValue, setSellValue] = useState({ usdao: '', asset: '' })
	React.useEffect(() => {
		connectMetamask()
	}, [])

	const connectMetamask = async () => {
		await loadMetamask(dispatch)
	}
	const maxHandler = (type) => {
		let usdaoVal
		const actualETHBal =
				ether_balance > 0.01 ? String(ether_balance - 0.01) : 0,
			actualAssetBal =
				decimalPlaces(fum_balance) > 0.03 ? String(fum_balance - 0.03) : 0
		switch (type) {
			case 'eth':
				usdaoVal = actualETHBal * marketPrice
				setEthUSDAOVALUEBUY(usdaoVal)

				setUSDAOEthValue(actualETHBal)
				setEthToUsm(dispatch, usmView, actualETHBal)
				dispatch(setInputAmount(usm.name, actualETHBal))
				break
			case 'usdao':
				setUSDAOValue(Number(usm_balance))
				setUsmToEth(dispatch, usmView, usm_balance)
				dispatch(setInputAmount(usm.name, usm_balance))
				break
			case 'asset_eth':
				usdaoVal = actualETHBal * marketPrice
				setEthUSDAOVALUE(usdaoVal)
				setASSETEthValue(actualETHBal)
				setEthToUsmOne(dispatch, usmView, actualETHBal)
				dispatch(setInputAmount1(usm.name, actualETHBal))
				break
			case 'asset':
				setASSETValue(actualAssetBal)
				setUsmToEthOne(dispatch, usmView, actualAssetBal)
				dispatch(setInputAmount1(usm.name, actualAssetBal))
				break
		}
	}
	const buyUsm = async (e) => {
		try {
			await isMetamastConnected
		} catch (e) {
			swal(`You have to install MetaMask !`)
			return false
		}
		if (!usdao_eth_value || usdao_eth_value == 0) {
			if (Number(ether_balance) == 0) {
				swal("You don't have sufficient balance")
				return false
			} else {
				swal(`Please Enter ETH Amount.`)
				return false
			}
		}
		if (Number(inputAmount) > Number(ether_balance)) {
			swal("You don't have sufficient balance")
		} else {
			buyUSM(
				dispatch,
				metamaskUSM,
				metamaskSigner,
				usdao_eth_value,
				usm_balance,
				setUsmSupply
			)
		}
		// buyUSM(dispatch, metamaskUSM, metamaskSigner, inputAmount)
	}

	const buyFum = async (e) => {
		try {
			await isMetamastConnected
		} catch (e) {
			swal(`You have to install MetaMask !`)
			return false
		}
		if (!eth_asset_value || eth_asset_value == 0) {
			if (Number(ether_balance) == 0) {
				swal("You don't have sufficient balance")
				return false
			} else {
				swal(`Please Enter ETH Amount.`)
				return false
			}
		}
		if (Number(eth_asset_value) > Number(ether_balance)) {
			swal("You don't have sufficient balance")
		} else {
			buyFUM(
				dispatch,
				metamaskUSM,
				metamaskSigner,
				eth_asset_value,
				ether_balance,
				setFumSupply
			)
		}
		// buyFUM(dispatch, metamaskUSM, metamaskSigner, inputAmount)
	}

	const setAmount = (e) => {
		e.preventDefault()
		var value = e.target.value
		setUSDAOEthValue(value)
		console.log('marketPrice-----------', marketPrice)
		console.log('value----------', value)
		let usdaoVal = value * marketPrice
		console.log('usdaoVal--------------', usdaoVal)
		setEthUSDAOVALUEBUY(usdaoVal)
		if (value == '' || value == 0) {
			value = '0'
		}
		setEthToUsm(dispatch, usmView, value)
		dispatch(setInputAmount(usm.name, value))
	}

	const setAmountsell = (e) => {
		e.preventDefault()
		var value = e.target.value
		setUSDAOValue(value)
		if (value == '' || value == 0) {
			value = '0'
		}
		setUsmToEth(dispatch, usmView, value)
		dispatch(setInputAmount(usm.name, value))
	}

	const setAmount1 = (e) => {
		e.preventDefault()
		var value = e.target.value
		setASSETEthValue(value)
		if (value == '' || value == 0) {
			value = '0'
		}
		let usdaoVal = value * marketPrice
		setEthUSDAOVALUE(usdaoVal)
		setEthToUsmOne(dispatch, usmView, value)
		dispatch(setInputAmount1(usm.name, value))
	}

	const setAmountsell1 = (e) => {
		e.preventDefault()
		var value = e.target.value
		setASSETValue(value)
		if (value == '' || value == 0) {
			value = '0'
		}

		setUsmToEthOne(dispatch, usmView, value)
		dispatch(setInputAmount1(usm.name, value))
	}

	const sellUsm = async (e) => {
		try {
			await isMetamastConnected
		} catch (e) {
			swal(`You have to install MetaMask !`)
			return false
		}
		if (!usdao_value || usdao_value == 0) {
			if (Number(usm_balance) == 0) {
				swal("You don't have sufficient balance")
				return
			} else {
				swal(`Please Enter USDAO Amount.`)
				return false
			}
		}
		if (Number(usdao_value) > Number(usm_balance)) {
			swal("You don't have sufficient balance")
		} else {
			sellUSM(
				dispatch,
				metamaskUSM,
				metamaskSigner,
				usdao_value,
				ether_balance,
				setUsmSupply
			)
		}
	}

	const sellFum = async (e) => {
		try {
			await isMetamastConnected
		} catch (e) {
			swal(`You have to install MetaMask !`)
			return false
		}
		if (!asset_value || asset_value == 0) {
			if (Number(fum_balance) == 0) {
				swal("You don't have sufficient balance")
				return false
			} else {
				swal(`Please Enter ASSET Amount.`)
				return false
			}
		}
		if (Number(inputAmountOne) > Number(fum_balance)) {
			swal("You don't have sufficient balance")
		} else if (Number(inputAmountOne) == Number(fum_balance)) {
			swal('You can sell max amount only')
		} else {
			sellFUM(
				dispatch,
				metamaskUSM,
				metamaskSigner,
				inputAmountOne,
				ether_balance,
				setFumSupply
			)
		}
		// sellFUM(dispatch, metamaskUSM, metamaskSigner, inputAmount)
	}

	const SendUsdao = async (values, dispatch) => {
		try {
			await isMetamastConnected
		} catch (e) {
			swal(`You have to install MetaMask !`)
			return false
		}
		if (values.address === undefined) {
			swal(`Please Enter Address.`)
			return false
		}
		if (Number(values.amount) === 0 || values.amount === undefined) {
			swal(`Please Enter USDAO Amount.`)
			return false
		}
		if (Number(values.amount) > Number(usm_balance)) {
			swal(
				`You don't have sufficient USDAO balance. USDAO Balance : ${usm_balance}`
			)
			return false
		} else {
			SendUSDAO(
				dispatch,
				metamaskUSM,
				metamaskSigner,
				values.amount,
				values.address,
				usm_balance
			)
		}
		dispatch(reset('BuyForm'))
	}

	const SendAsset = async (values, dispatch) => {
		try {
			await isMetamastConnected
		} catch (e) {
			swal(`You have to install MetaMask !`)
			return false
		}
		// const balance = Number(await metamaskFUM.balanceOf(await metamaskSigner.getAddress()));
		//var fum_balance = Number(ethers.utils.formatEther(String(balance)));
		if (values.address === undefined) {
			swal(`Please Enter Address.`)
			return false
		}
		if (Number(values.amount) == 0 || values.amount === undefined) {
			swal(`Please Enter ASSET Amount.`)
			return false
		}
		if (Number(values.amount) > Number(fum_balance)) {
			swal(
				`You don't have sufficient ASSET balance. ASSET Balance : ${fum_balance}`
			)
			return false
		} else {
			SendASSET(
				dispatch,
				metamaskFUM,
				metamaskSigner,
				values.amount,
				values.address,
				fum_balance
			)
		}

		// SendASSET(dispatch, metamaskFUM, metamaskSigner, values.amount, values.address)
		dispatch(reset('BuyForm'))
	}

	return (
		<>
			<div className='w-100 workspace'>
				<div className='d-flex flex-wrap'>
					<div className='col-sm-12 col-lg-4'>
						<div className='card'>
							<div className='card-body'>
								<h4 className='project__title about__title'>USDAO</h4>
								{/* <h6 className="project__sub__title">Enter amount of Ether as input.</h6> */}
								<TodoListComponent
									submitBuy={buyUsm}
									submitSell={sellUsm}
									inputChangeHandler={setAmount}
									inputChangeHandler3={setAmountsell}
									inputChangeHandler1={inputAmountChange}
									inputChangeHandler4={eth_usdao_value_buy}
									inputChangeHandler2={inputAmountSellChange}
									usdaoBuyRef={usdaoBuyRef}
									maxHandler={maxHandler}
									usdao_eth_value={usdao_eth_value}
									usdao_value={usdao_value}
									mode={mode}
								/>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-lg-4'>
						<div className='card'>
							<div className='card-body'>
								<h4 className='project__title about__title'>ASSET</h4>
								{/* <h6 className="project__sub__title">Enter amount of Ether as input.</h6> */}
								<TodoListComponentOne
									submitBuy={buyFum}
									submitSell={sellFum}
									inputChangeHandler={setAmount1}
									inputChangeHandler3={setAmountsell1}
									inputChangeHandler1={inputAmountChange1}
									inputChangeHandler2={inputAmountSellChange1}
									inputChangeHandler4={eth_usdao_value}
									assetRef={assetRef}
									maxHandler={maxHandler}
									eth_asset_value={eth_asset_value}
									asset_value={asset_value}
									mode={mode}
								/>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-lg-4'>
						<div className='card'>
							<div className='card-body'>
								<h4 className='project__title about__title'>SEND</h4>
								{/* <h6 className="project__sub__title">Enter amount of Ether as input.</h6> */}
								{/* <BuyForm onSubmit={SendUsdao}/> */}
								<Tabs defaultActiveKey='1'>
									<TabPane tab='USDAO' key='1' style={{ color: 'white' }}>
										<BuyForm onSubmit={SendUsdao} tokenName='USDAO' />
									</TabPane>
									<TabPane tab='ASSET' key='2' style={{ color: 'white' }}>
										<BuyForm onSubmit={SendAsset} tokenName='ASSET' />
									</TabPane>
								</Tabs>
							</div>
						</div>
					</div>

					{/* <FUMCARD /> */}
				</div>
			</div>

			{/* <div className="col-md-12 col-xl-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body p-3">
                <div className="d-flex">
                  <h6 className="current__balance flex-1">Current Balance</h6>
                  <img className="refresh__img pointer" src={require('../../assets/images/refresh.png')} onClick={()=>loadNetwork(dispatch)} />
                </div>
                <CurrentBalance />
              </div>
            </div>
          </div> */}
		</>
	)
}

const mapStateToProps = (state) => {
	const coingeckoPrice = coingeckoPriceSelector(state)
	const marketPrice = medianPriceSelector(state)

	const usmSupply = usmSupplySelector(state)
	const usmBuyPrice = usmBuyPriceSelector(state)
	const usmSellPrice = usmSellPriceSelector(state)
	const usmMarketCap = usmSupply * usmBuyPrice
	const usmBuyPriceUSD = stringMul(usmBuyPrice, coingeckoPrice)
	const usmSellPriceUSD = stringMul(usmSellPrice, coingeckoPrice)
	const usmMarketCapUSD = stringMul(usmMarketCap, coingeckoPrice)
	const fum_balance = fumBalanceSelector(state)
	const usm_balance = usmBalanceSelector(state)
	const dynamic_balance = dynamicBalanceSelector(state)
	const ether_balance = etherBalanceSelector(state)
	const metamask = metamaskSelector(state)
	const metamaskConnected = metamask != null
	return {
		inputAmount: usmInputAmountSelector(state),
		inputAmountOne: usmInputAmountOneSelector(state),
		inputAmountChange: usmInputAmountChangeSelector(state),
		inputAmountSellChange: usmInputAmountSellChangeSelector(state),
		inputAmountChange1: usmInputAmountChangeSelector1(state),
		inputAmountSellChange1: usmInputAmountSellChangeSelector1(state),
		usmMarketCap,
		usmMarketCapUSD,
		usmSupply,
		usmMints: usmMintsSelector(state),
		usmBurns: usmBurnsSelector(state),
		usmBuyPrice,
		usmBuyPriceUSD,
		usmSellPrice,
		usmSellPriceUSD,
		metamaskConnected,
		metamaskSigner: metamaskSignerSelector(state),
		metamaskUSM: metamaskUSMSelector(state),
		metamaskFUM: metamaskFUMSelector(state),
		fum_balance,
		usm_balance,
		dynamic_balance,
		ether_balance,
		marketPrice
	}
}

export default connect(mapStateToProps)(WorkingArea)
