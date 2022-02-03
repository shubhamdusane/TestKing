import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import swal from 'sweetalert'

import './Home.scss'
import { readContractFunction } from '../../app/sdk/tradingSdk'
import {
	fetchAllInitialValues,
	buyUSM,
	fetchInitialWeb3Data,
	sellUsm,
	buyFum,
	sellFum
} from './home-functions'
import { decimalPlaces } from '../../utils'
import {
	setEthToUsmOne1,
	setEthToUsm1,
	setUsmToEth1,
	setUsmToEthOne1
} from '../../redux/interactions'
import { getAccoundDetails } from '../../redux/interactions';




const initialBuyingValues = {
	usdaoBuy: true,
	assetBuy: true,
	sendUsdao: true
}

export const NavBar = ({ darkMode, setDarkMode }) => {
	const history = useHistory()

	const toGovernance = () => {
		history.push('/governance')
	}

	const setValue = () => {
		setDarkMode && setDarkMode(!darkMode)
	}

	const toStaking = () => {
		history.push('/staking')
	}
	const [userDetails, setUserDetails] = useState()
	useEffect(() => {
		;(async () => {
			const metamaskDetails = await getAccoundDetails()
			setUserDetails(metamaskDetails)
			if (metamaskDetails.networkType !== 'rinkeby') {
				swal('Please connect to Rinkeby Account/Wallet.')
			}
		})()
	}, [])

	if (window.ethereum) {
		window.ethereum.on('networkChanged', function (networkId) {
			console.log('networkChanged', networkId)
			swal('Please connect to Rinkeby Account/Wallet.')
			window.location.reload()
		})
	}

	return (
		<div className='home-navbar common-nav ' style={{ width: '100%' }}>
			<div className='logoWrap'>
				<img
					src={require('../../assets/images/home_logo.png')}
					alt=''
					onClick={() => {
						history.push('/')
					}}
				/>
			</div>
			<div className='d-flex justify-content-center align-items-center'>
				<p className='common-white-font px-2 pointer m-0' onClick={toStaking}>
					Staking
				</p>
				<p
					className='common-white-font px-2 pointer m-0'
					onClick={toGovernance}
				>
					Governance
				</p>
				{/* <p className='common-white-font px-2 pointer m-0 mode-click'>
					<img
						src={require('../../assets/images/sun.svg')}
						alt=''
						onClick={(e) => setValue()}
					/>
				</p> */}
				{userDetails && (
					<>
						<p className='account-value'>
							<img src='../../assets/ethereum.png' alt='' />{' '}
							{userDetails.networkType}{' '}
						</p>
						{/* <p className='account-value'>
							{' '}
							{decimalPlaces(userDetails.balance)} ETH
							<p className=''>
								{userDetails.address.substring(0, 5)}...
								{userDetails.address.substring(userDetails.address.length - 5)}
							</p>
						</p> */}
					</>
				)}
			</div>
		</div>
	)
}

