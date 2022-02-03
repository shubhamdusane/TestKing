import React, { useState, useEffect } from 'react'
import WorkingArea from '../apps/WorkingArea'
import { decimalPlaces, toPercentage } from '../../utils'
import { connect } from 'react-redux'
import {
	medianPriceSelector,
	coingeckoPriceSelector,
	usmCollateralSelector,
	usmDebtRatioSelector,
	usmEthBufferSelector,
	fumBalanceSelector,
	usmBalanceSelector,
	etherBalanceSelector
} from '../../redux/selectors'
import { fetchStaked } from '../../redux/staking'

const Dashboard = ({
	history,
	medianPrice,
	usmCollateralUSD,
	usmDebtRatio,
	usmEthBufferUSD,
	usmCollateral,
	usmEthBuffer,
	fum_balance,
	usm_balance,
	ether_balance,
	myRef,
	usdaoBuyRef,
	setFumSupply,
	setUsmSupply,
	mode
}) => {
	const [stakedAmount, setStakedAmount] = useState(0.0)

	useEffect(() => {
		window.ethereum && fetchStaked(setStakedAmount)
	}, [])

	let header
	if (window.location.pathname === '/dashboard') {
		header = (
			<div className='mt-auto mb-auto' onClick={() => history.push('/')}>
				<img src={require('../../assets/images/Group12150.png')} />
			</div>
		)
	} else {
		header = ''
	}

	return (
		<div className='container-scroller'>
			{/* <Sidebar /> */}
			<div className='container-fluid page-body-wrapper p-0'>
				{/* <Navbar /> */}
				<div className='w-100'>
					<div className='d-flex justify-content-between flex-wrap'>
						{header}
						<h1 className='pt-3 about__title'>USDAO QUICK</h1>
					</div>
					<div className='row my-4'>
						<div className='col-md-3 col-6 border-right-custom text-center'>
							<p style={{ color: '#FEA441' }}>Market Price</p>
							<h3 className='dashboard_values'>
								${decimalPlaces(medianPrice)}
							</h3>
						</div>
						<div className='col-md-3 col-6 border-right-custom text-center'>
							<p style={{ color: '#FEA441' }}>Total Collateral</p>
							<h3 className='dashboard_values'>
								${decimalPlaces(usmCollateralUSD)}
							</h3>
						</div>
						<div className='col-md-3 col-6 border-right-custom text-center'>
							<p style={{ color: '#FEA441' }}>Buffer</p>
							<h3 className='dashboard_values'>
								${decimalPlaces(usmEthBufferUSD)}
							</h3>
						</div>
						<div className='col-md-3 col-6 text-center'>
							<p style={{ color: '#FEA441' }}>Debt Ratio</p>
							<h3 className='dashboard_values'>
								{toPercentage(usmDebtRatio)}%
							</h3>
						</div>
					</div>
					<div className='row mb-4 mt-5'>
						<div className='col-md-3 col-6 border-right-custom text-center'>
							<p style={{ color: '#FEA441' }}>ASSET Balance</p>
							<h3 className='dashboard_values'>
								{decimalPlaces(fum_balance, 4)}
							</h3>
						</div>
						<div className='col-md-3 col-6 border-right-custom text-center'>
							<p style={{ color: '#FEA441' }}>USDAO Balance</p>
							<h3 className='dashboard_values'>{decimalPlaces(usm_balance)}</h3>
						</div>
						<div className='col-md-3 col-6 border-right-custom text-center'>
							<p style={{ color: '#FEA441' }}>ETHER BALANCE</p>
							<h3 className='dashboard_values'>
								{decimalPlaces(ether_balance, 4)}
							</h3>
						</div>
						<div className='col-md-3 col-6 text-center'>
							<p style={{ color: '#FEA441' }}>Staked Amount (In USDAO)</p>
							<h3 className='dashboard_values'>
								{decimalPlaces(stakedAmount)}
							</h3>
						</div>
					</div>
					{/* <div className='row mb-2 mt-5'>
						<div className='col-md-6 mt-3'>
							<div className='row'>
								<div className='col-md-4 col-4 text-center'>
									<p style={{ color: '#FEA441' }}>ASSET Balance</p>
									<h3 className='dashboard_values'>
										{decimalPlaces(fum_balance, 4)}
									</h3>
								</div>
								<div className='col-md-4 col-4 text-center'>
									<p style={{ color: '#FEA441' }}>USDAO Balance</p>
									<h3 className='dashboard_values'>
										{decimalPlaces(usm_balance)}
									</h3>
								</div>
								<div className='col-md-4 col-4 text-center'>
									<p style={{ color: '#FEA441' }}>ETHER Balance</p>
									<h3 className='dashboard_values'>
										{decimalPlaces(ether_balance, 4)}
									</h3>
								</div>
							</div>
						</div>
					</div>
				 */}
					<div className='content-wrapper p-0'>
						<div className='row'>
							<WorkingArea
								mode={mode}
								usdaoBuyRef={usdaoBuyRef}
								assetRef={myRef}
								setFumSupply={setFumSupply}
								setUsmSupply={setUsmSupply}
							/>
						</div>

						{/* <div className="row">
                <div className="col-md-12 col-xl-6 grid-margin stretch-card">
                  <PayUsingToken />
                </div>

                <div className="col-md-12 col-xl-6 grid-margin stretch-card">
                  <RecentTradingActivities />
                </div>

              </div> */}
					</div>
				</div>
				{/* <Footer /> */}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const coingeckoPrice = coingeckoPriceSelector(state)
	const usmCollateral = usmCollateralSelector(state)
	const usmCollateralUSD = usmCollateral * coingeckoPrice
	const usmEthBuffer = usmEthBufferSelector(state)
	const usmEthBufferUSD = usmEthBuffer * coingeckoPrice
	const fum_balance = fumBalanceSelector(state)
	const usm_balance = usmBalanceSelector(state)
	const ether_balance = etherBalanceSelector(state)
	return {
		medianPrice: medianPriceSelector(state),
		usmCollateralUSD,
		fum_balance,
		usm_balance,
		ether_balance,
		usmDebtRatio: usmDebtRatioSelector(state),
		usmEthBufferUSD,
		usmCollateral,
		usmEthBuffer
	}
}

export default connect(mapStateToProps)(Dashboard)
