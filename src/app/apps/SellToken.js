import React, { useEffect, useState } from 'react'
import web3 from 'web3'
import { ethers } from 'ethers'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import { decimalPlaces } from '../../utils'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { readContractFunction, writeContractFunction } from '../sdk/tradingSdk'
import { getMetaMask } from '../../redux/interactions'
import { contractDetails } from '../sdk/ContractDetails'
import Countdown from 'react-countdown'
import moment from 'moment'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from  'react-loader-spinner'

const { TabPane } = Tabs

const loadetherBalance = async (
	setEtherBalance,
	setAccount,
	setNetworkName
) => {
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			//console.log(err);
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}

			let networkType = await myWeb3.eth.net.getNetworkType()
			setNetworkName(networkType)
			setAccount(accounts[0])
			const balance = await myWeb3.eth.getBalance(accounts[0]),
				currentETHBalance = ethers.utils.formatUnits(balance, 18)
			setEtherBalance(currentETHBalance)
		}
	})
}

const SellToken = () => {
	let [etherBalance, setEtherBalance] = useState(''),
		[account, setAccount] = useState(''),
		[networkName, setNetworkName] = useState(''),
		[ethInput, setEthInput] = useState(''),
		[daoGovInput, setDaoGovInput] = useState(''),
		[assetethInput, setassetEthInput] = useState(''),
		[assetInput, setAssetInput] = useState(''),
		[usdaoEthInput, setusdaoEthInput] = useState(''),
		[ethPrice, setEthPrice] = useState(''),
		[assetDollarvalue, setAssetDollarValue] = useState('')
	const [price, setPrice] = useState('')

	const [endDate, setEndDate] = useState(null)

	const [daoBalance, setDaoBalance] = useState('...')
	const [bal, setBal] = useState(''),
	[loader, setLoader] = useState(false);
console.log("bal", bal)
	useEffect(() => {
		(async () => {
			const CompContract = await writeContractFunction('tokenSale')
			setEthPrice(Number(await CompContract.EthPrice()))

			setEndDate(Number(await CompContract.ico_enddate()) * 1000)

			const value = await CompContract._price_tokn()
			const govBal = await CompContract.termSaleBal()
			setBal(Number(govBal))
			setDaoBalance(Number(value))
			const usmContract = await readContractFunction('usm')
			setPrice(await usmContract.latestPrice())
		})()
	}, [])


	const verifyTransaction = (hash) => {
		Swal.fire({
			title: 'Sent to Blockchain',
			html: `<p>Waiting for Blockchain Confirmation...</p>
              <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
		})
		// check transaction
		const mProviderInner = getMetaMask()
		mProviderInner.waitForTransaction(hash).then(async (result) => {
			if (result.status) {
				setLoader(false);
				Swal.fire({
					icon: 'success',
					html: `<p>Transaction Successful</p>
              <p><a target='_blank' href='https://rinkeby.etherscan.io/tx/${hash}'>View On Ether Scan</a> </p>`
				})
			} else {
				setLoader(false);
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

	const sendEther = async (token) => {
		let to = ''
		let weiAmount = 0
setLoader(true);
		if (token === 'gov') {
			weiAmount = web3.utils.toWei(ethInput.toString() || '0', 'ether')
			to = contractDetails['tokenSale'].address[4]
			if (ethInput < 0.001) {
				swal('Minimum ETH should be  0.001 ')
				setLoader(false);
				return
			}
			await window.ethereum.enable()
			web3 = new web3(window.ethereum)

			const params = {
				from: account,
				to: to,
				value: weiAmount
			}
			web3.eth.sendTransaction(params, (err, data) => {
				if (err) {
					console.log('error---', err)
					setLoader(false);
				} else {
					verifyTransaction(data)
				}
			})
		} else if (token === 'usdao') {
			weiAmount = web3.utils.toWei(usdaoEthInput || '0', 'ether')
			if (usdaoEthInput <= 0) {
				swal('Invalid ETH Input ')
				return
			}
			const usmWriteContract = await writeContractFunction('usm')
			usmWriteContract
				.mint(account, 0, { value: weiAmount })
				.then((data) => {
					data && data.hash && verifyTransaction(data.hash)
				})
				.catch((error) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!'
					})
				})
		} else {
			weiAmount = web3.utils.toWei(assetethInput || '0', 'ether')
			if (assetethInput <= 0) {
				swal('Invalid ETH Input ')
				return
			}
			const usmWriteContract = await writeContractFunction('usm')
			usmWriteContract
				.fund(account, 0, { value: weiAmount })
				.then((data) => {
					data && data.hash && verifyTransaction(data.hash)
				})
				.catch((error) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!'
					})
				})
		}
	}
	const assetOnchange = async (e) => {
		const eth_value = e.target.value
		setassetEthInput(eth_value)
		const usmContract = await readContractFunction('usmView')
		const usmContractt = await readContractFunction('usm')
		const price = await usmContractt.latestPrice()
		const formattedPrice = ethers.utils.formatEther(price['price'])
		setAssetDollarValue(formattedPrice * eth_value)
		console.log('price', formattedPrice)
		const weiAmount = web3.utils.toWei(eth_value || '0', 'ether')
		const data1 = await usmContract.usmMint(weiAmount)
		const usmBalance1 = ethers.utils.formatEther(data1['usmOut'], 18)
		const usmViewBalance = usmBalance1 == 0.0 ? 0 : usmBalance1
		setAssetInput(usmViewBalance)
	}

	const usdaoOnchange = async (e) => {
		const eth_value = e.target.value
		setusdaoEthInput(eth_value)
		const usmContract = await readContractFunction('usm')
		const weiAmount = web3.utils.toWei(eth_value || '0', 'ether')
		const data1 = await usmContract.fumFund(weiAmount)
		const usmBalance1 = ethers.utils.formatUnits(data1['fumOut'], 18)
		const usmViewBalance = usmBalance1 == 0.0 ? 0 : usmBalance1
	}

	const Vv = () => {
		return (
			<div className='d-flex justify-content-center align-items-center daogov-icon'>
				
				<img
					src={require('../../assets/images/daogov-icon.png')}
					alt=''
					className='mx-2'
					style={{ height: '25px' }}
				/>
				1
				= ${daoBalance}
			</div>
		)
	}

	useEffect(() => {
		loadetherBalance(setEtherBalance, setAccount, setNetworkName)
	})

	const [calculatedDollarValue, setCalculatedDollarValue] = useState('')

	const calcValue = (value) =>
		setCalculatedDollarValue(Number(daoBalance) * Number(value))

    const calculateDollerToEth = (doller) =>{
		setCalculatedDollarValue(doller);
		setDaoGovInput(doller/daoBalance);
		setEthInput(doller/(ethPrice / 10e17))
		}		

	return (
		<div className='sell-token-wrap'>
			<header className='converter-head-wrapp w-100'>
				<div className='converter-head d-flex align-items-center justify-content-between'>
					<div
						className='d-flex mt-auto mb-auto home__navbar_logo1'
						onClick={() => (window.location = '/')}
					>
						<img
							alt='#'
							className='pr-2 pl-4'
							style={{ height: '40px' }}
							src={require('../../assets/images/logo.png')}
						/>
						<p className='mt-auto mb-auto pl-1 font-weight-dark home__navbar_logo main-color'>
							USDAO
						</p>
					</div>

					{/* <div className="converter-tabs"></div> */}

					<div className='converter-info'>
						<div className='d-flex'>
							<a href='' className='converter-top-btn'>
								<img src='../../assets/ethereum.png' alt='' />{' '}
								<span>
									{networkName.charAt(0).toUpperCase() + networkName.slice(1)}
								</span>
							</a>

							<a href='' className='converter-top-value'>
								{decimalPlaces(etherBalance)} ETH{' '}
								<p>
									{account.substring(0, 5)}...
									{account.substring(account.length - 5)}
								</p>
							</a>

							{/* <button className="converter-btn"><i className="fas fa-ellipsis-h"></i></button> */}
						</div>
					</div>
				</div>
			</header>
			<section className='converter d-flex justify-content-center'>
				<div className='converter-box'>
					{/* <p className="converter-text">Swap</p> */}
					<Tabs defaultActiveKey='1'>
						<TabPane tab='Governance' key='1' style={{ color: 'white' }}>
							<div className='converter-form-wrapp'>
								<form
									action=''
									className='converter-form'
									onSubmit={(e) => {
										e.preventDefault()
									}}
								>
									<div className='converter-fields'>
										<div className='converter-currency d-flex'>
											<div className='converter-input-wrapp d-flex align-items-center justify-content-between'>
											<input
													type='number'
													className='converter-input'
													placeholder='0.0'
													value={ethInput ? ethInput : ''}
													onChange={(e) => {
														e.preventDefault()
														setEthInput(e.target.value)
														const value =
															Number(e.target.value) *
															(ethPrice / 10e17 / daoBalance)
														calcValue(value)
														setDaoGovInput(value)
														// (EthPrice()/10e17)/(_price_tokn))
													}}
												/>
												<div className='ethIcon'>
													<img
														src='../../assets/ethereum.png'
														alt=''
														className='mr-2'
													/>
													ETH
													{/* <i className="fas fa-chevron-down"></i> */}
												</div>

												
											</div>
											<div className='blank-space'>

												<p
													className='converter-content text-left'
													style={{ cursor: 'pointer' }}
													
												>
													
														<input value={isNaN(calculatedDollarValue)
														? '0'
														: calculatedDollarValue}
														className='converter-input'
														onChange={(e)=>calculateDollerToEth(e.target.value)}
														placeholder='$'
														title="$"/>
													
												    <span className='pull-right'>
													Balance: {decimalPlaces(etherBalance)} ETH{' '}
													<span
													onClick={() => {
														setEthInput(decimalPlaces(etherBalance))
														const value =
															Number(decimalPlaces(etherBalance)) *
															(ethPrice / 10e17 / daoBalance)
														calcValue(value)
														setDaoGovInput(value)
													}}>(Max)</span>
													</span>

												</p>
											</div>
										</div>

										{/* <div className='converter-arrow '>
											<i className='fas fa-arrow-down'></i>
										</div> */}

										<div className='converter-currency d-flex secondBox'>
											<div className='converter-input-wrapp d-flex align-items-center justify-content-between'>
											<input
													type='number'
													className='converter-input input-small'
													placeholder='0.0'
													value={daoGovInput ? daoGovInput : ''}
													onChange={(e) => {
														e.preventDefault()
														setDaoGovInput(e.target.value)
														calcValue(e.target.value)
														setEthInput(
															Number(e.target.value) /
																(ethPrice / 10e17 / daoBalance)
														)
														// (EthPrice()/10e17)/(_price_tokn))
													}}
												/>
												<img
													src={require('../../assets/images/DAOGOV.png')}
													alt=''
													className='mx-2'
													style={{ height: '40px', margin: '15px 0px' }}
												/>
												

												
											</div>
											
										</div>
									</div>

									<button
										className='buy-button'
										onClick={() => {
											sendEther('gov')
										}}
										disabled = {loader}
									>
										{
											loader ? <ThreeDots color="#F85E11" height={60} width={60} /> : 'BUY'

										}
										
									</button>
								</form>
							</div>
						</TabPane>
						<TabPane
							disabled={true}
							tab={<Vv />}
							key='2'
							style={{ color: 'white' }}
							className='secondTab'
							style={{ 'justify-content': 'right !important' }}
						>
							<div className='converter-form-wrapp'>
								<form
									action=''
									className='converter-form'
									onSubmit={(e) => {
										e.preventDefault()
									}}
								>
									<div className='converter-fields'>
										<div className='converter-currency d-flex'>
											<div className='converter-input-wrapp d-flex align-items-center justify-content-between'>
											<input
													type='number'
													className='converter-input'
													placeholder='0.0'
													onChange={(e) => {
														// assetOnchange(e)
														setassetEthInput(e.target.value)
														e.preventDefault()
														var value = e.target.value

														if (value == '' || value == 0) {
															value = '0'
														}

														const marketPrice = ethers.utils.formatEther(price)
														let usdaoVal = value * marketPrice
														setAssetInput(usdaoVal)
														// val = value * marketprice
													}}
													value={assetethInput ? assetethInput : ''}
												/>
												<button className='converter-dropdown justify-content-between align-items-center'>
													<img
														src='../../assets/ethereum.png'
														alt=''
														className='mr-2'
													/>
													ETH
													{/* <i className="fas fa-chevron-down"></i> */}
												</button>

												
											</div>
											<div className='blank-space'>
												<p
													className='converter-content'
													style={{ cursor: 'pointer' }}
													onClick={() => {
														setassetEthInput(decimalPlaces(etherBalance))
														var value = decimalPlaces(etherBalance)

														if (value == '' || value == 0) {
															value = '0'
														}

														const marketPrice = ethers.utils.formatEther(price)
														let usdaoVal = value * marketPrice
														setAssetInput(usdaoVal)
													}}
												>
													Balance: {decimalPlaces(etherBalance)} ETH{' '}
													<span>(Max)</span>
												</p>
											</div>
										</div>

										{/* <div className='converter-arrow'>
											<i className='fas fa-arrow-down'></i>
										</div> */}

										<div className='converter-currency d-flex'>
											<div className='converter-input-wrapp d-flex align-items-center justify-content-between'>
												<button className='converter-primary  justify-content-between align-items-center'>
													ASSET
													{/* <i className="fas fa-chevron-down"></i> */}
												</button>

												<input
													type='number'
													className='converter-input input-small'
													placeholder='0.0'
													value={assetInput ? assetInput : ''}
													onChange={(e) => {
														setAssetInput(e.target.value)
														const marketPrice = ethers.utils.formatEther(price)
														setassetEthInput(
															Number(e.target.value) / marketPrice
														)
													}}
												/>
											</div>
											<div className='blank-space'>
												<p className='dollar'>${assetDollarvalue}</p>
											</div>
										</div>
									</div>

									<button
										className='converter-submit w-100 custom__button'
										onClick={() => {
											sendEther('asset')
										}}
									>
										BUY
									</button>
								</form>
							</div>
						</TabPane>
					</Tabs>
				</div>
			</section>
			<div
				className='d-flex justify-content-between align-items-center bottom-section'
				style={{ position: 'absolute', bottom: 0, width: '100%' }}
			>
				<div className='col-md-6 px-5 pb-5'>
					<h4 className='mx-3'>
						DAOGov Balance: {bal ? bal / 1e18 : bal}
					</h4>
				</div>

				<div
					className='col-md-6 px-5 pb-5 text-right'
				>
					<h4>
						{' '}
						{moment(endDate).isBefore()}
						
						Sale Ends in:{' '}
						{moment(endDate).isBefore() ? (
							'Yet to start'
						) : (
							<Countdown date={new Date(endDate)} />
						)}
					</h4>
				</div>
			</div>
		</div>
	)
}

export default SellToken
