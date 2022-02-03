import {get} from 'lodash';
import {createSelector} from 'reselect';

//APP
const networkProvider = state => get(state, 'app.provider', null);
export const networkProviderSelector = createSelector(networkProvider, w => w);

const usmContract = state => get(state, 'app.usm', null);
export const usmContractSelector = createSelector(usmContract, w => w);

const metamask = state => get(state, 'app.metamask', null);
export const metamaskSelector = createSelector(metamask, w => w);

const metamaskSigner = state => get(state, 'app.metamaskSigner', null);
export const metamaskSignerSelector = createSelector(metamaskSigner, w => w);

const metamaskError = state => get(state, 'app.metamaskError', null);
export const metamaskErrorSelector = createSelector(metamaskError, w => w);

const metamaskUSM = state => get(state, 'app.metamaskUSM', null);
export const metamaskUSMSelector = createSelector(metamaskUSM, w => w);

const metamaskCOMP = state => get(state, 'app.metamaskCOMP', null);
export const metamaskCOMPSelector = createSelector(metamaskCOMP, w => w);

const metamaskGOV = state => get(state, 'app.metamaskGOV', null);
export const metamaskGOVSelector = createSelector(metamaskGOV, w => w);

const metamaskFUM = state => get(state, 'app.metamaskFUM', null);
export const metamaskFUMSelector = createSelector(metamaskFUM, w => w);

const usmInputAmount = state => get(state, 'app.usmInputAmount', null);
export const usmInputAmountSelector = createSelector(usmInputAmount, w => w);

const usmInputAmountOne = state => get(state, 'app.usmInputAmountOne', null);
export const usmInputAmountOneSelector = createSelector(usmInputAmountOne, w => w);

const usmInputAmountChange = state => get(state, 'app.usmInputAmountChange', null);
export const usmInputAmountChangeSelector = createSelector(usmInputAmountChange, w => w);

const usmInputAmountSellChange = state => get(state, 'app.usmInputAmountSellChange', null);
export const usmInputAmountSellChangeSelector = createSelector(usmInputAmountSellChange, w => w);

const usmInputAmountChange1 = state => get(state, 'app.usmInputAmountChange1', null);
export const usmInputAmountChangeSelector1 = createSelector(usmInputAmountChange1, w => w);

const usmInputAmountSellChange1 = state => get(state, 'app.usmInputAmountSellChange1', null);
export const usmInputAmountSellChangeSelector1 = createSelector(usmInputAmountSellChange1, w => w);

const usmInputAddress = state => get(state, 'app.usmInputAmount', null);
export const usmInputAmountSelector1 = createSelector(usmInputAddress, w => w);

const fumInputAmount = state => get(state, 'app.fumInputAmount', null);
export const fumInputAmountSelector = createSelector(fumInputAmount, w => w);

//USM
const usmSupply = state => get(state, 'usm.supply', 0);
export const usmSupplySelector = createSelector(usmSupply, w => w);

const usmMints = state => get(state, 'usm.mints', 0);
export const usmMintsSelector = createSelector(usmMints, w => w);

const usmBurns = state => get(state, 'usm.burns', 0);
export const usmBurnsSelector = createSelector(usmBurns, w => w);

const usmCollateral = state => get(state, 'usm.collateral', 0);
export const usmCollateralSelector = createSelector(usmCollateral, w => w);

const usmDebtRatio = state => get(state, 'usm.debtRatio', 0);
export const usmDebtRatioSelector = createSelector(usmDebtRatio, w => w);

const usmEthBuffer = state => get(state, 'usm.ethBuffer', 0);
export const usmEthBufferSelector = createSelector(usmEthBuffer, w => w);

const usmBuyPrice = state => get(state, 'usm.buyPrice', 0);
export const usmBuyPriceSelector = createSelector(usmBuyPrice, w => w);

const usmSellPrice = state => get(state, 'usm.sellPrice', 0);
export const usmSellPriceSelector = createSelector(usmSellPrice, w => w);

const usmBuyPriceOne = state => get(state, 'usm.buyPriceOne', 0);
export const usmBuyPriceOneSelector = createSelector(usmBuyPrice, w => w);

const usmSellPriceOne = state => get(state, 'usm.sellPriceOne', 0);
export const usmSellPriceOneSelector = createSelector(usmSellPriceOne, w => w);

//FUM
const fumSupply = state => get(state, 'fum.supply', 0);
export const fumSupplySelector = createSelector(fumSupply, w => w);

const fumMints = state => get(state, 'fum.mints', 0);
export const fumMintsSelector = createSelector(fumMints, w => w);

const fumBurns = state => get(state, 'fum.burns', 0);
export const fumBurnsSelector = createSelector(fumBurns, w => w);

const fumBuyPrice = state => get(state, 'fum.buyPrice', 0);
export const fumBuyPriceSelector = createSelector(fumBuyPrice, w => w);

const fumSellPrice = state => get(state, 'fum.sellPrice', 0);
export const fumSellPriceSelector = createSelector(fumSellPrice, w => w);

//ORACLE
const chainlinkPrice = state => get(state, 'oracle.chainlinkPrice', 0);
export const chainlinkPriceSelector = createSelector(chainlinkPrice, w => w);

const compoundPrice = state => get(state, 'oracle.compoundPrice', 0);
export const compoundPriceSelector = createSelector(compoundPrice, w => w);

const uniswapPrice = state => get(state, 'oracle.uniswapPrice', 0);
export const uniswapPriceSelector = createSelector(uniswapPrice, w => w);

const coingeckoPrice = state => get(state, 'oracle.coingeckoPrice', 0);
export const coingeckoPriceSelector = createSelector(coingeckoPrice, w => w);

const medianPrice = state => get(state, 'oracle.medianPrice', 0);
export const medianPriceSelector = createSelector(medianPrice, w => w);

const funBalance = state => get(state, 'app.fum_balance', 0);
export const fumBalanceSelector = createSelector(funBalance, w => w);

const usmBalance = state => get(state, 'app.usm_balance', 0);
export const usmBalanceSelector = createSelector(usmBalance, w => w);

const dynamiBalance = state => get(state, 'app.dynamic_balance', null);
export const dynamicBalanceSelector = createSelector(dynamiBalance, w => w);


const etherBalance = state => get(state, 'app.ether_balance', 0);
export const etherBalanceSelector = createSelector(etherBalance, w => w);

const RevenueAddress = state => get(state, 'app.revenue_address', 0);
export const RevenueAddressSelector = createSelector(RevenueAddress, w => w);

const RevenueAddress1 = state => get(state, 'app.revenue_address1', 0);
export const RevenueAddressSelector1 = createSelector(RevenueAddress1, w => w);

const RevenueAddress2 = state => get(state, 'app.revenue_address2', 0);
export const RevenueAddressSelector2 = createSelector(RevenueAddress2, w => w);

const TaxationAddress = state => get(state, 'app.taxation_address', 0);
export const TaxationAddressSelector = createSelector(TaxationAddress, w => w);

const TaxationAddress1 = state => get(state, 'app.taxation_address1', 0);
export const TaxationAddressSelector1 = createSelector(TaxationAddress1, w => w);

const BurnFee = state => get(state, 'app.Burn_Fee', 0);
export const BurnFeeSelector = createSelector(BurnFee, w => w);

const DefundFee = state => get(state, 'app.Defund_Fee', 0);
export const DefundFeeSelector = createSelector(DefundFee, w => w);

const TaxFee = state => get(state, 'app.Tax_Fee', 0);
export const TaxFeeSelector = createSelector(TaxFee, w => w);

const USDAOMintFee = state => get(state, 'app.USDAOMint_Fee', 0);
export const USDAOMintFeeSelector = createSelector(USDAOMintFee, w => w);

const TransferFee = state => get(state, 'app.Transfer_Fee', 0);
export const TransferFeeSelector = createSelector(TransferFee, w => w);

const compContract = state => get(state, 'app.comp', null);
export const compContractSelector = createSelector(compContract, w => w);

const govAlphaContract = state => get(state, 'app.govAlpha', null);
export const govAlphaContractSelector = createSelector(govAlphaContract, w => w);

const govContract = state => get(state, 'app.gov', null);
export const govContractSelector = createSelector(govContract, w => w);

const proposals = state => get(state, 'app.proposals', null);
export const allProposalsSelector = createSelector(proposals, w => w);

const proposalsState = state => get(state, 'app.proposalsState', null);
export const proposalsStateSelector = createSelector(proposalsState, w => w);

const webContract = state => get(state, 'app.web', null);
export const webContractSelector = createSelector(webContract, w => w);

// USM View

