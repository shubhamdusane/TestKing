import React, { useState, useEffect, useMemo } from 'react'
import { writeContractFunction, getContractAddress } from '../../sdk/tradingSdk'
import { Button } from 'antd'
import axios from 'axios'
import publicIp from 'public-ip'
import moment from 'moment'
import {StakingAdmin} from '../../Staking/StakingAdminDashboard/StakingAdminComp';
import Pool from '../../Pool/Pool'

const GovernanceAdminDashboard = ({ history }) => {
	const buttons = {
		dao_gov_address: 'DAOGov Address',
		dao_gav_balance: 'DAOGov Balance',
		token_term_sale: 'Token Term Sale',
		term_sale_balance: 'Term Sale Balance',
		unlocked: 'Unlocked',
		foundation_balance: 'Foundation Balance',
		start_ico: 'Start ICO',
		stop_ico: 'Stop ICO',
		fund_usdao_pool: 'Fund Usdao Pool',
		transfer_asset: 'Transfer Asset',
		eth_balance: 'ETH Balance',
		asset_balance: 'Asset Balance',
		token_price_token: 'Price of DAOGov',
		ico_stage: 'ICO Stage'
	}

	React.useEffect(() => {
		const clickableElements = document.querySelectorAll('.initial-click')
		clickableElements.forEach((element, i) => element.click())
	}, [])

	React.useEffect(() => {
		;(async () => {
			const response = await axios.get(
				'https://api.usdao.io/api/governance/view-admin-log'
			)
			console.log(response, 'response')
			setLogs(response?.data.message.reverse())
		})()
	}, [])

	const govContractFunction = useMemo(async () => {
		const contract = await writeContractFunction('tokenSale')
		console.log(contract, 'this is the contract', await contract.ico_enddate())
		return contract
	}, [])

	const userIp = useMemo(async () => {
		return publicIp.v4({
			fallbackUrls: ['https://ifconfig.co/ip']
		})
	}, [])

	const storeLog = async (identifier, txn = '', user_address = '') => {
		const payload = {
			address: user_address,
			event_name: getIdentifier(identifier),
			ip_address: await userIp,
			tr_hash: txn
		}
		const response = await axios.post(
			'https://api.usdao.io/api/governance/create-admin-log',
			payload
		)
		console.log(response, 'store log response')
	}

	const getIdentifier = (identifier) => {
		switch (identifier) {
			case 'dao_gov_address':
				return buttons['dao_gov_address']

			case 'dao_gav_balance':
				return buttons['dao_gav_balance']

			case 'token_term_sale':
				return buttons['token_term_sale']
			case 'token_price_token':
				return buttons['token_price_token']
			case 'term_sale_balance':
				return buttons['term_sale_balance']

			case 'unlocked':
				return buttons['unlocked']

			case 'foundation_balance':
				return buttons['foundation_balance']

			case 'start_ico':
				return buttons['start_ico']

			case 'stop_ico':
				return buttons['stop_ico']

			case 'fund_usdao_pool':
				return buttons['fund_usdao_pool']

			case 'transfer_asset':
				return buttons['transfer_asset']

			case 'eth_balance':
				return buttons['eth_balance']

			case 'asset_balance':
				return buttons['asset_balance']

			case 'ico_stage':
				return buttons['ico_stage']

			default:
				return ''
		}
	}

	const [state, setState] = useState({})
	const [value, setValue] = useState({
		asset: '',
		ico: '',
		ico_token: '',
		asset2: ''
	})

	const getAllAssetBalance = async () => {
		const contractFunc = await govContractFunction
		const value1 = await contractFunc.getASSETBalance()
		console.log(value1, 'asset balance max')
		setValue({ ...value, asset2: value1 })
		return value
	}

	const updateStateWithValue = async (
		fn,
		standAloneFN,
		identifier,
		param = ''
	) => {
		try {
			const contractFunc = await govContractFunction
			const response = standAloneFN
				? param
					? await fn(param)
					: await fn()
				: param
				? await contractFunc[fn](param)
				: await contractFunc[fn]()

			if (identifier === 'fund_usdao_pool' || identifier === 'stop_ico') {
				storeLog(identifier, response?.hash, response?.from)
			}
			// setState({ ...state, [identifier]: response })
			if (identifier === 'unlocked') {
				setState((state) => ({
					...state,
					[identifier]: moment(Number(response) * 1000).format('lll')
				}))
			} else {
				setState((state) => ({ ...state, [identifier]: response }))
			}
			return ''
		} catch (error) {
			if (identifier === 'fund_usdao_pool') {
				alert('There is no Ether in the contract or the ICO is still going on!')
			}
			console.log(error, 'this is the error !')
		}
	}

	const updateStateWithValueIco = async (
		fn,
		standAloneFN,
		identifier,
		param = '',
		secondParam = ''
	) => {
		try {
			console.log(param, secondParam, 'what are the params ??')
			const contractFunc = await govContractFunction
			const response = standAloneFN
				? param
					? await fn(param, secondParam)
					: await fn()
				: param
				? await contractFunc[fn](param, secondParam)
				: await contractFunc[fn]()

			storeLog(identifier, response?.hash, response?.from)
			console.log(response, 'logging response......')
			setState({ ...state, [identifier]: response })
			return
		} catch (error) {
			if (identifier === 'fund_usdao_pool') {
				alert('There is no Ether in the contract or the ICO is still going on!')
			}
			console.log(error, 'this is the error !')
		}
	}

	// setting the empty state on first load.
	useEffect(() => {
		let stateObject = {}
		for (const key in buttons) {
			stateObject[key] = ''
		}
		setState(stateObject)
	}, [])

	const [logView, setLogView] = useState(false)
	const [currentDash, setCurrentdash] = useState('governance');
	const [logs, setLogs] = useState([])

	const getIcoStageValue = (value) => {
		let retValue = ''
		if (value == 0) {
			retValue = 'ICO yet to start'
		} else if (value == 1) {
			retValue = 'ICO is running'
		} else if (value == 2) {
			retValue = 'ICO ended'
		}
		return retValue
	}
console.log("current dash", currentDash)
	return (
		<div className='row'>
			<div
				className='col-md-2'
				style={{ height: '100vh', backgroundColor: '#f5f6fb' }}
			>
				<div
					className='d-flex mt-auto mb-auto home__navbar_logo1'
					onClick={() => (window.location = '/')}
					style={{paddingTop:'20px'}}
				>
					<img
						alt='#'
						className='pr-2 pl-4'
						style={{ height: '40px' }}
						src={require('../../../assets/images/logo.png')}
					/>
					<p
						className='mt-auto mb-auto pl-1 font-weight-light home__navbar_logo'
						style={{ color: 'black' }}
					>
						USDAO
					</p>
				</div>
				<div
					style={{
						backgroundColor: currentDash === "governance" ? 'silver' : 'transparent',
						cursor: 'pointer'
					}}
					className='px-5 py-2 d-flex align-items-center justify-content-center my-3 mt-5'
					onClick={() => {setLogView(false); setCurrentdash('governance')}}
				>
					<p
						className='text-dark m-0'
						style={{
							fontSize: '18px'
						}}
					>
						Governance
					</p>
				</div>
				
				<div
					style={{
						backgroundColor: currentDash === "staking" ? 'silver' : 'transparent',
						cursor: 'pointer'
					}}
					className='px-5 py-2 d-flex align-items-center justify-content-center my-2'
					onClick={() => {setLogView(true); setCurrentdash('staking') }}
				>
					<p
						className='text-dark m-0'
						style={{
							fontSize: '18px'
						}}
					>
						Staking
					</p>
				</div>
				<div
					style={{
						backgroundColor: currentDash === "revenue" ? 'silver' : 'transparent',
						cursor: 'pointer'
					}}
					className='px-5 py-2 d-flex align-items-center justify-content-center my-2'
					onClick={() => {setLogView(true); setCurrentdash('revenue') }}
				>
					<p
						className='text-dark m-0'
						style={{
							fontSize: '18px'
						}}
					>
						Revenue
					</p>
				</div>
				<div
					style={{
						backgroundColor: currentDash === "logs" ? 'silver' : 'transparent',
						cursor: 'pointer'
					}}
					className='px-5 py-2 d-flex align-items-center justify-content-center my-2'
					onClick={() => {setLogView(true); setCurrentdash('logs')}}
				>
					<p
						className='text-dark m-0'
						style={{
							fontSize: '18px'
						}}
					>
						Logs
					</p>
				</div>/
			</div>
			<div className='col-md-10'>
				
				 {currentDash === "governance" && !!logs?.length && (
						<div className='admin-dash'>
						<div className='card '>
							<div className='card-body'>
								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='This is the address of the DAOGov token'
											onClick={() =>
												updateStateWithValue(
													getContractAddress,
													true,
													'dao_gov_address',
													'comp'
												)
											}
										>
											DAOGov Address
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											value={state.dao_gov_address}
											className='disabled'
										/>
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='Address of the USDAO Foundation'
											onClick={() =>
												updateStateWithValue(
													'foundationAddress',
													false,
													'foundation_balance'
												)
											}
										>
											Foundation Address
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={state.foundation_balance}
										/>
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='This is the no. of tokens that are available for sale'
											onClick={async () =>
												updateStateWithValue(
													'getDAOGOVBalance',
													false,
													'dao_gov_balance',
													await getContractAddress('tokenSale')
												)
											}
										>
											DAOGov Balance
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={
												state.dao_gov_balance
													? state.dao_gov_balance / 10e17
													: '0'
											}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											title='This is the no. of tokens to be sold in this ICO term'
											htmlType='submit'
											onClick={() =>
												updateStateWithValue(
													'termSale',
													false,
													'token_term_sale'
												)
											}
										>
											Tokens Term Sale
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={
												state.token_term_sale
													? state.token_term_sale / 10e17
													: '0'
											}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='This is the no. of tokens that are available to be sold in this ICO'
											onClick={() =>
												updateStateWithValue(
													'termSaleBal',
													false,
													'term_sale_balance'
												)
											}
										>
											Term Sale Balance
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={
												state.term_sale_balance
													? state.term_sale_balance / 10e17
													: '0'
											}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='Stage of the ICO'
											onClick={() =>
												updateStateWithValue('stage', false, 'ico_stage')
											}
										>
											ICO Stage
										</Button>
									</div>

									<div className='col'>
										{console.log(state.ico_stage, 'ico')}
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={getIcoStageValue(state.ico_stage)}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<Button
											type='primary'
											htmlType='submit'
											title='Start the ICO by providing DAOGov price & tokens to be sold'
											onClick={() =>
												updateStateWithValueIco(
													'start_ICO',
													false,
													'start_ico',
													Number(value.ico),
													Number(value.ico_token)
												)
											}
										>
											Start ICO
										</Button>
									</div>
									<div className='col d-flex'>
										<input
											style={{ maxWidth: '11rem' }}
											type='text'
											placeholder='1DAOGov Price in $'
											value={value.ico}
											onChange={(e) =>
												setValue({ ...value, ico: e.target.value })
											}
										/>
										<input
											style={{ maxWidth: '11rem' }}
											type='text'
											placeholder='Sell ___ tokens'
											value={value.ico_token}
											onChange={(e) =>
												setValue({ ...value, ico_token: e.target.value })
											}
										/>
										{/* <input
style={{ minWidth: '22rem' }} className='disabled' value={state.start_ico} /> */}
									</div>
								</div>
								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='Price of DAOGov token in $'
											onClick={() =>
												updateStateWithValue(
													'_price_tokn',
													false,
													'token_price_token'
												)
											}
										>
											Price Of DAOGov
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											type='text'
											placeholder='Price Of DAOGov'
											value={state.token_price_token}
											className='disabled'
											disabled
										/>
										{/* <input
style={{ minWidth: '22rem' }} className='disabled' value={state.start_ico} /> */}
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											type='primary'
											title='This will fund the USDAO pool with the Ethers present in the contract and get ASSET in return to the same contract'
											htmlType='submit'
											onClick={() =>
												updateStateWithValue(
													'fundUSDAOPool',
													false,
													'fund_usdao_pool'
												)
											}
										>
											Fund USDAO Pool
										</Button>
									</div>
									<div className='col'>
										<Button
											type='primary'
											title='can stop the ongoing ICO before the term sale ends'
											htmlType='submit'
											onClick={() =>
												updateStateWithValue('Stop_ICO', false, 'stop_ico')
											}
											style={{ minWidth: '22rem' }}
										>
											STOP ICO
										</Button>
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											title='Can transfer the ASSET from the contract to specific address by providing in the input box after the “Unlock Time” reached'
											htmlType='submit'
											onClick={() =>
												updateStateWithValue(
													'getEthBalance',
													false,
													'eth_balance'
												)
											}
										>
											Get ETH Balance
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={state.eth_balance / 10e17}
										/>
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											title='This is the time stamp, when ASSET tokens can be moved from contract'
											htmlType='submit'
											onClick={() =>
												updateStateWithValue('unlocked', false, 'unlocked')
											}
										>
											Asset Unlock Time
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={state.unlocked}
										/>
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											className='initial-click'
											type='primary'
											htmlType='submit'
											title='This will give the ASSET balance present in the Token Sale Contract'
											onClick={async () =>
												updateStateWithValue(
													'getASSETBalance',
													false,
													'asset_balance'
												)
											}
										>
											Get Asset Balance
											{console.log(
												state.asset_balance,
												'check the asset balance'
											)}
										</Button>
									</div>
									<div className='col'>
										<input
											style={{ minWidth: '22rem' }}
											className='disabled'
											value={
												state.asset_balance ? state.asset_balance / 10e17 : '0'
											}
										/>
									</div>
								</div>

								<div className='row'>
									<div className='col'>
										<Button
											type='primary'
											title='Can transfer the ASSET from the contract to specific address by providing in the input box after the “Unlock Time” reached'
											htmlType='submit'
											onClick={() =>
												updateStateWithValueIco(
													'transferAsset',
													false,
													'transfer_asset',
													value.asset,
													value.asset2
												)
											}
										>
											Transfer Asset
										</Button>
									</div>
									<div className='col d-flex align-items-center'>
										<input
											style={{ maxWidth: '11rem' }}
											type='text'
											placeholder='To Address'
											value={value.asset}
											onChange={(e) =>
												setValue({ ...value, asset: e.target.value })
											}
										/>
										<input
											style={{ maxWidth: '11rem' }}
											type='text'
											placeholder='No. of tokens'
											value={value.asset2}
											onChange={(e) =>
												setValue({ ...value, asset2: e.target.value })
											}
										/>
										<div className='text-right'>
											<p
												className='text-danger m-0 pl-2'
												style={{ cursor: 'pointer' }}
												onClick={getAllAssetBalance}
											>
												Max
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					)}
				 {currentDash === "logs" && 
				 
					<table className='table table-bordered table-dark'>
					<thead>
						<tr>
							<td className='text-white'>IP</td>
							<td className='text-white'>TimeStamp</td>
							<td className='text-white'>Function</td>
							<td className='text-white'>Address Used</td>
							<td className='text-white'>TXN Hash</td>
						</tr>
					</thead>
					<tbody>
						{logs.map((log) => (
							<tr key={log._id}>
								<td className='text-white'>{log.ip_address}</td>
								<td className='text-white'>
									{moment(log.createdAt).format('LLL')}
								</td>
								<td className='text-white'>{log.event_name}</td>
								<td className='text-white'>{log.address}</td>
								<td className='text-white'>
									<a target='_blank' href={`https://rinkeby.etherscan.io/tx/${log.tr_hash}`} style={{color:'#fff'}}>
										<u>
									{log.tr_hash?.length > 25
										? log.tr_hash.substring(0, 25) + '...'
										: log.tr_hash}
										</u>
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>}
				 {currentDash === "staking" && <StakingAdmin />}
				 {currentDash === "revenue" && <Pool />}
			</div>
		</div>
	)
}

export default GovernanceAdminDashboard
