import { contractDetails } from '../app/sdk/ContractDetails'
import { chainlink, coingecko, compound, median, uniswap } from '../oracles'
const { fum, usm, usmView } = contractDetails

export function setInputAmount(token, amount, Senderaddress) {
	switch (token) {
		case usm.name:
			return {
				type: 'SET_USM_INPUT_ADDRESS',
				amount,
				Senderaddress
			}
		case fum.name:
			return {
				type: 'SET_FUM_INPUT_AMOUNT',
				amount
			}
		default:
			break
	}
}

export function setInputAmount1(token, amount, Senderaddress) {
	switch (token) {
		case usm.name:
			return {
				type: 'SET_USM_INPUT_AMOUNT_ONE',
				amount
			}
		default:
			break
	}
}

export function setInputAmountChange(token, amount) {
	switch (token) {
		case usmView.name:
			return {
				type: 'SET_USM_INPUT_AMOUNT_CHANGE',
				amount
			}
		default:
			break
	}
}

export function setInputAmountSellChange(token, amount) {
	switch (token) {
		case usmView.name:
			return {
				type: 'SET_USM_INPUT_AMOUNT_SELL_CHANGE',
				amount
			}
		default:
			break
	}
}

export function setInputAmountChange1(token, amount) {
	switch (token) {
		case usmView.name:
			return {
				type: 'SET_USM_INPUT_AMOUNT_CHANGE_ONE',
				amount
			}
		default:
			break
	}
}

export function setInputAmountSellChange1(token, amount) {
	switch (token) {
		case usmView.name:
			return {
				type: 'SET_USM_INPUT_AMOUNT_SELL_CHANGE_ONE',
				amount
			}
		default:
			break
	}
}

export function metamaskLoaded(metamask, signer, usm, fum) {
	return {
		type: 'METAMASK_LOADED',
		metamask,
		signer,
		usm,
		fum
	}
}

export function govmetamaskLoaded(metamask, signer, comp, gov, usm) {
	return {
		type: 'GOV_METAMASK_LOADED',
		metamask,
		signer,
		usm,
		gov,
		comp
	}
}

export function webLoaded(web) {
	return {
		type: 'WEB_LOADED',
		web
	}
}

export function metamaskError(error) {
	return {
		type: 'METAMASK_ERROR',
		error
	}
}

export function clearMetamaskError() {
	return {
		type: 'CLEAR_METAMASK_ERROR'
	}
}

export function networkLoaded(provider) {
	return {
		type: 'NETWORK_LOADED',
		provider
	}
}

export function usmLoaded(usm) {
	return {
		type: 'USM_LOADED',
		usm
	}
}

export function compLoaded(comp) {
	return {
		type: 'COMP_LOADED',
		comp
	}
}

export function allProposalsLoaded(allproposals) {
	return {
		type: 'ALL_PROPOSALS_LOADED',
		allproposals
	}
}

export function govAlphaLoaded(govAlpha) {
	return {
		type: 'GOV_APLHA_LOADED',
		govAlpha
	}
}

export function govLoaded(gov) {
	return {
		type: 'GOV_LOADED',
		gov
	}
}

export function proposalStateLoaded(allproposalsState) {
	return {
		type: 'PROPOSAL_STATE_LOADED',
		allproposalsState
	}
}

export function fumLoaded(fum) {
	return {
		type: 'FUM_LOADED',
		fum
	}
}

export function funBalanceLoaded(balance) {
	return {
		type: 'FUN_BALANCE_LOADED',
		balance
	}
}

export function usmBalanceLoaded(balance) {
	return {
		type: 'USM_BALANCE_LOADED',
		balance
	}
}

export function etherBalanceLoaded(balance) {
	return {
		type: 'ETHER_BALANCE_LOADED',
		balance
	}
}

export function dynamic_balance_loaded(balance) {
	console.log(balance)
	return {
		type: 'DYNAMIC_BALANCE_LOADED',
		balance
	}
}

export function Burn_Fee_loaded(address, balance) {
	return {
		type: 'BURN_FEE_LOADED',
		address,
		balance
	}
}

export function Defund_Fee_loaded(address, balance) {
	return {
		type: 'DEFUND_FEE_LOADED',
		address,
		balance
	}
}

