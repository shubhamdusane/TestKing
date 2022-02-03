import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { ClaimTable } from '../../redux/staking'
import moment from 'moment'
import { claimUsdao } from '../../redux/staking'
import swal from 'sweetalert'
import { decimalPlaces } from '../../utils'
import { contractDetails } from '../sdk/ContractDetails'
const { stake: Stake } = contractDetails

const RewardHistory = ({
	claim_Table,
	setClaim_Table,
	setStakedAmount,
	setAvailablebalance,
	stakedAmount
}) => {
	useEffect(() => {
		ClaimTable(setClaim_Table, setStakedAmount)
	}, [])

	const [disableClaim, setDisableClaimbtn] = useState(false)

	const renderTableData = () => {
		const claimform = async (StakeId) => {
			swal(`Are you sure you want to Claim ?`, {
				buttons: ['Cancel', true]
			}).then((result) => {
				if (result) {
					setDisableClaimbtn(true)
					claimUsdao(
						Stake,
						StakeId,
						setStakedAmount,
						stakedAmount,
						setDisableClaimbtn,
						setAvailablebalance,
						setClaim_Table,
						setStakedAmount
					)
				}
			})
		}
		return (
			claim_Table &&
			claim_Table.map((val, key) => {
				const diableButton = () => {
					const unixDate = moment(new Date(), 'M/D/YYYY H:mm').unix()
					if (unixDate * 1000 < val.claim_enableTime * 1000) {
						return true
					}
					if (unixDate * 1000 > val.unixdate * 1000) {
						return false
					} else {
						return true
					}
				}
				return (
					<tr key={key}>
						<td scope='row'>{key + 1}</td>
						<td>{val.StakeId}</td>
						<td>{decimalPlaces(val.amount, 4)} USDAO</td>
						<td>{val.rewardtimeperiod} USDAO</td>
						<td>{val.timeperiod}</td>
						<td>{val.startTime}</td>
						<td>{val.stakingType ? 'Enable' : 'Disable'}</td>
						<td>
							{val.claimed ? (
								'Rewarded'
							) : (
								<Button
									type='primary'
									onClick={() => claimform(val.StakeId)}
									disabled={disableClaim || diableButton()}
								>
									{' '}
									CLAIM{' '}
								</Button>
							)}
						</td>
					</tr>
				)
			})
		)
	}

	return (
		<div className='reward-history-wrap'>
			<h6>Reward History</h6>
			<div className='table-wrap table-responsive container-fluid'>
				<table class='table w-100'>
					<thead>
						<tr>
							<th scope='col'>S.No</th>
							<th scope='col'>StakeId</th>
							<th scope='col'>Staked Amount</th>
							<th scope='col'>Reward</th>
							<th scope='col'>Time Period</th>
							<th scope='col'>Staked Date</th>
							<th scope='col'>Auto Staked </th>
							<th scope='col'>Action</th>
						</tr>
					</thead>
					<tbody className='table-striped'>{renderTableData()}</tbody>
				</table>
			</div>
		</div>
	)
}

export default RewardHistory
