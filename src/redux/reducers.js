import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

function app(state = {}, action) {
  switch (action.type) {
    case 'NETWORK_LOADED':
      return { ...state, provider: action.provider }
    case 'USM_LOADED':
      return { ...state, usm: action.usm }
    case 'COMP_LOADED':
      return { ...state, comp: action.comp }
    case 'GOV_APLHA_LOADED':
      return { ...state, govAlpha: action.govAlpha }
    case 'GOV_LOADED':
      return { ...state, gov: action.gov }
    case 'FUM_LOADED':
      return { ...state, fum: action.fum }
    case 'FUN_BALANCE_LOADED':
      return { ...state, fum_balance: action.balance }
    case 'USM_BALANCE_LOADED':
      return { ...state, usm_balance: action.balance }
    case 'ETHER_BALANCE_LOADED':
      return { ...state, ether_balance: action.balance }
    case 'DYNAMIC_BALANCE_LOADED':
      return { ...state, dynamic_balance: { ...state.dynamic_balance, [action.balance.name]: action.balance.balance} }
    case 'BURN_FEE_LOADED':
      return { ...state, revenue_address : action.address,  Burn_Fee: action.balance }
    case 'DEFUND_FEE_LOADED':
      return { ...state,taxation_address : action.address, Defund_Fee: action.balance }
    case 'TAX_FEE_LOADED':
      return { ...state, taxation_address1 : action.address, Tax_Fee: action.balance }
    case 'USDAOMINT_FEE_LOADED':
      return { ...state, revenue_address1 : action.address, USDAOMint_Fee: action.balance }
    case 'TRANSFER_FEE_LOADED':
      return { ...state, revenue_address2 : action.address, Transfer_Fee: action.balance }
    case 'METAMASK_LOADED':
      return { 
        ...state,
        metamask: action.metamask,
        metamaskSigner: action.signer,
        metamaskUSM: action.usm,
        metamaskFUM: action.fum
      }
    case 'GOV_METAMASK_LOADED':
      return { 
        ...state,
        metamask: action.metamask,
        metamaskSigner: action.signer,
        metamaskUSM: action.usm,
        metamaskCOMP: action.comp,
        metamaskGOV: action.gov
      } 
    case 'ALL_PROPOSALS_LOADED':
      return { 
        ...state,
        proposals: action.allproposals,
      } 
      
    case 'PROPOSAL_STATE_LOADED':
      return { 
        ...state,
        proposalsState: action.allproposalsState,
      }   
      
    case 'METAMASK_ERROR':
      return { ...state, metamaskError: action.error }
    case 'CLEAR_METAMASK_ERROR':
      return { ...state, metamaskError: null }
    case 'SET_USM_INPUT_AMOUNT':
      return { ...state, usmInputAmount: action.amount }
    case 'SET_USM_INPUT_AMOUNT_ONE':
      return { ...state, usmInputAmountOne: action.amount }  
    case 'SET_USM_INPUT_AMOUNT_CHANGE':
      return { ...state, usmInputAmountChange: action.amount }
    case 'SET_USM_INPUT_AMOUNT_SELL_CHANGE':
      return { ...state, usmInputAmountSellChange: action.amount }  
    case 'SET_USM_INPUT_AMOUNT_CHANGE_ONE':
      return { ...state, usmInputAmountChange1: action.amount }  
    case 'SET_USM_INPUT_AMOUNT_SELL_CHANGE_ONE':
      return { ...state, usmInputAmountSellChange1: action.amount }    
    case 'SET_USM_INPUT_ADDRESS':
      return { ...state}   
    case 'SET_USM_INPUT_ADDRESS':
      return { ...state,  usmInputAmount: action.amount, usmInputAddress: action.Senderaddress }  
    case 'SET_FUM_INPUT_AMOUNT':
      return { ...state, fumInputAmount: action.amount }
    default:
      return state;
  }
}

function usm(state = {}, action) {
  switch (action.type) {
    case 'USM_TOTAL_SUPPLY':
      return { ...state, supply: action.supply }
    case 'USM_MINTS':
      return { ...state, mints: action.mints }
    case 'USM_BURNS':
      return { ...state, burns: action.burns }
    case 'USM_COLLATERAL':
      return { ...state, collateral: action.collateral }
    case 'USM_DEBT_RATIO':
      return { ...state, debtRatio: action.debtRatio }
    case 'ETH_TO_USM':
      return { ...state, buyPrice: action.buyPrice, sellPrice: action.sellPrice }
    case 'ETH_TO_USM_ONE':
      return { ...state, buyPriceOne: action.buyPriceOne, sellPriceOne: action.sellPriceOne }
    case 'USM_TO_ETH':
      return { ...state, buyPrice: action.buyPrice, sellPrice: action.sellPrice }
    case 'USM_ETH_BUFFER':
      return { ...state, ethBuffer: action.ethBuffer }
    case 'USM_PRICE':
      return { ...state, buyPrice: action.buyPrice, sellPrice: action.sellPrice }
    default:
      return state;
  }
}

function fum(state = {}, action) {
  switch (action.type) {
    case 'FUM_TOTAL_SUPPLY':
      return { ...state, supply: action.supply }
    case 'FUM_MINTS':
      return { ...state, mints: action.mints }
    case 'FUM_BURNS':
      return { ...state, burns: action.burns }
    case 'FUM_PRICE':
      return { ...state, buyPrice: action.buyPrice, sellPrice: action.sellPrice }
    default:
      return state;
  }
}

function oracle(state = {}, action) {
  switch (action.type) {
    case 'ORACLE_PRICE_CHAINLINK':
      return { ...state, chainlinkPrice: action.price }
    case 'ORACLE_PRICE_COMPOUND':
      return { ...state, compoundPrice: action.price }
    case 'ORACLE_PRICE_UNISWAP':
      return { ...state, uniswapPrice: action.price }
    case 'ORACLE_PRICE_COINGECKO':
      return { ...state, coingeckoPrice: action.price }
    case 'ORACLE_PRICE_MEDIAN':
      return { ...state, medianPrice: action.price }
    default:
      return state;
  }
}

const rootReducer = new combineReducers({
  app, usm, fum, oracle, form : formReducer
});

export default rootReducer;
