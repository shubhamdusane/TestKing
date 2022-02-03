import React, { useState, useEffect } from 'react'
import AppLayout from '../HOC/Layout'
import Stake from './Stake'
import { RangeInput } from '../home/Staking'
import RewardHistory from './RewardHistory'
import { decimalPlaces } from '../../utils'
import {
	fetchAvailableBalance,
	TVLAmount,
	fetchStakedAmount,
	fetchStakedRewards,
	ClaimTable,
	fetchRewardPercent
} from '../../redux/staking'
import { loadUsmBalance1 } from '../../redux/interactions'
import '../../app/App.scss'

const sideBarConfig = [
	// {
	//     name : 'KOVAM', customClass : 'kovam-btn', isLink : false
	// },
	{
		name: '0 USDAO',
		customClass: '',
		isLink: false
	},
	{
		name: 'Connect-Wallet',
		customClass: 'connect-wallet',
		isLink: false
	}
	// {
	// 	name: 'Dashboard',
	// 	customClass: '',
	// 	isLink: true
	// },
	// {
	// 	name: 'Reward History',
	// 	customClass: '',
	// 	isLink: true
	// }
]

function Stakingmain({ dispatch }) {
	const [availablebalance, setAvailablebalance] = useState()
	const [stakedAmount, setStakedAmount] = useState(0)
	const [stakedRewards, setStakedRewards] = useState()
	const [tvlAmount, settvlAmount] = useState()
	const [usmbalance, setUsmbalance] = useState()
	const [usdao_value, setUSDAOValue] = useState()
	const [rewardPercent, setRewardPercent] = useState()
	const [claim_Table, setClaim_Table] = useState([
		{ address: '', amount: '', timeperiod: '', rewardtimeperiod: '' }
	])

	useEffect(() => {
		fetchAvailableBalance(setAvailablebalance)
		// fetchStakedAmount(setStakedAmount);
		fetchStakedRewards(setStakedRewards)
		TVLAmount(settvlAmount)
		loadUsmBalance1(setUsmbalance)
		ClaimTable(setClaim_Table)
		fetchRewardPercent(setRewardPercent)
	}, [])
	const maxHandler = () => {
		setUSDAOValue(availablebalance)
	}

	let totalUsmAmount = Number(usmbalance) + Number(stakedAmount)
	return (
		<AppLayout
			sideBarConfig={sideBarConfig}
			usmbalance={decimalPlaces(totalUsmAmount)}
		>
			<div className='staking_main'>
				<div className='row staking_main_top'>
					<div className='col-6 col-md-5 staking_main_top_left'>
						<h6>Total Staked</h6>
						<h5>{decimalPlaces(stakedAmount)} USDAO</h5>
						{/* <h4>$1,826.42</h4> */}
					</div>
					<div className='col-6 col-md-2 staking_main_top_mid p-0'>
						<h6>Total Rewards</h6>
						<img alt='#' src={require('../../assets/images/cup.png')} />
						{/* <h5>{decimalPlaces(stakedRewards)}</h5>                        */}
						<h6>{rewardPercent}% Yearly</h6>
					</div>
					<div className='col-6 col-md-5 staking_main_top_right'>
						<h6>Available Balance</h6>
						<h5>{decimalPlaces(availablebalance)} USDAO</h5>
						{/* <h4>$1,826.42</h4> */}
					</div>
				</div>
				<div className='row stakeConatiner'>
					<div className='Stake_card pt-3'>
						<h6>Stake USDAO</h6>
						<p>(Stake USDAO and get rewards)</p>
						<Stake
							stakedAmount={stakedAmount}
							setStakedAmount={setStakedAmount}
							setAvailablebalance={setAvailablebalance}
							balance={decimalPlaces(availablebalance)}
							maxHandler={maxHandler}
							usdao_value={usdao_value}
							setUSDAOValue={setUSDAOValue}
							setClaim_Table={setClaim_Table}
							availablebalance={availablebalance}
						/>
					</div>
					<div className='reward-estimate'>
						<RangeInput rewardPercent={rewardPercent} />
					</div>
				</div>
				<div className='reward-history'>
					<RewardHistory
						setClaim_Table={setClaim_Table}
						claim_Table={claim_Table}
						setStakedAmount={setStakedAmount}
						stakedAmount={stakedAmount}
						setAvailablebalance={setAvailablebalance}
					/>
				</div>
			</div>
		</AppLayout>
	)
}

export default Stakingmain
