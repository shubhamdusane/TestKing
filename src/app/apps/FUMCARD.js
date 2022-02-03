import React from 'react'
import TodoListComponent from '../apps/Input'

import { connect } from 'react-redux'
import {
	coingeckoPriceSelector,
	fumBurnsSelector,
	fumBuyPriceSelector,
	fumInputAmountSelector,
	fumMintsSelector,
	fumSellPriceSelector,
	fumSupplySelector,
	metamaskSelector,
	metamaskSignerSelector,
	metamaskUSMSelector
} from '../../redux/selectors'
import { stringMul } from '../../utils'
import { buyFUM, sellFUM } from '../../redux/interactions'
import { setInputAmount } from '../../redux/actions'
import { contractDetails } from '../sdk/ContractDetails'
const { fum } = contractDetails

const FUMCARD = ({
	dispatch,
	fumMarketCap,
	fumMarketCapUSD,
	fumSupply,
	fumMints,
	fumBurns,
	fumBuyPrice,
	fumBuyPriceUSD,
	fumSellPrice,
	fumSellPriceUSD,
	metamaskSigner,
	metamaskConnected,
	metamaskUSM,
	inputAmount
}) => {
	const buyFum = (e) => {
		buyFUM(dispatch, metamaskUSM, metamaskSigner, inputAmount)
	}

	const setAmount = (e) => {
		dispatch(setInputAmount(fum.name, e.target.value))
	}

	const sellFum = (e) => {
		sellFUM(dispatch, metamaskUSM, metamaskSigner, inputAmount)
	}

	return (
		<>
			<div className='col-md-8 col-xl-5 grid-margin stretch-card'>
				<div className='card'>
					<div className='card-body'>
						<h4 className='project__title card-title'>Fund ASSET</h4>
						{/* <h6 className="project__sub__title">Enter amount of Ether as input.</h6> */}
						<TodoListComponent submit={buyFum} inputChangeHandler={setAmount} />
					</div>
				</div>
			</div>

			<div className='col-md-8 col-xl-5 grid-margin stretch-card'>
				<div className='card'>
					<div className='card-body'>
						<h4 className='project__title card-title'>Defund ASSET</h4>
						{/* <h6 className="project__sub__title">Enter amount of Ether as input.</h6> */}
						<TodoListComponent
							submit={sellFum}
							inputChangeHandler={setAmount}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	const coingeckoPrice = coingeckoPriceSelector(state)

	const fumSupply = fumSupplySelector(state)
	const fumBuyPrice = fumBuyPriceSelector(state)
	const fumSellPrice = fumSellPriceSelector(state)
	const fumMarketCap = fumSupply * fumBuyPrice

	const fumBuyPriceUSD = stringMul(fumBuyPrice, coingeckoPrice)
	const fumSellPriceUSD = stringMul(fumSellPrice, coingeckoPrice)
	const fumMarketCapUSD = stringMul(fumMarketCap, coingeckoPrice)

	const metamask = metamaskSelector(state)
	const metamaskConnected = metamask != null
	return {
		inputAmount: fumInputAmountSelector(state),
		fumMarketCap,
		fumMarketCapUSD,
		fumSupply,
		fumMints: fumMintsSelector(state),
		fumBurns: fumBurnsSelector(state),
		fumBuyPrice,
		fumBuyPriceUSD,
		fumSellPrice,
		fumSellPriceUSD,
		coingeckoPrice,
		metamaskConnected,
		metamaskSigner: metamaskSignerSelector(state),
		metamaskUSM: metamaskUSMSelector(state)
	}
}

export default connect(mapStateToProps)(FUMCARD)
