import React from 'react'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import { readContractFunction } from '../sdk/tradingSdk'
const { TabPane } = Tabs

const TodoListComponent = ({
	submitBuy,
	submitSell,
	inputChangeHandler,
	inputChangeHandler3,
	inputChangeHandler1,
	inputChangeHandler2,
	usdaoBuyRef,
	maxHandler,
	usdao_eth_value,
	usdao_value,
	inputChangeHandler4,
	mode
}) => {
	React.useEffect(() => {
		calculatePrice()
	}, [])
	const [latestPrice, setLatestPrice] = React.useState(0)
	const calculatePrice = async () => {
		const usmContract = await readContractFunction('usm')
		console.log(await usmContract.latestPrice(), 'usm latest pricce')
		setLatestPrice(Number(await usmContract.latestPrice()) / 10e17)
	}

	const truncateToDecimals = (num, dec = 2) => {
		const calcDec = Math.pow(10, dec)
		return Math.trunc(num * calcDec) / calcDec
	}

	return (
		<>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='BUY' key='1' style={{ color: 'white' }}>
					<form
						className='add-items d-flex pt-4 flex-column usDaoWrapperNew'
						onSubmit={submitBuy}
					>
						<div className='mb-3'>
							{/* <label>Buy</label> */}
							<div className='col-md-12'>
								<a
									href='javascript:void(0)'
									className='max-btn'
									onClick={() => {
										maxHandler('eth')
									}}
								>
									Max
								</a>

								<input
									ref={usdaoBuyRef}
									type='number'
									className='form-control h-auto custom__input'
									placeholder='0.000000 ETH'
									onChange={inputChangeHandler}
									value={usdao_eth_value}
									required
								/>
								<button disabled>ETH</button>
							</div>
							{/* <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px'}}>Wallet Balance: 0.0000 ETH</p>       */}
						</div>
						<div className='col-md-12'>
							{/* <label>Receive</label> */}
							<input
								type='number'
								className='form-control h-auto custom__input'
								placeholder={'0.000000 USDAO'}
								value={inputChangeHandler1}
								disabled
								style={{ marginBottom: '10px' }}
							/>
							<button style={{ marginBottom: '15px' }} disabled>
								USDAO
							</button>
							<p className={mode ? 'showUsdao text-white' : 'showUsdao'}>
								${inputChangeHandler4 || 0.0}
							</p>
							{/* <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px'}}>Wallet Balance: 0.0000 USDAO</p> */}
							<div className='custom__button' onClick={submitBuy}>
								<a>BUY</a>
							</div>
						</div>
					</form>
				</TabPane>
				<TabPane tab='SELL' key='2' style={{ color: 'white' }}>
					<form
						className='add-items d-flex pt-4 flex-column usDaoWrapperNew'
						onSubmit={submitSell}
					>
						<div className='mb-3'>
							{/* <label>Sell</label> */}
							<div className='col-md-12'>
								<a
									href='javascript:void(0)'
									className='max-btn'
									onClick={() => {
										maxHandler('usdao')
									}}
								>
									Max
								</a>

								<input
									type='number'
									className='form-control h-auto custom__input'
									placeholder='0000000 USDAO'
									onChange={inputChangeHandler3}
									value={usdao_value}
									required
								/>
								<button disabled>USDAO</button>
							</div>
							{/* In the Sell section of USDAO, value of the 1 USDAO in $ should be displayed 
formula: ((medianOracle.latestPrice)*sellPrice) */}
						</div>
						<div>
							{/* <label>Receive</label> */}
							<div className='col-md-12'>
								<input
									type='number'
									className='form-control h-auto custom__input'
									value={inputChangeHandler2}
									placeholder='0000000 ETH'
									disabled
									style={{ marginBottom: '10px' }}
								/>
								<div className=''>
									<button disabled>ETH</button>
									<p
										className={
											mode ? 'showUsdao text-white pt-3' : 'showUsdao pt-3'
										}
									>
										$
										{truncateToDecimals(
											Number(inputChangeHandler2) * latestPrice
										) || 0.0}
									</p>
									<div className='custom__button' onClick={submitSell}>
										<a>SELL</a>
									</div>
								</div>
								{/* <button className="custom__button" onClick={submitSell}>
                    SELL
                </button> */}
							</div>
							{/* <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px'}}>Wallet Balance: 0.0000 USDAO</p> */}
						</div>
					</form>
				</TabPane>
			</Tabs>
		</>
	)
}

export default TodoListComponent
