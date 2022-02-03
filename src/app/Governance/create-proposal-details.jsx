import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { contractDetails } from '../sdk/ContractDetails'
import './_gov.scss'

const { usm, comp: Comp, governorAlpha } = contractDetails
let infura_url = 'https://rinkeby.infura.io/v3/52dd17106cdf425dae9c43d6903aa12a'
let provider = null
if (typeof window.ethereum !== 'undefined') {
	provider = new ethers.providers.Web3Provider(window.ethereum)
}

const backend_url = 'https://api.usdao.io/api'
const infuraProvider = new ethers.providers.JsonRpcProvider(infura_url)

const CreateProposalDetails = ({ match, history }) => {
	const initialValues = useMemo(async () => {
		const network = await provider.getNetwork()
		const signer = await provider.getSigner()

		const addressComp = Comp.address[network.chainId]
		const abiComp = Comp.abi

		const addressUsm = usm.address[network.chainId]
		const abiUsm = usm.abi

		const addressGov = governorAlpha.address[network.chainId]
		const abiGov = governorAlpha.abi

		const CompContract = new ethers.Contract(addressComp, abiComp, signer)
		const UsmContract = new ethers.Contract(addressUsm, abiUsm, signer)
		const GovContract = new ethers.Contract(addressGov, abiGov, signer)

		const signerAddress = await signer.getAddress()

		const current_block = await infuraProvider.getBlockNumber()

		return {
			network,
			signer,
			addressComp,
			abiComp,
			CompContract,
			UsmContract,
			GovContract,
			current_block,
			signerAddress,
			addressGov,
			abiGov
		}
	}, [])

	const [proposalDetails, setProposalDetails] = useState({})

	const searchPorposals = async (id) => {
		const { GovContract, current_block } = await initialValues
		let result = [],
			number = null

		result = await GovContract.proposals(id)
		number = id

		console.log(result[0], 'this is repsonse')
		const _proposals = result[0] != null ? [result] : [],
			_proposalStates = [await GovContract.state(number)]
		console.log(_proposals.length, _proposalStates)
		if (_proposals.length > 0 && _proposalStates.length > 0) {
			const startBlock = _proposals[_proposals.length - 1],
				endBlock = _proposals[0]

			const response = await GovContract.queryFilter(
				'ProposalCreated',
				Number(startBlock['startBlock']) - 500,
				Number(endBlock['endBlock'])
			)

			const uniqueResponse = []
			for (const r of response) {
				const exist = uniqueResponse.find(
					(ur) => ur.blockNumber === r.blockNumber
				)
				if (!exist) {
					uniqueResponse.push(r)
				}
			}
			console.log({
				proposalStates: _proposalStates,
				proposals: _proposals,
				responses: uniqueResponse,
				current_block
			})

			setProposalDetails({
				proposalStates: _proposalStates,
				proposals: _proposals,
				responses: uniqueResponse,
				current_block
			})

			additionalDetails(_proposals[0])
		}
	}

	const [proposalData, setProposalData] = useState(null)
	const [total, setTotal] = useState({
		for: 0,
		against: 0
	})

	const additionalDetails = async (value) => {
		console.log(Number(value['id']), 'this is id')
		const { data } = await axios.get(`${backend_url}/governance/view-desc`, {
			params: {
				desc_id: Number(value['id'])
			}
		})
		console.log(data, 'check data')
		if (data && data.success && data.message) {
			let totals = {
				for: 0,
				against: 0
			}
			console.log(data.message, 'votes !!')
			for (const vote of data.message.votes) {
				if (vote.vote_type == 1) {
					totals.for += Number(vote.value)
				} else {
					totals.against += Number(vote.value)
				}
			}
			setTotal(totals)
			setProposalData(data.message)
			console.log(totals, data.message, 'final additional details')
		}
	}

	useEffect(() => {
		searchPorposals(match.params.id)
	}, [])

	const getStateClassName = useCallback((name) => {
		let successStatus = ['Pending', 'Active', 'Succeeded', 'Queued', 'Executed']

		if (successStatus.includes(name)) {
			return 'prop-button-success'
		} else {
			return 'prop-button-danger'
		}
	}, [])

	const getStateName = useCallback((id) => {
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
	}, [])

	const v = proposalDetails.proposals?.[0]

	return (
		<div className='v2-governance'>
			<div className='row'>
				<div className='col-md-12'>
					<div className='d-flex pointer' onClick={() => history.goBack()}>
						<img src={require('../../assets/images/arrow-left.svg')} alt='' />{' '}
						<span className='caption-content ml-3'>All Proposals</span>
					</div>
				</div>

				<div className='col-md-12 shadow-card-2 mt-5'>
					<div className='row'>
						<div className='col-md-6 text-right'></div>
						<div className='col-md-6 text-right px-md-5 mt-3 mb-5'>
							<button
								className={getStateClassName(
									getStateName(proposalDetails.proposalStates?.[0])
								)}
							>
								{getStateName(proposalDetails.proposalStates?.[0])}
							</button>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6'>
							<p className='medium-font'>
								{
									proposalDetails.responses?.find(
										(val) => Number(v['id']) == Number(val.args['id'])
									)?.['args']?.[8]
								}
							</p>
							<p className='label-content'>
								Voting ended December 19, 2021, 12:47 AM GMT+5:30
							</p>
						</div>
						<div className='col-md-2'></div>
						<div className='col-md-4 px-md-5'>
							<div className='shadow-card px-5 py-4 my-3 d-flex justify-content-between'>
								<span className='caption-content'>For Vote:</span>
								<span className='label-content'>{total.for}</span>
							</div>
							<div className='shadow-card px-5 my-3 py-4 d-flex justify-content-between'>
								<span className='caption-content'>Against Vote:</span>
								<span className='label-content'>{total.against}</span>
							</div>
						</div>
					</div>

					<div className='row for-details'>
						<div className='col-md-12'>
							<div className='medium-font my-3'>Details</div>

							<p
								className='caption-content py-2'
								dangerouslySetInnerHTML={{
									__html: proposalData?.description
								}}
							></p>
						</div>
						<div className='col-md-12'>
							<div className='medium-font my-3'>Proposer</div>
							<p className='prop-link'>{v?.proposer}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateProposalDetails
