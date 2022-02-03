import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import './Home.scss'
import { readContractFunction } from '../../app/sdk/tradingSdk'
import {
	fetchAllInitialValues,
	buyUSM,
	fetchInitialWeb3Data,
	sellUsm,
	buyFum,
	sellFum,
	sendUsdao,
	sendAsset
} from './home-functions'
import HomeFooter from '../../app/home/HomeFooter'
import { decimalPlaces } from '../../utils'
import {
	setEthToUsmOne1,
	setEthToUsm1,
	setUsmToEth1,
	setUsmToEthOne1
} from '../../redux/interactions'
import { getAccoundDetails } from '../../redux/interactions'
import swal from 'sweetalert'

const marks = {
	1000: '1000',
	10000000: '10M'
}

const dayMarks = {
	1: '1',
	365: '365'
}

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
			console.log('metamaskDetails', metamaskDetails)
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
		<div className='home-navbar common-nav' style={{ width: '100%' }}>
			<div>
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
				<p className='common-white-font px-2 pointer m-0 mode-click'>
					<img
						src={require('../../assets/images/sun.svg')}
						alt=''
						onClick={(e) => setValue()}
					/>
				</p>
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

	const changeBuyingState = (key, state = true) =>
		setBuyingState({ ...buyingState, [key]: state })

	useEffect(() => {
		;(async () => {
			const web3Values = await fetchInitialWeb3Data()

			setPrices((state) => ({ ...state, ...web3Values }))
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

		console.log(assetInput.asset, 'value ??')
		if (assetInput.eth && !buyingState.assetBuy) {
			const value1 = await setUsmToEthOne1(usmView, assetInput.eth)

			setDollarState(value1 * prices.marketPrice)
		}
	}

	return (
		<>
		<div className='home-container'>
			{/* Division 1 starts */}
			<div className='division-1 px-5'>
				
				<NavBar props ={props}/>
				<div className='home-content mt-5 mb-3 pt-5'>
					<div className='text-center'>
						<p className='big-font-1'>TRULY DECENTRALIZED</p>
						<p className='orange-color big-font'>GLOBAL DIGITAL CURRENCY</p>
					</div>
					<div className='caption-content text-center'>
						<p>
							Looking to learn more about USDAO? No matter where you’re from,
							here are the best resources available in order to get educated,
							and become part of the Community.
						</p>
					</div>
					<div className='home-content-button text-center my-4'>
						<button className='linear-button px-4' onClick={() => {investment.current.focus();console.log(investment.current);}}>Start Investing</button>
						<a className='linear-button px-4'
							href='https://docs.usdao.io/'
							style={{ color: 'white' }}
							target='_blank'>Read The Docs</a>
					</div>

					<div className='home-card mt-5 '>
						<div className='row'>
							<div className='col-md-4 d-flex justify-content-center'>
								<div className='card-design '>
									<img
										src={require('../../assets/images/home-card-usdao.svg')}
										alt=''
										className='mx-2'
									/>
									<div className='mx-2 text-left'>
										<p>USDAO in Circulation</p>
										<p>{supply.usmSupply}</p>
									</div>
								</div>
							</div>
							<div className='col-md-4 d-flex justify-content-center'>
								<div className='card-design '>
									<img
										src={require('../../assets/images/home-card-gov.svg')}
										alt=''
										className='mx-2'
									/>
									<div className='mx-2 text-left'>
										<p>Governance in Circulation</p>
										<p>{supply.govSupply}</p>
									</div>
								</div>
							</div>
							<div className='col-md-4 d-flex justify-content-center'>
								<div className='card-design '>
									<img
										src={require('../../assets/images/home-card-asset.svg')}
										alt=''
										className='mx-2'
									/>
									<div className='mx-2 text-left'>
										<p>ASSET in Circulation</p>
										<p>{supply.assetSupply}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Division 1 ends */}

				{/* Division 2 starts */}
				<div className='division-2 pb-5 mb-5 mt-5 pt-5'>
					<div className='main-title d-flex justify-content-center align-items-center'>
						<p className='orange-color'>USDAO</p>
						<p>QUICK</p>
					</div>
					<div className='card-content px-5 pt-5'>
						<div className='row'>
							{/* d-flex justify-content-between align-items-center */}
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>Market Price</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(Number(prices.marketPrice))}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>Total Collateral</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(prices.totalCollateral)}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>Buffer</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(prices.totalBuffer)}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>Debt Ratio</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(Number(prices.debtRatio) * 100)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='card-content px-5 pt-5'>
						<div className='row'>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>ASSET Balance</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(prices.assetBalance)}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>USDAO Balance</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(prices.usmBalanceFormatted)}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>ETHER Balance</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(prices.etherBalanceFormatted)}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex justify-content-center align-items-center'>
								<div className='card-design'>
									<p>Staked Amount</p>
									<p className='bold-font-value'>
										$ {decimalPlaces(prices.stakedBalance)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='calculation-area pt-5 mt-5 row'>
						<div className='col-md-4 d-flex justify-content-center align-items-center'>
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
												? 'col-md-6 text-center buy-sell-orange pointer'
												: 'col-md-6 text-center buy-sell-white pointer'
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
												? 'col-md-6 text-center buy-sell-white pointer'
												: 'col-md-6 text-center buy-sell-orange pointer'
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
						</div>
						{/* Asset card buy /sell part */}
						<div className='col-md-4 d-flex justify-content-center align-items-center'>
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
												? 'col-md-6 text-center buy-sell-orange pointer'
												: 'col-md-6 text-center buy-sell-white pointer'
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
												? 'col-md-6 text-center buy-sell-white pointer'
												: 'col-md-6 text-center buy-sell-orange pointer'
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

						{/* Sel/buy usdao 3rd part */}
						<div className='col-md-4 d-flex justify-content-center align-items-center'>
							<div className='calculation-card text-center px-5'>
								<div className='row text-center'>
									<div className='col'>
										<p>SEND</p>
									</div>
								</div>
								<div className='buy-sell-part row my-4'>
									<div
										className={
											buyingState.sendUsdao
												? 'col-md-6 text-center buy-sell-orange pointer'
												: 'col-md-6 text-center buy-sell-white pointer'
										}
										onClick={() => {
											changeBuyingState('sendUsdao')
											setSendInput({ address: '', value: '' })
										}}
									>
										USDAO
									</div>
									<div
										className={
											buyingState.sendUsdao
												? 'col-md-6 text-center buy-sell-white pointer'
												: 'col-md-6 text-center buy-sell-orange pointer'
										}
										onClick={() => {
											changeBuyingState('sendUsdao', false)
											setSendInput({ address: '', value: '' })
										}}
									>
										ASSET
									</div>
								</div>
								<div className='input-content '>
									<input
										placeholder='Address'
										onChange={(e) =>
											setSendInput({ ...sendInput, address: e.target.value })
										}
										value={sendInput.address}
									/>

									<button className='linear-button-orange pointer'>
										Address
									</button>
								</div>
								<div className='input-content '>
									<input
										placeholder='0.0000'
										onChange={(e) =>
											setSendInput({ ...sendInput, value: e.target.value })
										}
										value={sendInput.value}
									/>

									<button className='linear-button-orange'>
										{buyingState.sendUsdao ? 'USDAO' : 'ASSET'}
									</button>
								</div>
								<div className='button-content pointer'>
									<button
										style={{
											backgroundColor: '#1F1C2B',
											padding: '0.5rem 3rem'
										}}
										className='linear-button'
										onClick={async () => {
											if (buyingState.sendUsdao) {
												await sendUsdao(
													sendInput.address,
													sendInput.value,
													prices.usmBalanceFormatted
												)
												setTimeout(() => {
													refreshAllCards()
												}, 30000)
											} else {
												await sendAsset(
													sendInput.address,
													sendInput.value,
													prices.assetBalance
												)
												setTimeout(() => {
													refreshAllCards()
												}, 30000)
											}
										}}
									>
										SEND
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Division 2 ends */}
			</div>
		</div>
			<HomeFooter />
		</>
	)
}

export default Home
