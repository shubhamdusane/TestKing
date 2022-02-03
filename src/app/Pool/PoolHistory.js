import React, { useEffect, useRef } from 'react'
import { Table } from 'antd'
import {
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

const PoolHistory = ({
	dispatch,
	Taxation_Address,
	Taxation_Address1,
	Revenue_Address,
	Revenue_Address1,
	Revenue_Address2,
	Burn_Fee,
	Defund_Fee,
	Tax_Fee,
	USDAOMint_Fee,
	Transfer_Fee
}) => {
	const isMounted = useRef(false)

	useEffect(() => {
		isMounted.current = true
		return () => {
			isMounted.current = false
		}
	}, [])

	const columns = [
		{
			title: 'Fee Type',
			dataIndex: 'feeType',
			key: 'feeType',
			render: (text) => <a>{text}</a>
		},
		{
			title: 'Collateral type',
			dataIndex: 'collateral_type',
			key: 'collateral_type'
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		},
		{
			title: 'Fee',
			key: 'fee',
			dataIndex: 'fee'
		}
	]

	const data = [
		{
			key: '1',
			feeType: 'USDAO Burn',
			collateral_type: 'Ether',
			address: (
				<input
					className='custom__input_calfee'
					style={{ color: 'black !important' }}
					type='text'
					name='address'
					value={Revenue_Address}
					disabled
				/>
			),
			fee: Burn_Fee
		},
		{
			key: '2',
			feeType: 'ASSET Burn',
			collateral_type: 'Ether',
			address: (
				<input
					className='custom__input_calfee'
					style={{ color: 'black !important' }}
					type='text'
					name='address'
					value={Taxation_Address}
					disabled
				/>
			),
			fee: Defund_Fee
		},
		{
			key: '3',
			feeType: 'ASSET MINT',
			collateral_type: 'ASSET',
			address: (
				<input
					className='custom__input_calfee'
					style={{ color: 'black !important' }}
					type='text'
					name='address'
					value={Taxation_Address1}
					disabled
				/>
			),
			fee: Tax_Fee
		},
		{
			key: '4',
			feeType: 'USDAO MINT',
			collateral_type: 'USDAO',
			address: (
				<input
					className='custom__input_calfee'
					style={{ color: 'black !important' }}
					type='text'
					name='address'
					value={Revenue_Address1}
					disabled
				/>
			),
			fee: USDAOMint_Fee
		},
		{
			key: '5',
			feeType: 'USDAO Transfer',
			collateral_type: 'USDAO',
			address: (
				<input
					className='custom__input_calfee'
					style={{ color: 'black !important' }}
					type='text'
					name='address'
					value={Revenue_Address2}
					disabled
				/>
			),
			fee: Transfer_Fee
		}
	]

	return (
		<div className='row my-5'>
			<div className='col-md-12 pr-3'>
				<h1 className='fees_color'>HISTORY</h1>
				<Table columns={columns} dataSource={data} scroll={{ x: 300 }} />
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
	return {
		Revenue_Address,
		Revenue_Address1,
		Revenue_Address2,
		Taxation_Address,
		Taxation_Address1,
		Burn_Fee,
		Defund_Fee,
		Tax_Fee,
		USDAOMint_Fee,
		Transfer_Fee
	}
}

export default connect(mapStateToProps)(PoolHistory)
