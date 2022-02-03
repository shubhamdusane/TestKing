import React, { useState, useEffect } from 'react'
import web3 from 'web3'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import { readContractFunction } from '../sdk/tradingSdk'
import { ethers } from 'ethers'
const { TabPane } = Tabs

const TodoListComponentOne = ({
	submitBuy,
	submitSell,
	inputChangeHandler,
	inputChangeHandler3,
	inputChangeHandler1,
	inputChangeHandler2,
	inputChangeHandler4,
	assetRef,
	maxHandler,
	eth_asset_value,
	asset_value,
	mode
}) => {
	React.useEffect(() => {
		calculatePrice()
	}, [])

	const [assetValue, setAssetValue] = useState('')

	useEffect(() => {
		setAssetValue(asset_value)
	}, [asset_value])

	const [latestPrice, setLatestPrice] = React.useState(0)
	const calculatePrice = async () => {
		const usmContract = await readContractFunction('usm')
		setLatestPrice(Number(await usmContract.latestPrice()))
	}

	const truncateToDecimals = (num, dec = 2) => {
		const calcDec = Math.pow(10, dec)
		return Math.trunc(num * calcDec) / calcDec
	}

	const loadMaxAsset = async () => {
		const fumContract = await readContractFunction('fum')
		const myWeb3 = new web3(window.web3.currentProvider)
		myWeb3.eth.getAccounts(async (err, accounts) => {
			if (err) {
				//console.log(err);
			} else {
				const balance = await fumContract.balanceOf(accounts[0])
				const fumBalance = ethers.utils.formatUnits(balance, 18)
				console.log(fumBalance, 'this is the balance')
				setAssetValue(
					truncateToDecimals(fumBalance > 0.3 ? fumBalance - 0.3 : 0, 4)
				)
			}
		})
	}

	return (
		<>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='BUY' key='1' style={{ color: 'white' }}>
					<form
						className='add-items d-flex pt-4 flex-column  assetWrap usDaoWrapperNew'
						onSubmit={submitBuy}
					>
						<div className='mb-3'>
							{/* <label style={{color: 'white'}}>Buy</label> */}
							<div className='col-md-12'>
								<a
									href='javascript:void(0)'
									className='max-btn'
									onClick={() => {
										maxHandler('asset_eth')
									}}
								>
									Max
								</a>

								<input
									ref={assetRef}
									type='number'
									className='form-control h-auto custom__input'
									placeholder='0.000000 ETH'
									onChange={inputChangeHandler}
									value={eth_asset_value}
									required
								/>
								<button disabled>ETH</button>
							</div>
							{/* <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px'}}>Wallet Balance: 0.0000 ETH</p>       */}
						</div>
						<div>
							{/* <label>Receive</label> */}
							<input
								type='number'
								className='form-control h-auto custom__input showAsset'
								placeholder={'0.000000 ASSET'}
								value={inputChangeHandler1}
								disabled
								style={{ marginBottom: '10px' }}
							/>
							<button style={{ marginBottom: '15px' }} disabled>
								ASSET
							</button>
							<p className={mode ? 'showUsdao text-white' : 'showUsdao'}>
								${inputChangeHandler4 || 0.0}
							</p>
							<div className='custom__button' onClick={submitBuy}>
								<a>BUY</a>
							</div>
							{/* <button className="custom__button" onClick={submitBuy}>
                    BUY
                </button> */}
							{/* <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px'}}>Wallet Balance: 0.0000 USDAO</p> */}
						</div>
					</form>
				</TabPane>
				<TabPane tab='SELL' key='2' style={{ color: 'white' }}>
					<form
						className='add-items d-flex pt-4 flex-column usDaoWrapperNew'
						onSubmit={submitSell}
					>
						<div className='mb-3'>
							{/* <label style={{color: 'white'}}>Sell</label> */}
							<div className='col-md-12'>
								<a
									href='javascript:void(0)'
									className='max-btn'
									onClick={loadMaxAsset}
								>
									Max
								</a>

								<input
									type='number'
									className='form-control h-auto custom__input'
									placeholder={'0.000000 ASSET'}
									onChange={inputChangeHandler3}
									value={assetValue}
									required
								/>
								<button disabled>ASSET</button>
							</div>
							{/* <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px'}}>Wallet Balance: 0.0000 ETH</p>       */}
						</div>
						<div>
							{/* <label>Receive</label> */}
							<div className='col-md-12'>
								<input
									type='number'
									className='form-control h-auto custom__input'
									value={inputChangeHandler2}
									placeholder={'0.000000 ETH'}
									disabled
									style={{ marginBottom: '10px' }}
								/>

								{/* In the Sell section of Asset, value of 1 ASSETin $ should be displayed
formula:  ((medianOracle.latestPrice)*sellPrice) */}
								<button disabled>ETH</button>
								<p
									className={
										mode ? 'showUsdao text-white pt-3' : 'showUsdao pt-3'
									}
								>
									$
									{truncateToDecimals(
										(Number(inputChangeHandler2) / 10e18) * latestPrice
									) || 0.0}
								</p>
								<div className='custom__button' onClick={submitSell}>
									<a>SELL</a>
								</div>
								{/* <button className="custom__button" onClick={submitSell}>
                    SELL
                </button> */}
							</div>{' '}
						</div>
					</form>
				</TabPane>
			</Tabs>
		</>
	)
}

export default TodoListComponentOne
