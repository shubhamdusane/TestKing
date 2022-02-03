import React, { useState } from 'react'
import 'antd/dist/antd.css'
import cn from 'classnames'
import { Spin } from 'antd'
import Calculateform from './Calculateform'
import { reset } from 'redux-form'
import {
	Burn_Fee_loaded,
	Defund_Fee_loaded,
	Tax_Fee_loaded,
	USDAOMint_Fee_loaded,
	Transfer_Fee_loaded
} from '../../redux/actions'
import {
	SetWithDraw1,
	SetWithDraw2,
	SetWithDraw3,
	SetWithDraw4,
	SetWithDraw5,
	loadMetamask,
	sendToPool
} from '../../redux/interactions'
import {
	usmContractSelector,
	metamaskSignerSelector,
	RevenueAddressSelector,
	TaxationAddressSelector,
	TaxationAddressSelector1,
	RevenueAddressSelector1,
	RevenueAddressSelector2,
	BurnFeeSelector,
	DefundFeeSelector,
	TaxFeeSelector,
	USDAOMintFeeSelector,
	TransferFeeSelector
} from '../../redux/selectors'
import { connect } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'
import { contractDetails } from '../sdk/ContractDetails'
const { usm } = contractDetails

const PoolFees = ({ dispatch, metamaskSigner }) => {
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState([])
	const [disabled, setDisabled] = useState(false)
	let [feevalue, setFeeValue] = useState({
		withdraw_mint_fee: false,
		withdraw_burn_fee: false,
		withdraw_fund_fee: false,
		withdraw_defund_fee: false,
		withdraw_transfer_fee: false
	})

	let spinner
	React.useEffect(() => {
		connectMetamask()
		// console.log(window.ethereum.currentProvider, 'hi hello');
	}, [])

	const connectMetamask = () => {
		loadMetamask(dispatch)
		// loadNetwork(dispatch)
	}

	function onChange(e) {
		if (e.BurnFee !== undefined) feevalue.withdraw_burn_fee = e.BurnFee
		if (e.DefundFee !== undefined) feevalue.withdraw_defund_fee = e.DefundFee
		if (e.TaxFee !== undefined) feevalue.withdraw_fund_fee = e.TaxFee
		if (e.USDAOMintFee !== undefined)
			feevalue.withdraw_mint_fee = e.USDAOMintFee
		if (e.TransferFee !== undefined)
			feevalue.withdraw_transfer_fee = e.TransferFee

		setFeeValue(feevalue)
	}

	const sendtopool = async () => {
		sendToPool(feevalue, setDisabled)
	}

	const calculateform = async (values, dispatch) => {
		dispatch(Burn_Fee_loaded(0, 0))
		dispatch(Defund_Fee_loaded(0, 0))
		dispatch(Tax_Fee_loaded(0, 0))
		dispatch(USDAOMint_Fee_loaded(0, 0))
		dispatch(Transfer_Fee_loaded(0, 0))
		var fee_arr = []

		setValues(values)
		setLoading(true)
		if (values.BurnFee) {
			fee_arr.push(1)
			await SetWithDraw1(dispatch, usm, metamaskSigner, values.BurnFee)
		}
		if (values.DefundFee) {
			fee_arr.push(2)
			await SetWithDraw2(dispatch, usm, metamaskSigner, values.DefundFee)
		}
		if (values.TaxFee) {
			fee_arr.push(3)
			await SetWithDraw3(dispatch, usm, metamaskSigner, values.TaxFee)
		}
		if (values.USDAOMintFee) {
			fee_arr.push(4)
			await SetWithDraw4(dispatch, usm, metamaskSigner, values.USDAOMintFee)
		}
		if (values.TransferFee) {
			fee_arr.push(5)
			await SetWithDraw5(dispatch, usm, metamaskSigner, values.TransferFee)
		}
		setLoading(false)

		dispatch(reset('Calculateform'))
	}

	if (loading) {
		const antIcon = (
			<LoadingOutlined style={{ fontSize: 24, width: '30px' }} spin />
		)
		spinner = (
			<Spin
				className='pt-3'
				indicator={antIcon}
				style={{ width: '30px', height: 'auto' }}
			/>
		)
	} else {
		spinner = ''
	}

	return (
		<div className='row my-5'>
			<div className='col-md-12 px-5'>
				<h1 className='fees_color'>Revenue UPDATES</h1>
				<Calculateform onSubmit={calculateform} onChange={onChange} />
				{spinner}
				<button
					className={cn(
						'pool_selector_input-button-one',
						disabled && 'disabled'
					)}
					onClick={() => {
						sendtopool()
					}}
				>
					Send To Pool
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const Revenue_Address = RevenueAddressSelector(state)
	const Revenue_Address1 = RevenueAddressSelector1(state)
	const Revenue_Address2 = RevenueAddressSelector2(state)
	const Taxation_Address = TaxationAddressSelector(state)
	const Taxation_Address1 = TaxationAddressSelector1(state)
	const Burn_Fee = BurnFeeSelector(state)
	const Defund_Fee = DefundFeeSelector(state)
	const Tax_Fee = TaxFeeSelector(state)
	const USDAOMint_Fee = USDAOMintFeeSelector(state)
	const Transfer_Fee = TransferFeeSelector(state)
	const usmContract = usmContractSelector(state)
	return {
		metamaskSigner: metamaskSignerSelector(state),
		Revenue_Address,
		Revenue_Address1,
		Revenue_Address2,
		Taxation_Address,
		Taxation_Address1,
		Burn_Fee,
		Defund_Fee,
		Tax_Fee,
		USDAOMint_Fee,
		Transfer_Fee,
		usmContract
	}
}

export default connect(mapStateToProps)(PoolFees)

// export default PoolFees
