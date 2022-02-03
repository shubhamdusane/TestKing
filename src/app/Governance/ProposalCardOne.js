import React from 'react'
import { connect } from 'react-redux'
import {
	executionGov,
	voteProposal,
	queueProposal,
	getCurrentBlockNumber,
	contract
} from '../../redux/governance'
import {
	compContractSelector,
	govAlphaContractSelector,
	govContractSelector,
	usmContractSelector,
	metamaskGOVSelector,
	metamaskCOMPSelector,
	metamaskUSMSelector,
	allProposalsSelector,
	proposalsStateSelector
} from '../../redux/selectors'
import { ethers } from 'ethers'
import moment from 'moment'
const ProposalCardOne = ({
	v,
	i,
	govAlphaContract,
	govContract,
	proposalsState
}) => {
	const [description, setDesc] = React.useState([''])
	const [blockNumber, setBlockNumber] = React.useState('')

	// console.log(v);

	React.useEffect(() => {
		// id = setInterval(()=>{
		fetchState()
		// },10000);
		// return ()=> {
		//     clearInterval(id)
		// }
	}, [])

	const fetchState = async () => {
		const response = await contract(govAlphaContract, v)
		const number = await getCurrentBlockNumber()
		setBlockNumber(Number(number))

		if (response && response.length > 0 && response[0]) {
			setDesc(response[0]['args'][8])
		}
		// console.log()
		// reload();
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

	const vote = async (approval) => {
		const voting = await voteProposal(govContract, v['id'], approval)
		fetchState()
	}

	const queue = async () => {
		const q = await queueProposal(govContract, v['id'])
		fetchState()
	}

	const execution = async () => {
		const execution = await executionGov(govContract, v['id'])
		fetchState()
	}

	return (
		<div className='card'>
			<div className='card-body'>
				<div className='container'>
					<div className='row'>
						{/* <div className="col-md-auto">{v.Sno}</div>
                        <div className="col-sm">{v.name}</div>
                        <div className="col-sm"  style={ {color : v['color']} }>{v.day}</div>
                        <div className="col-sm">
                        <Button className='btn-center' size="default" style={ {borderColor : v['color'],color : v['color']} }>{v.btnName}</Button>
                        </div> */}
						<div className='col-sm'>{description}</div>
						<div className='col-sm'>
							Against Vote: {ethers.utils.formatUnits(v['againstVotes'], 23)}% -
							For Vote: {ethers.utils.formatUnits(v['forVotes'], 23)}%
						</div>
						{getStateName(proposalsState[i]) == 'Pending' ? (
							<div className='col-sm time__bar'>
								ID: {Number(v['id'])} - Start Block: {Number(v['startBlock'])}
							</div>
						) : (
							<div className='col-sm time__bar'>
								ID: {Number(v['id'])} - End Block: {Number(v['endBlock'])}
							</div>
						)}
						<div className='col-sm'>
							<div className='d-flex'>
								{getStateName(proposalsState[i]) == 'Active' &&
									blockNumber <= Number(v['endBlock']) && (
										<div className='ml-2 mt-auto mb-auto mx-auto'>
											<a
												className='btn btn-primary btn-round text-white '
												onClick={() => vote(true)}
											>
												Accept
											</a>
											<a
												className='btn btn-primary btn-round text-white ml-2'
												onClick={() => vote(false)}
											>
												Reject
											</a>
										</div>
									)}

								{getStateName(proposalsState[i]) == 'Succeeded' &&
									blockNumber > Number(v['endBlock']) && (
										<div className='ml-2 mt-auto mb-auto mx-auto'>
											<a
												className='btn btn-primary btn-round text-white '
												onClick={() => queue()}
											>
												Queue
											</a>
										</div>
									)}

								{getStateName(proposalsState[i]) == 'Queued' &&
									moment().unix() > Number(v['eta']) && (
										<div className='ml-2 mt-auto mb-auto mx-auto'>
											<a
												className='btn btn-primary btn-round text-white '
												onClick={() => execution()}
											>
												Execute
											</a>
										</div>
									)}
								<div className='ml-3 response__bar mx-auto'>
									{getStateName(proposalsState[i])}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const compContract = compContractSelector(state)
	const govAlphaContract = govAlphaContractSelector(state)
	const govContract = govContractSelector(state)
	const usmContract = usmContractSelector(state)

	const metamaskUSM = metamaskUSMSelector(state)
	const metamaskCOMP = metamaskCOMPSelector(state)
	const metamaskGOV = metamaskGOVSelector(state)
	const allProposals = allProposalsSelector(state)
	const proposalsState = proposalsStateSelector(state)

	return {
		compContract,
		govAlphaContract,
		govContract,
		usmContract,
		metamaskUSM,
		metamaskCOMP,
		metamaskGOV,
		allProposals,
		proposalsState
	}
}

export default connect(mapStateToProps)(ProposalCardOne)