const Home = (props) => {
	const investment = useRef(null)
	const [supply, setSupply] = useState({
		govSupply: 0,
		usmSupply: 0,
		assetSupply: 0
	})
	const [buyingState, setBuyingState] = useState(initialBuyingValues)
	const [stakingValue, setStakingValue] = useState(10000)
	const [days, setDays] = useState(68)

	const [prices, setPrices] = useState({})

	const [usdaoInput, setUsdaoInput] = useState({ eth: '', usdao: '' })
	const [assetInput, setAssetInput] = useState({ eth: '', asset: '' })
	const [sendInput, setSendInput] = useState({ address: '', value: '' })
	const [activeTab, setActiveTab] = useState('usdao');

	const changeBuyingState = (key, state = true) =>
		setBuyingState({ ...buyingState, [key]: state })

	useEffect(() => {
		;(async () => {
			const accountDetails = await fetchInitialWeb3Data()
			setPrices((state) => ({ ...state, ...accountDetails }))
		})()
	}, [])

	useEffect(() => {
		;(async () => {
			const values = await fetchAllInitialValues()
			setSupply(values.supply)
			setPrices((state) => ({ ...state, ...values.prices }))
		})()
	}, [])

	const refreshAllCards = async () => {
		const web3Values = await fetchInitialWeb3Data()
		const values = await fetchAllInitialValues()

		console.log(values, web3Values, 'check values ......')

		setSupply(values.supply)
		setPrices({ ...values.prices, ...web3Values })
	}

	const [dollarState, setDollarState] = useState(0)

	useEffect(() => {
		getDollarValue()
	}, [assetInput.eth])

	const getDollarValue = async () => {
		const usmView = await readContractFunction('usmView')

		if (assetInput.eth && !buyingState.assetBuy) {
			const value1 = await setUsmToEthOne1(usmView, assetInput.eth)

			setDollarState(value1 * prices.marketPrice)
		}
	}

	return (
		<>
			<div className='home-container'>
				{/* Division 1 starts */}
				<div className='px-5'>
					<NavBar props={props} />
					

					
				</div>
				{/* Division 1 ends */}

				{/* Division 2 starts */}
				<div className='division-2 pb-5  mt-2 pt-5'>
                    <div className='row'>
                        <div className='col-md-6'>
							<div className='card-content px-5'>
								<div className='row'>
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>Market Price</p>
											<p className='bold-font-value'>
												$ {decimalPlaces(Number(prices.marketPrice))}
											</p>
										</div>
									</div>
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>ETHER Balance</p>
											<p className='bold-font-value'>
												 {decimalPlaces(prices.etherBalanceFormatted)}
											</p>
										</div>
									</div>
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>Total Collateral</p>
											<p className='bold-font-value'>
												$ {decimalPlaces(prices.totalCollateral)}
											</p>
										</div>
									</div>
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>USDAO Balance</p>
											<p className='bold-font-value'>
												 {decimalPlaces(prices.usmBalanceFormatted)}
											</p>
										</div>
									</div>
									
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>Buffer</p>
											<p className='bold-font-value'>
												$ {decimalPlaces(prices.totalBuffer)}
											</p>
										</div>
									</div>
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>ASSET Balance</p>
											<p className='bold-font-value'>
												 {decimalPlaces(prices.assetBalance)}
											</p>
										</div>
									</div>
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>Debt Ratio</p>
											<p className='bold-font-value'>
												 {decimalPlaces(Number(prices.debtRatio) * 100)} %
											</p>
										</div>
									</div>
									
									
									
									<div className='col-md-6 d-flex justify-content-center align-items-center'>
										<div className='card-design'>
											<p>Staked Amount</p>
											<p className='bold-font-value'>
												 {decimalPlaces(prices.stakedBalance)} USDAO
											</p>
										</div>
									</div>
									
								</div>
							</div>
                        </div>
                        <div className='col-md-6 tradingWrapper'>
							<div className='col-md-12 pl-0 pr-0'>
								<div className='tabWrapper'>
									<button className={activeTab === "usdao" && 'active'} onClick={()=>{setActiveTab('usdao')}}> USDAO</button>
									<button className={activeTab === "asset" && 'active'} onClick={()=>{setActiveTab('asset')}}>ASSET</button>
								</div>
							</div>
							
                        <div className='calculation-area pt-5 mt-2 row'>
						{ activeTab === "usdao" && 
							<div className='col-md-12 justify-content-center align-items-center'>
							<div className='calculation-card text-center px-5'>
								<div className='row text-center'>
									<div className='col'>
										<p>USDAO</p>
									</div>
								</div>
								<div className='buy-sell-part row my-4'>
									<div
										className={
											buyingState.usdaoBuy
												? 'col-6 text-center buy-sell-orange pointer'
												: 'col-6 text-center buy-sell-white pointer'
										}
										onClick={() => {
											changeBuyingState('usdaoBuy')
											setUsdaoInput({ usdao: '', eth: '' })
										}}
									>
										BUY
									</div>
									<div
										className={
											buyingState.usdaoBuy
												? 'col-6 text-center buy-sell-white pointer'
												: 'col-6 text-center buy-sell-orange pointer'
										}
										onClick={() => {
											changeBuyingState('usdaoBuy', false)
											setUsdaoInput({ usdao: '', eth: '' })
										}}
									>
										SELL
									</div>
								</div>
								<div className='input-content '>
									<input
										placeholder='0.0000'
										ref={investment}
										className={`enable ${buyingState.usdaoBuy ? 'buy' : 'sell'}`}
										value={
											buyingState.usdaoBuy ? usdaoInput.eth : usdaoInput.usdao
										}
										onChange={(e) => {
											;(async () => {
												const value = e.target.value
												let value1 = ''
												if (!value) {
													setUsdaoInput({
														eth: '',
														usdao: ''
													})
													return
												}
												if (buyingState.usdaoBuy) {
													setUsdaoInput({
														eth: value,
														usdao: ''
													})
												} else {
													setUsdaoInput({
														eth: '',
														usdao: value
													})
												}

												if (buyingState.usdaoBuy) {
													const usmView = await readContractFunction('usmView')
													value1 = await setEthToUsm1(usmView, value)
													setUsdaoInput((state) => ({
														...state,
														usdao: decimalPlaces(value1)
													}))
												} else {
													const usmView = await readContractFunction('usmView')
													value1 = await setUsmToEth1(usmView, value)
													// { ...usdaoInput, usdao: value }
													setUsdaoInput((state) => ({
														...state,
														eth: value1
													}))
												}
											})()
										}}
									/>
									<button
										className='linear-button-1 pointer'
										onClick={() => {
											;(async () => {
												if (buyingState.usdaoBuy) {
													const value = prices.etherBalanceFormatted
													let value1 = ''
													setUsdaoInput({
														...assetInput,
														eth: decimalPlaces(value)
													})
													if (value) {
														const usmView = await readContractFunction(
															'usmView'
														)
														value1 = await setEthToUsm1(usmView, value)
													}

													setUsdaoInput((state) => ({
														...state,
														usdao: decimalPlaces(value1)
													}))
												} else {
													const value = prices.usmBalanceFormatted
													let value1 = ''
													setUsdaoInput({
														...assetInput,
														usdao: decimalPlaces(value)
													})
													if (value) {
														const usmView = await readContractFunction(
															'usmView'
														)
														value1 = await setUsmToEth1(usmView, value)
													}

													setUsdaoInput((state) => ({
														...state,
														eth: decimalPlaces(value1)
													}))
												}
											})()
										}}
									>
										MAX
									</button>
									<button className='linear-button-orange pointer'>
										{buyingState.usdaoBuy ? 'ETH' : 'USDAO'}
									</button>
								</div>
								<div className='input-content '>
									<input
										placeholder='0.0000'
										disabled
										value={
											buyingState.usdaoBuy ? usdaoInput.usdao : usdaoInput.eth
										}
										onChange={(e) => {
											if (buyingState.usdaoBuy) {
												setUsdaoInput({ ...usdaoInput, usdao: e.target.value })
											} else {
												setUsdaoInput({ ...usdaoInput, eth: e.target.value })
											}
										}}
									/>

									<button className='linear-button-orange pointer'>
										{buyingState.usdaoBuy ? 'USDAO' : 'ETH'}
									</button>
								</div>
								<div className='text-right'>
									{`$ ${decimalPlaces(
										buyingState.assetBuy
											? Number(usdaoInput.eth) * Number(prices.marketPrice)
											: Number(dollarState)
									)}`}
								</div>
								<div className='button-content '>
									<button
										style={{
											backgroundColor: '#1F1C2B',
											padding: '0.5rem 3rem'
										}}
										className='linear-button pointer'
										onClick={async () => {
											if (buyingState.usdaoBuy) {
												await buyUSM(usdaoInput.eth)
												setTimeout(() => {
													refreshAllCards()
												}, 30000)
											} else {
												await sellUsm(
													usdaoInput.usdao,
													prices.usmBalanceFormatted
												)
												setTimeout(() => {
													refreshAllCards()
												}, 30000)
											}
										}}
									>
										{buyingState.usdaoBuy ? 'BUY' : 'SELL'}
									</button>
								</div>
							</div>
						</div>}
						{/* Asset card buy /sell part */}
						{ activeTab === "asset" && 
						<div className='col-md-12 justify-content-center align-items-center'>
							<div className='calculation-card text-center px-5'>
								<div className='row text-center'>
									<div className='col'>
										<p>ASSET</p>
									</div>
								</div>
								<div className='buy-sell-part row my-4'>
									<div
										className={
											buyingState.assetBuy
												? 'col-6 text-center buy-sell-orange pointer'
												: 'col-6 text-center buy-sell-white pointer'
										}
										onClick={() => {
											setAssetInput({ asset: '', eth: '' })
											changeBuyingState('assetBuy')
										}}
									>
										BUY
									</div>
									<div
										className={
											buyingState.assetBuy
												? 'col-6 text-center buy-sell-white pointer'
												: 'col-6 text-center buy-sell-orange pointer'
										}
										onClick={() => {
											setAssetInput({ asset: '', eth: '' })
											changeBuyingState('assetBuy', false)
										}}
									>
										SELL
									</div>
								</div>
								<div className='input-content '>
									<input
										placeholder='0.0000'
										className={`enable ${buyingState.assetBuy ? 'buy-asset' : 'sell'}`}
										onChange={(e) => {
											;(async () => {
												const value = e.target.value
												let value1 = ''
												if (buyingState.assetBuy) {
													setAssetInput({
														...assetInput,
														eth: value
													})
												} else {
													setAssetInput({
														...assetInput,
														asset: value
													})
												}
												const usmView = await readContractFunction('usmView')
												if (value && buyingState.assetBuy) {
													value1 = await setEthToUsmOne1(usmView, value)
												} else {
													value1 = await setUsmToEthOne1(usmView, value)
												}
												if (buyingState.assetBuy) {
													setAssetInput((state) => ({
														...state,
														asset: decimalPlaces(value1)
													}))
												} else {
													setAssetInput((state) => ({
														...state,
														eth: value1
													}))
												}
											})()
										}}
										value={
											buyingState.assetBuy ? assetInput.eth : assetInput.asset
										}
									/>
									<button
										className='linear-button-1 pointer'
										onClick={async () => {
											if (buyingState.assetBuy) {
												const usmView = await readContractFunction('usmView')
												const value = decimalPlaces(
													prices.etherBalanceFormatted
												)
												const value1 = await setEthToUsmOne1(usmView, value)
												setAssetInput({
													eth: value,
													asset: value1
												})
											} else {
												const usmView = await readContractFunction('usmView')
												const value = decimalPlaces(prices.assetBalance)
												const value1 = await setUsmToEthOne1(
													usmView,
													prices.assetBalance
												)
												setAssetInput({
													eth: value1,
													asset: value
												})
											}
										}}
									>
										MAX
									</button>
									<button className='linear-button-orange pointer'>
										{buyingState.assetBuy ? 'ETH' : 'ASSET'}
									</button>
								</div>
								<div className='input-content '>
									<input
										placeholder='0.0000'
										value={
											!buyingState.assetBuy ? assetInput.eth : assetInput.asset
										}
										disabled
									/>

									<button className='linear-button-orange pointer'>
										{!buyingState.assetBuy ? 'ETH' : 'ASSET'}
									</button>
								</div>
								<div className='text-right'>
									{`$ ${decimalPlaces(
										Number(assetInput.eth) * Number(prices.marketPrice)
									)}`}
								</div>
								<div className='button-content '>
									<button
										style={{
											backgroundColor: '#1F1C2B',
											padding: '0.5rem 3rem'
										}}
										className='linear-button pointer'
										onClick={async () => {
											if (buyingState.assetBuy) {
												await buyFum(
													assetInput.eth,
													prices.etherBalanceFormatted
												)
												setTimeout(() => {
													refreshAllCards()
												}, 30000)
											} else {
												await sellFum(assetInput.asset, prices.assetBalance)
												setTimeout(() => {
													refreshAllCards()
												}, 30000)
											}
										}}
									>
										{buyingState.assetBuy ? 'BUY' : 'SELL'}
									</button>
								</div>
							</div>
						</div>
						}

					</div>
                        </div>
                    </div>
					
					

					
				</div>
				{/* Division 2 ends */}
			</div>
		</>
	)
}

export default Home
