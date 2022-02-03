import React, { useState } from 'react'
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

const ProposalCard = ({
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

		if (data && data.success) {
			let totals = {
				for: 0,
				against: 0
			}
			for (const vote of data.message.votes) {
				if (vote === 1) {
					totals.for += Number(vote.value)
				} else {
					totals.against += Number(vote.value)
				}
			}
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
		<div className='row'>
			<div className='col-12 col-md-8'>
				<div className='d-flex'>
					<div>
						<button
							type='button'
							className='recent__proposal__title'
							style={{
								backgroundColor: 'transparent',
								outline: 'none',
								borderColor: 'transparent'
							}}
							onClick={showModal}
						>
							{description}
						</button>
					</div>
					<div className='mt-auto mb-auto'>
						<ExportOutlined size={60} />
					</div>
				</div>

				<div className='d-flex'>
					<div className='time__bar'>
						Against Vote: {ethers.utils.formatUnits(value['againstVotes'], 23)}%
						- For Vote: {ethers.utils.formatUnits(value['forVotes'], 23)}%
					</div>
					{getStateName(proposalsState[index]) == 'Pending' ? (
						<div className='time__bar'>
							ID: {Number(value['id'])} - Start Block:{' '}
							{Number(value['startBlock'])}
						</div>
					) : (
						<div className='time__bar'>
							ID: {Number(value['id'])} - End Block: {Number(value['endBlock'])}
						</div>
					)}
				</div>
			</div>
			<div className='col-12 col-md-4 m-auto'>
				<div className='d-flex status-btn'>
					{getStateName(proposalsState[index]) == 'Active' &&
						blockNumber <= Number(value['endBlock']) && (
							<div className='ml-2 mt-auto mb-auto'>
								<a
									className={cn(
										'btn btn-primary btn-round text-white',
										disabled && 'disabled'
									)}
									onClick={() =>
										voteProposal(value['id'], true, setDisabled, index)
									}
								>
									Accept
								</a>
								<a
									className={cn(
										'btn btn-primary btn-round text-white ml-2',
										disabled && 'disabled'
									)}
									onClick={() =>
										voteProposal(value['id'], false, setDisabled, index)
									}
								>
									Reject
								</a>
							</div>
						)}

					{getStateName(proposalsState[index]) == 'Succeeded' && (
						<div className='ml-2 mt-auto mb-auto'>
							<a
								className={cn(
									'btn btn-primary btn-round text-white ',
									disabledQueueBtn && 'disabled'
								)}
								onClick={() =>
									queueProposal(value['id'], setDisabledQueueBtn, index)
								}
							>
								Queue
							</a>
						</div>
					)}

					{getStateName(proposalsState[index]) == 'Queued' &&
						moment().unix() > Number(value['eta']) && (
							<div className='ml-2 mt-auto mb-auto'>
								<a
									className={cn(
										'btn btn-primary btn-round text-white ',
										disabledExecuteBtn && 'disabled'
									)}
									onClick={() =>
										executeProposal(value['id'], setDisabledExecuteBtn, index)
									}
								>
									Execute
								</a>
							</div>
						)}

					<div className='ml-3 response__bar'>
						{getStateName(proposalsState[index])}
					</div>
				</div>
			</div>
			<AntModal
				title={description}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				className={classes.modal}
				footer={null}
			>
				<div className={classes.paper}>
					<div className='d-flex'>
						<div className='time__bar' style={{ color: 'black', fontSize: 14 }}>
							Against Vote:{' '}
							{ethers.utils.formatUnits(value['againstVotes'], 23)}% - For Vote:{' '}
							{ethers.utils.formatUnits(value['forVotes'], 23)}%
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
									<div
										className='d-flex'
										style={{ borderBottom: '1px solid black' }}
									>
										<div style={{ flex: 1 }}>
											<h4>
												<b style={{ fontSize: 16 }}>For</b>
											</h4>
										</div>
										<div style={{ color: 'black', fontSize: 16 }}>
											<b>{total.for}</b>
										</div>
									</div>
									{/* <div className='pt-3'>
										<h4>
											<b
												style={{ fontSize: 14, color: 'grey', paddingLeft: 14 }}
											>
												Top Voters
											</b>
										</h4>
									</div> */}
									<ul>
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
									</ul>
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
									<div
										className='d-flex'
										style={{ borderBottom: '1px solid black' }}
									>
										<div style={{ flex: 1 }}>
											<h4>
												<b style={{ fontSize: 16 }}>Against</b>
											</h4>
										</div>
										<div style={{ color: 'black', fontSize: 16 }}>
											<b>{total.against}</b>
										</div>
									</div>
									{/* <div className='pt-3'>
										<h4>
											<b
												style={{ fontSize: 14, color: 'grey', paddingLeft: 14 }}
											>
												Top Voters
											</b>
										</h4>
									</div> */}
									<ul>
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
									</ul>
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
					</div>
				</div>
			</AntModal>
		</div>
	)
}

export default React.memo(ProposalCard)
