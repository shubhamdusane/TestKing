import React, { useState } from 'react'
import Stakeform from './Stakeform'
import { contractDetails } from '../../app/sdk/ContractDetails'
import { stakeUsdao, claimUsdao } from '../../redux/staking'
import swal from 'sweetalert'

const { stake: Stake } = contractDetails

const Staking = ({
	history,
	balance,
	maxHandler,
	usdao_value,
	setUSDAOValue,
	setClaim_Table,
	setAvailablebalance,
	setStakedAmount,
	stakedAmount,
	availablebalance
}) => {
	// const [availablebalance, setaVailablebalance] = useState();
	const [disableStakeBtn, setDisableStakeBtn] = useState(false)

	// const validateDate = (date) => {
	//     const presetDate = new Date();
	//     var dateafter6months = new Date(new Date(presetDate).setMonth(presetDate.getMonth()+6));
	//     var dateafter12months = new Date(new Date(presetDate).setMonth(presetDate.getMonth()+12));
	//     var dateafter18months = new Date(new Date(presetDate).setMonth(presetDate.getMonth()+18));
	//     var dateafter24months = new Date(new Date(presetDate).setMonth(presetDate.getMonth()+24));
	//     var dateafter30months = new Date(new Date(presetDate).setMonth(presetDate.getMonth()+30));
	//     var dateafter36months = new Date(new Date(presetDate).setMonth(presetDate.getMonth()+36));

	//     console.log(new Date())
	//     // console.log(dateafter6months)
	//     // console.log(date._d)
	//     if(dateafter6months.getMonth() === date._d.getMonth() && dateafter6months.getFullYear() === date._d.getFullYear() && dateafter6months.getDate() === date._d.getDate())
	//     {
	//         console.log(dateafter6months)
	//         console.log(date._d)
	//         console.log('got 6')
	//         setFinaldate(date)
	//     }
	//     else if(dateafter12months.getMonth() === date._d.getMonth() && dateafter12months.getFullYear() === date._d.getFullYear() && dateafter12months.getDate() === date._d.getDate())
	//     {
	//         console.log(dateafter12months)
	//     console.log(date._d)
	//         console.log('got 12')
	//         setFinaldate(date)
	//     }
	//     else if(dateafter18months.getMonth() === date._d.getMonth() && dateafter18months.getFullYear() === date._d.getFullYear() && dateafter18months.getDate() === date._d.getDate())
	//     {
	//         console.log(dateafter18months)
	//     console.log(date._d)
	//         console.log('got 18')
	//         setFinaldate(date)

	//     }
	//     else if(dateafter24months.getMonth() === date._d.getMonth() && dateafter24months.getFullYear() === date._d.getFullYear() && dateafter24months.getDate() === date._d.getDate())
	//     {
	//         console.log(dateafter24months)
	//     console.log(date._d)
	//         console.log('got 24')
	//         setFinaldate(date)

	//     }
	//     else if(dateafter30months.getMonth() === date._d.getMonth() && dateafter30months.getFullYear() === date._d.getFullYear() && dateafter30months.getDate() === date._d.getDate())
	//     {
	//         console.log(dateafter30months)
	//     console.log(date._d)
	//         console.log('got 30')
	//         setFinaldate(date)

	//     }
	//     else if(dateafter36months.getMonth() === date._d.getMonth() && dateafter36months.getFullYear() === date._d.getFullYear()&& dateafter36months.getDate() === date._d.getDate())
	//     {
	//         console.log(dateafter36months)
	//         console.log(date._d)
	//         console.log('got 36')
	//         setFinaldate(date)

	//     }
	//     else {
	//         setFinaldate('')
	//         console.log('not got')
	//         swal(`Please Select the date in form of 6, 12, 18, 24, 30, 36 months`);
	//     }

	// }

	const stakeform = (e, form) => {
		console.log('executes here ??',e)
		// return
		var available_balance = balance.replace(',', '')
		// console.log(finaldate._d)
		// console.log(finaldate._d)
		// if(finaldate._d == undefined){
		//     return swal(`Please Re-enter data in form!`);
		// }
		let { auto_staked = false } = e
		var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
		if (format.test(e.amount)) {
			return swal(
				`Your entered amount is not in correct format. Please correct and retry.`
			)
		}
		if (parseFloat(e.amount) < 100) {
			return swal(
				`Minimum amount should be 100 USDAO! Please Re-enter the amount and try again`
			)
		}
		if (Number(e.amount) > Number(available_balance)) {
			return swal(`You do not have sufficient balance to Stake.`)
		}
		swal(
			`Are you sure you want to Stake ${e.amount} USDAO for ${e.timeperiod} months?`,
			{
				buttons: ['Cancel', true]
			}
		).then((result) => {
			if (result) {
				setDisableStakeBtn(true)
				stakeUsdao(
					Stake,
					e.timeperiod,
					e.amount,
					setDisableStakeBtn,
					form,
					auto_staked,
					setClaim_Table,
					setAvailablebalance,
					setStakedAmount,
					stakedAmount,
					availablebalance
				)
			} else {
				// setDisableStakeBtn(false)
				console.log('resut:', result)
			}
		})
	}

	const claimform = async (values) => {
		// getTransferrableAmount(Stake)
		swal(`Are you sure you want to Claim ?`, {
			buttons: ['cancel', true]
		}).then((result) => {
			if (result) {
				claimUsdao(Stake)
			}
		})
	}

	return (
		<div>
			{/* <Sidebar /> */}
			<div className='d-flex flex-column container-fluid page-body-wrapper'>
				{/* <Navbar title='STAKE / CLAIM' /> */}
				{/* <Tabs defaultActiveKey="1">
                    <TabPane tab="Tab 1" key="1"> */}
				{/* <Stakeform onFinish = {stakeform} date= {validateDate} claim={claimform} balance={availablebalance}/> */}
				<Stakeform
					onFinish={stakeform}
					claim={claimform}
					balance={availablebalance}
					maxHandler={maxHandler}
					usdao_value={usdao_value}
					setUSDAOValue={setUSDAOValue}
					disableStakeBtn={disableStakeBtn}
				/>
				
			</div>
		</div>
	)
}

export default Staking
