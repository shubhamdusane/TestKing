import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { ethers } from 'ethers'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { ExportOutlined } from '@ant-design/icons'
import { Modal as AntModal } from 'antd'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		padding: theme.spacing(1),
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: theme.shadows[5],
		border: '1px solid grey'
	},
	paper: {
		width: '80vw',
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2, 4, 3),
		borderRadius: 12
	}
}))

const NewProposalCard = ({
	value,
	uniqueResponse,
	proposalsState,
	index,
	queueProposal,
	executeProposal,
	voteProposal,
	blockNumber,
	backend_url
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [proposalData, setProposalData] = useState(null)
	const [total, setTotal] = useState({
		for: 0,
		against: 0
	})

	const showModal = async () => {
		console.log(Number(value['id']), 'this is id')
		const { data } = await axios.get(`${backend_url}/governance/view-desc`, {
			params: {
				desc_id: Number(value['id'])
			}
		})
		console.log(data, 'full data')
		if (data && data.success && data.message) {
			let totals = {
				for: 0,
				against: 0
			}
			console.log(data.message, 'votes !!')
			for (const vote of data.message.votes) {
				if (vote !== 1) {
					totals.for += Number(vote.value)
				} else {
					totals.against += Number(vote.value)
				}
			}
			console.log(totals, 'full totals')
			setTotal(totals)
			setProposalData(data.message)
		}
		setIsModalVisible(true)
	}

	const handleOk = () => {
		setIsModalVisible(false)
	}

	const handleCancel = () => {
		setIsModalVisible(false)
	}
	// Modal code ends
	const classes = useStyles()
	const [description, setDesc] = React.useState([''])
	const [disabled, setDisabled] = React.useState(false)
	const [disabledQueueBtn, setDisabledQueueBtn] = React.useState(false)
	const [disabledExecuteBtn, setDisabledExecuteBtn] = React.useState(false)

	React.useEffect(() => {
		fetchDetails()
	}, [])

	const [open, setOpen] = React.useState(false)

	const fetchDetails = () => {
		let description = uniqueResponse.find(
			(val) => Number(value['id']) == Number(val.args['id'])
		)
		setDesc(description?.['args']?.[8])
	}

	const getStateName = (id) => {
		let status = [
			'Pending',
			'Active',
			'Canceled',
			'Defeated',
			'Succeeded',
			'Queued',
			'Expired',
			'Executed'
		]
		return status[id]
	}
	return (
		<>
			<div
				className='row mt-2 px-2 pt-2'
				style={{
					border: '1px solid silver',
					borderRadius: '0.8rem',
					backgroundColor: 'white',
					cursor: 'pointer'
				}}
				onClick={showModal}
			>
				<div className='col-md-1'>
					<p className='pt-2'>{Number(value['id'])}</p>
				</div>
				<div className='col-md-8'>
					<h4 className='pt-2'>
						<span className='link-dark'>{description}</span>
					</h4>
				</div>
				<div className='col-md-3'>
					<span className='ml-3 response__bar'>
						{getStateName(proposalsState[index])}
					</span>
					<div className='response__bar'>
						<div className='' style={{ color: 'black', fontSize: 14 }}>
							{/* Against Vote:{' '}
							{ethers.utils.formatUnits(value['againstVotes'], 23)}% - For Vote:{' '}
							{ethers.utils.formatUnits(value['forVotes'], 23)}% */}
						</div>
					</div>
				</div>
			</div>
			<AntModal
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				className={classes.modal}
				footer={null}
				bodyStyle={{ borderRadius: '5rem' }}
			>
				<div
					className='my-3 time__bar'
					style={{ color: 'black', fontSize: 14 }}
				>
					{description}
				</div>
				<div className={classes.paper}>
					<div className='d-flex'>
						<div className='time__bar' style={{ color: 'black', fontSize: 14 }}>
							Against Vote: {console.log(Number(value['forVotes']), 'ag votes')}
							{(
								(Number(value['againstVotes']) / 10e17 / 21000000) *
								100
							).toFixed(2)}{' '}
							{/* comp total supply in place of 21mil */}% - For Vote:{' '}
							{((Number(value['forVotes']) / 10e17 / 21000000) * 100).toFixed(
								2
							)}{' '}
							%
						</div>
						<div>
							{getStateName(proposalsState[index]) == 'Active' &&
								blockNumber <= Number(value['endBlock']) && (
									<div className='d-flex' style={{ direction: 'rtl' }}>
										<button
											className={disabled ? 'py-1 px-4 disabled' : 'py-1 px-4'}
											style={{
												backgroundColor: 'transparent',
												border: '1px solid green',
												borderRadius: 6,
												color: 'green'
											}}
											onClick={() =>
												voteProposal(value['id'], true, setDisabled, index)
											}
										>
											Accept
										</button>
										<button
											className={disabled ? 'py-1 px-4 disabled' : 'py-1 px-4'}
											style={{
												backgroundColor: 'transparent',
												border: '1px solid green',
												borderRadius: 6,
												color: 'green'
											}}
											onClick={() =>
												voteProposal(value['id'], false, setDisabled, index)
											}
										>
											Reject
										</button>
									</div>
								)}

							{getStateName(proposalsState[index]) == 'Succeeded' && (
								<button
									className={
										disabledQueueBtn ? 'py-1 px-4 disabled' : 'py-1 px-4'
									}
									style={{
										backgroundColor: 'transparent',
										border: '1px solid green',
										borderRadius: 6,
										color: 'green'
									}}
									onClick={() =>
										queueProposal(value['id'], setDisabledQueueBtn, index)
									}
								>
									Queue
								</button>
							)}

							{getStateName(proposalsState[index]) == 'Queued' &&
								moment().unix() > Number(value['eta']) && (
									<button
										className={
											disabledExecuteBtn ? 'py-1 px-4 disabled' : 'py-1 px-4'
										}
										style={{
											backgroundColor: 'transparent',
											border: '1px solid green',
											borderRadius: 6,
											color: 'green'
										}}
										onClick={() =>
											executeProposal(value['id'], setDisabledExecuteBtn, index)
										}
									>
										Execute
									</button>
								)}
						</div>
					</div>
					<div className='col-12 p-0 mt-3'>
						<div className='row'>
							<div className='col-12 col-md-6 mt-2'>
								<div
									style={{
										backgroundColor: 'rgba(67, 67, 211, 0.226)',
										borderRadius: 6,
										padding: 8
									}}
								>
									<div className='d-flex'>
										<div style={{ flex: 1 }}>
											<h4>
												<b style={{ fontSize: 16 }}>For</b>
											</h4>
										</div>
										<div style={{ color: 'black', fontSize: 16 }}>
											<b>{total.for}</b>
										</div>
									</div>
									{/* <ul>
										{proposalData &&
											proposalData.votes.map(
												(vote) =>
													vote.vote_type && (
														<li key={vote._id}>
															<div className='row' style={{ color: 'black' }}>
																<div className='col-md-9'>{vote.user_hash}</div>
																<div className='col-md-3'>{vote.value}</div>
															</div>
														</li>
													)
											)}
									</ul> */}
									<div className='text-black text-center'>
										{/* <b>View All</b> */}
									</div>
								</div>
							</div>
							<div className='col-12 col-md-6 mt-2'>
								<div
									style={{
										backgroundColor: 'rgba(67, 67, 211, 0.226)',
										borderRadius: 6,
										padding: 8
									}}
								>
									<div className='d-flex'>
										<div style={{ flex: 1 }}>
											<h4>
												<b style={{ fontSize: 16 }}>Against</b>
											</h4>
										</div>
										<div style={{ color: 'black', fontSize: 16 }}>
											<b>{total.against}</b>
										</div>
									</div>
									{/* <ul>
										{proposalData &&
											proposalData.votes.map(
												(vote) =>
													!vote.vote_type && (
														<li key={vote._id}>
															<div className='row' style={{ color: 'black' }}>
																<div className='col-md-9'>{vote.user_hash}</div>
																<div className='col-md-3'>{vote.value}</div>
															</div>
														</li>
													)
											)}
									</ul> */}
									<div className='text-black text-center'>
										{/* <b>View All</b> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-12 p-0 mt-3'>
						<div>
							<h4>
								<b style={{ fontSize: 16 }}>Details: </b>
							</h4>
						</div>
						<span>
							{proposalData && (
								<span
									dangerouslySetInnerHTML={{ __html: proposalData.description }}
								></span>
							)}
						</span>

						<span>
							{proposalData && (
								<>
									<span>
										<strong>Proposer </strong> -{' '}
									</span>
									<a
										href={`https://rinkeby.etherscan.io/address/${value.proposer}`}
										target='_blank'
										className='link'
									>
										{value.proposer}
									</a>
								</>
							)}
						</span>
					</div>
				</div>
			</AntModal>
			{/* </div> */}
		</>
	)
}

export { NewProposalCard }