export function Tax_Fee_loaded(address, balance) {
	return {
		type: 'TAX_FEE_LOADED',
		address,
		balance
	}
}

export function USDAOMint_Fee_loaded(address, balance) {
	return {
		type: 'USDAOMINT_FEE_LOADED',
		address,
		balance
	}
}

export function Transfer_Fee_loaded(address, balance) {
	return {
		type: 'TRANSFER_FEE_LOADED',
		address,
		balance
	}
}

export function setLatestOraclePrice(source, price) {
	switch (source) {
		case chainlink:
			return {
				type: 'ORACLE_PRICE_CHAINLINK',
				price
			}
		case compound:
			return {
				type: 'ORACLE_PRICE_COMPOUND',
				price
			}
		case uniswap:
			return {
				type: 'ORACLE_PRICE_UNISWAP',
				price
			}
		case coingecko:
			return {
				type: 'ORACLE_PRICE_COINGECKO',
				price
			}
		case median:
			return {
				type: 'ORACLE_PRICE_MEDIAN',
				price
			}
		default:
			break
	}
}

export function setCollateral(collateral) {
	return {
		type: 'USM_COLLATERAL',
		collateral
	}
}

export function setDebtRatio(debtRatio) {
	return {
		type: 'USM_DEBT_RATIO',
		debtRatio
	}
}

export function setEthToUsm(buyPrice, sellPrice) {
	return {
		type: 'ETH_TO_USM',
		buyPrice,
		sellPrice
	}
}

export function setEthToUsmOne(buyPriceOne, sellPriceOne) {
	return {
		type: 'ETH_TO_USM_ONE',
		buyPriceOne,
		sellPriceOne
	}
}

export function setUsmToEth(buyPrice, sellPrice) {
	return {
		type: 'USM_TO_ETH',
		buyPrice,
		sellPrice
	}
}

export function setEthBuffer(ethBuffer) {
	return {
		type: 'USM_ETH_BUFFER',
		ethBuffer
	}
}

export function setUSMPrice(buyPrice, sellPrice) {
	return {
		type: 'USM_PRICE',
		buyPrice,
		sellPrice
	}
}

export function setFUMPrice(buyPrice, sellPrice) {
	return {
		type: 'FUM_PRICE',
		buyPrice,
		sellPrice
	}
}

export function setTotalSupply(tokenName, supply) {
	switch (tokenName) {
		case usm.name:
			return {
				type: 'USM_TOTAL_SUPPLY',
				supply
			}
		case fum.name:
			return {
				type: 'FUM_TOTAL_SUPPLY',
				supply
			}
		default:
			break
	}
}

export function setMints(tokenName, mints) {
	switch (tokenName) {
		case usm.name:
			return {
				type: 'USM_MINTS',
				mints
			}
		case fum.name:
			return {
				type: 'FUM_MINTS',
				mints
			}
		default:
			break
	}
}

export function setBurns(tokenName, burns) {
	switch (tokenName) {
		case usm.name:
			return {
				type: 'USM_BURNS',
				burns
			}
		case fum.name:
			return {
				type: 'FUM_BURNS',
				burns
			}
		default:
			break
	}
}

export function STAKE_AMUONT_LOADED(amount) {
	return {
		type: 'STAKE_AMUONT_LOADED',
		amount
	}
}

export function STAKE_VALIDITY_LOADED(amount) {
	return {
		type: 'STAKE_VALIDITY_LOADED',
		amount
	}
}

export function stakeLockRewardLoaded(amount) {
	return {
		type: 'STAKE_REWARD_LOADED',
		amount
	}
}

export function lockedAmountLoaded(amount) {
	return {
		type: 'LOCKED_AMOUNT_LOADED',
		amount
	}
}

export function transferableAmountLoaded(amount) {
	return {
		type: 'T_AMOUNT_LOADED',
		amount
	}
}

export function monthlyAmountLoaded(amount) {
	return {
		type: 'MONTHLY_AMOUNT_LOADED',
		amount
	}
}

export function dailyAmountLoaded(amount) {
	return {
		type: 'DAILY_AMOUNT_LOADED',
		amount
	}
}

export function weeklyAmountLoaded(amount) {
	return {
		type: 'WEEKLY_AMOUNT_LOADED',
		amount
	}
}
