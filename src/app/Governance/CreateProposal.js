import React, { useState, useMemo, useEffect, useCallback } from 'react'
import cn from 'classnames'
import classNames from 'classnames/dedupe'
import swal from 'sweetalert'
import { encodeParameters, getCurrentuserAddress } from '../../redux/governance'
import { ethers } from 'ethers'
import { contractDetails } from '../sdk/ContractDetails'
import Navbar from '../Staking/Navbar'
import HomeFooter from '../home/HomeFooter'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { PopoverComp } from './Popover2'
import '../../app/App.scss'
import { NewProposalCard } from './NewProposalCard'

const { usm, comp: Comp, governorAlpha } = contractDetails

let infura_url = 'https://rinkeby.infura.io/v3/52dd17106cdf425dae9c43d6903aa12a'
let provider = null
if (typeof window.ethereum !== 'undefined') {
	provider = new ethers.providers.Web3Provider(window.ethereum)
}
const infuraProvider = new ethers.providers.JsonRpcProvider(infura_url)
// const backend_url = 'http://localhost:5000'
const backend_url = 'https://api.usdao.io/api'

const CreateProposal = () => {
	// New code starts from here
	//popover code ends
	const [activeType, setActiveType] = useState('Active Proposals')
	const [popovers, setPopovers] = useState({
		burn_fee: false,
		mint_fee: false,
		transfer_fee: false,
		a_mint_fee: false,
		a_burn_fee: false
	})

	const [searched, setSearched] = useState(false)

	const initialProposalData = {
		target: '0x585fcE75fC4F4cC2943AAD3B7726962190441bA1',
		value: '',
		signature: 'choose_sign',
		callDataArray: [],
		calldata_value: '',
		title: '',
		errors: { target: '', value: '', signature: '', title: '' }
	}

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

		loadFees(UsmContract)

		loadProposals(GovContract, current_block)
		console.log('***')

		// try {
		// 	const safe = await appsSdk.safe.getInfo()
		// 	console.log(safe, 'safe info')
		// } catch (error) {
		// 	console.log(error, 'err ?? safe app')
		// }

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

	useEffect(() => {
		fetchDelegateVotes()
		fetchTotalVotes()
		fetchDivider()
	}, [initialValues.network])

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

	const storeToDb = useCallback(async (proposals) => {
		const { data } = await axios.post(`${backend_url}/proposal`, { proposals })
	}, [])

	// const getDbProposals = async () => {
	// 	const { data } = await axios.get(`${backend_url}/proposal`)
	// 	const props = data.data[0].msg
	// 	const indexes = []
	// 	for (const p of props) {
	// 		indexes.push(p.id)
	// 	}
	// 	return indexes
	// }

	// States
	const [votes, setDelegatedVotes] = useState(0)
	const [delegateTo, setDelegateTo] = useState('')
	const [fees, setFees] = useState({})
	const [currentBlock, setCurrentBlock] = useState(0)
	const [proposalDetails, setProposalDetails] = useState({
		proposals: null,
		proposalStates: null,
		current_block: 0,
		responses: null
	})

	const [signatureValidation] = useState([
		{ name: 'changeMintFee(uint8,uint32)', inputs: ['uint8', 'uint32'] },
		{ name: 'changeBurnFee(uint8,uint32)', inputs: ['uint8', 'uint32'] },
		{ name: 'changeDefundFee(uint8,uint32)', inputs: ['uint8', 'uint32'] },
		{ name: 'changeTransferFee(uint8,uint32)', inputs: ['uint8', 'uint32'] },
		{
			name: 'changeTransactionTax(uint8,uint32)',
			inputs: ['uint8', 'uint32']
		},
		{ name: 'govFundPool()', inputs: [] },
		{ name: 'govDefundPool(uint256)', inputs: ['uint256'] }
	])

	const [targetState] = useState([
		{
			label: 'USM Contract',
			value: '0x585fcE75fC4F4cC2943AAD3B7726962190441bA1'
		}
		// {
		// 	label: 'FUM Contract',
		// 	value: '0x1601AFa9bbb5c44a2de23c22FB6762E9cE51A520'
		// },
		// {
		// 	label: 'Taxation Contract',
		// 	value: '0xbcE76bcF7ed85a3c474ff29796DeBae8343A6529'
		// },
		// {
		// 	label: 'Revenue Contract',
		// 	value: '0x58BFf61a44e6B903b1947618a3700dAd9861c2B1'
		// }
		// { name: 'Staking', value: '' }
	])
	// USM Contract
	// FUM Contract
	// Taxation Contract
	// Revenue Contract
	// Staking
	const [proposalForm, setProposalForm] = useState([
		{ ...initialProposalData, id: Math.random().toString() }
	])
	const [proposalLoading, setProposalLoading] = useState(0)

	const { burnFee, mintFee, transactionFee, transferFee, defundFee } =
		fees || {}
	// Ending states

	// Methods

	useEffect(() => {
		loadCurrentBlock()
	}, [proposalDetails.proposals])

	const loadCurrentBlock = async () => {
		const blockNumber = await infuraProvider.getBlockNumber()
		setCurrentBlock(blockNumber)
	}

	const loadProposals = async (GovContract, current_block) => {
		// const proposalCount = await getDbProposals()

		const proposals = await GovContract.proposalCount()
		const proposalCount = []
		const startNumber = Number(proposals) > 20 ? Number(proposals) - 20 : 1

		for (let i = startNumber; i <= Number(proposals); i++) {
			proposalCount.push(i)
		}
		console.log(Number(proposals), 'this is prosposals count')
		setProposalLoading(0)
		setProposalDetails({
			proposals: null,
			proposalStates: null,
			current_block: 0,
			responses: null
		})

		const proposalPromise = new Promise(async (resolve, reject) => {
			try {
				let _proposals = []

				let l = 1
				if (proposalCount.length > 0) {
					for (const i of proposalCount) {
						const data = await GovContract.proposals(i)
						_proposals.unshift(data)
						const perc = (l * 100) / proposalCount.length
						setProposalLoading(Math.ceil(perc))
						l++
					}
				}
				resolve(_proposals)
			} catch (error) {
				reject(error)
			}
		})

		const proposalStatePromise = new Promise(async (resolve, reject) => {
			try {
				let _proposalStates = []

				if (proposalCount.length > 0) {
					for (const i of proposalCount) {
						const resp = await GovContract.state(i)
						_proposalStates.unshift(resp)
					}
				}
				resolve(_proposalStates)
			} catch (error) {
				reject(error)
			}
		})

		const result = await Promise.all([proposalPromise, proposalStatePromise])

		const _proposals = result[0],
			_proposalStates = result[1]
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
			setProposalDetails({
				proposalStates: _proposalStates,
				proposals: _proposals,
				responses: uniqueResponse,
				current_block
			})
			let dbProposals = [],
				pInd = 0
			for (const p of _proposals) {
				dbProposals.unshift({
					id: Number(p['id']),
					status: getStateName(_proposalStates[pInd])
				})
				pInd++
			}
			storeToDb(dbProposals)
		}
	}

	const refreshSingleContract = async (
		contractNumber,
		skipIndexFind = false
	) => {
		const { GovContract } = await initialValues
		// let contractNumber
		// if (!skipIndexFind) {
		// 	contractNumber = proposalDetails.proposals.length - index
		// } else {
		// 	contractNumber = proposalDetails.proposals.length + 1
		// }
		// console.log(proposalDetails, 'check this before errro')
		const { proposals, responses } = proposalDetails
		if (
			proposals &&
			proposals.length > 0 &&
			responses &&
			responses.length > 0
		) {
			const proposal = await GovContract.proposals(contractNumber)
			const proposalState = await GovContract.state(contractNumber)

			const response = await GovContract.queryFilter(
				'ProposalCreated',
				Number(proposal['startBlock']) - 500,
				Number(proposal['endBlock'])
			)

			const uniqueResponse = [...proposalDetails.responses]
			for (const r of response) {
				const exist = uniqueResponse.find(
					(ur) => ur.blockNumber === r.blockNumber
				)
				if (!exist) {
					uniqueResponse.unshift(r)
				}
			}

			const _proposals = [...proposalDetails.proposals]
			const _proposalStates = [...proposalDetails.proposalStates]
			// const _uniqueResponse = [...proposalDetails.responses]
			const current_block = await infuraProvider.getBlockNumber()
			if (!skipIndexFind) {
			} else {
				_proposals.unshift(proposal)
				_proposalStates.unshift(proposalState)
			}

			setProposalDetails({
				proposalStates: _proposalStates,
				proposals: _proposals,
				responses: uniqueResponse,
				current_block
			})
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
			const proposalId = Number(proposal['id']),
				proposalStatus = status[proposalState]
			storeToDb([{ id: proposalId, status: proposalStatus }])
			if (status[proposalState] === 'Pending') {
				setTimeout(() => {
					refreshSingleContract(contractNumber, true)
				}, 30000)
			}
		}
	}

	const loadFees = async (contract) => {
		// return
		if (contract) {
			const burnFee = new Promise(async (resolve, reject) => {
				try {
					const data = await contract.USDAOBurnFee()

					resolve(ethers.utils.formatEther(data))
				} catch (error) {
					reject(error)
				}
			})
			const mintFee = new Promise(async (resolve, reject) => {
				try {
					const data = await contract.USDAOMintFee()
					resolve(ethers.utils.formatEther(data))
				} catch (error) {
					reject(error)
				}
			})
			const transferFee = new Promise(async (resolve, reject) => {
				try {
					const data = await contract.USDAOTransferFee()
					resolve(ethers.utils.formatEther(data))
				} catch (error) {
					reject(error)
				}
			})
			const transactionFee = new Promise(async (resolve, reject) => {
				try {
					// const data = await contract.fundFee()
					const data = await contract.USDAOTransferFee()
					resolve(ethers.utils.formatEther(data))
					// resolve(5)
				} catch (error) {
					reject(error)
				}
			})
			const defundFee = new Promise(async (resolve, reject) => {
				try {
					const data = await contract.ASSETBurnFee()
					resolve(ethers.utils.formatEther(data))
				} catch (error) {
					reject(error)
				}
			})

			const result = await Promise.all([
				burnFee,
				mintFee,
				transferFee,
				transactionFee,
				defundFee
			])
			const fetchedFees = {
				burnFee: result[0],
				mintFee: result[1],
				transferFee: result[2],
				transactionFee: 2,
				defundFee: result[4]
			}
			setFees(fetchedFees)
			return fetchedFees
		}
	}

	// Get Delegate votes
	const fetchDelegateVotes = async () => {
		try {
			const { CompContract, signer } = await initialValues
			const loggedInAddress = await signer.getAddress()

			const delegatedVotes = await CompContract.balanceOf(loggedInAddress)

			const divider = Number(await CompContract.totalSupply())

			console.log(divider, 'check divider out')

			setDelegatedVotes(Number(ethers.utils.formatEther(delegatedVotes)))
		} catch (error) {
			console.log(error, 'Error in fetching delegations network')
			swal('Please login into your metamask wallet !')
		}
	}

	const [totalVotes, setTotalVotes] = useState(0)

	const fetchTotalVotes = async () => {
		try {
			const { CompContract, signer } = await initialValues
			const loggedInAddress = await signer.getAddress()

			const delegatedVotes = await CompContract.getCurrentVotes(loggedInAddress)

			setTotalVotes(Number(ethers.utils.formatEther(delegatedVotes)))
		} catch (error) {
			console.log(error, 'Error in fetching delegations network')
			swal('Please login into your metamask wallet !')
		}
	}

	const [divider, setDivider] = useState(0)

	const fetchDivider = async () => {
		const { CompContract } = await initialValues
		const divider = Number(await CompContract.totalSupply())
		setDivider(divider)
	}

	const setDelegate = async () => {
		try {
			if (delegateTo) {
				const { CompContract } = await initialValues
				const delegateToaddress = ethers.utils.getAddress(delegateTo)

				window.compContract = CompContract
				let delegatecomp = await CompContract.delegate(delegateToaddress)
				if (delegatecomp) {
					setDisabledDeligate(true)
					swal(`Please wait as your request is being processed.`)
					provider
						.waitForTransaction(delegatecomp.hash)
						.then((result, error) => {
							setDisabledDeligate(false)
							if (result && result.status) {
								setDelegateTo('')
								swal(`Successfully Delegated ${delegateTo} !`)
							} else {
								swal(`Something went wrong, Please try again`)
							}
						})
				}
			} else {
				swal(`Please provide valid address`)
			}
		} catch (error) {
			swal('Something went wrong, please try again !')
		}
	}

	const voteProposal = async (
		contractId,
		approvalState,
		setDisabled,
		index
	) => {
		try {
			const { CompContract, signerAddress, GovContract } = await initialValues
			let delegatedVotes = await CompContract.getCurrentVotes(signerAddress)
			delegatedVotes = Number(ethers.utils.formatEther(delegatedVotes))

			if (delegatedVotes < 1)
				swal(
					`You don't have suffficient delegated votes to vote in a proposal `
				)

			let proposal

			try {
				proposal = await GovContract.castVote(contractId, approvalState)
				console.log(proposal, 'this is prop console for voting')
				if (proposal) {
					let { hash } = proposal
					setDisabled(true)
					swal(`Please wait as your request is being processed.`)

					const result = await provider.waitForTransaction(hash)

					setDisabled(false)

					if (result.status) {
						console.log(result, 'this is result console for voting', {
							user_hash: result.from,
							desc_id: Number(contractId),
							vote_type: approvalState ? 1 : 0,
							value: delegatedVotes
						})
						await axios.post(`${backend_url}/governance/add-votes`, {
							user_hash: result.from,
							desc_id: Number(contractId),
							vote_type: approvalState ? 1 : 0,
							value: delegatedVotes
						})
						swal(`Your transaction is successfull`)
						refreshSingleContract(contractId)
					} else swal(`Your transaction is failed`)
				}
			} catch (e) {
				if (e.code === 4001) return swal(`User denied transaction signature.`)
				if (String(e).includes('proposer votes below proposal threshold'))
					swal(`User dosen’t have enough tokens delegated to create a proposal`)
				else swal(`You have already voted for this Proposal.`)
				return
			}
		} catch (error) {
			swal('Something went wrong, please try again !')
		}
	}

	const queueProposal = async (id, setDisabledQueueBtn, index) => {
		try {
			const { GovContract } = await initialValues
			let queue
			try {
				queue = await GovContract.queue(id)
			} catch (e) {
				if (e.code === 4001) {
					return swal('User denied transaction.')
				}
				if (
					String(e).includes('proposal can only be queued if it is succeeded')
				) {
					return swal('You have already voted for this proposal.')
				}
			}
			if (queue) {
				setDisabledQueueBtn(true)
				swal(`Please wait as your request is being processed.`)
				const result = await provider.waitForTransaction(queue.hash)

				setDisabledQueueBtn(false)
				if (result) {
					swal(`Queued Successfully!`)
					refreshSingleContract(id)
				} else swal(`Please try again`)
			}
		} catch (error) {
			swal(`Something went wrong, please try again !`)
		}
	}

	const executeProposal = async (id, setDisabledExecuteBtn, index) => {
		try {
			const { GovContract } = await initialValues
			let executiongov
			try {
				executiongov = await GovContract.execute(id)
			} catch (e) {
				if (e.code === 4001) swal('User denied transaction signature.')
				else swal(`We request you to wait for a while to Execute.`)
			}
			if (executiongov) {
				setDisabledExecuteBtn(true)
				swal(`Please wait as your request is being processed.`)
				const result = await provider.waitForTransaction(executiongov.hash)

				setDisabledExecuteBtn(false)
				if (result) {
					swal(`Executed Successfully!`)
					refreshSingleContract(id)
				} else swal(`Please try again`)
			}
		} catch (error) {
			swal('Something went wrong, please try again !')
		}
	}

	// Ending methods

	// New code ends here
	const [blockNumber, setBlockNumber] = React.useState('')
	const [disabled, setDisabled] = useState(false)
	const [disabledDeligate, setDisabledDeligate] = useState(false)
	const [darkMode, setDarkMode] = useState(false),
		[show, setShow] = useState(false)

	const [description, setDescription] = useState({ error: '', value: '' })

	const [options] = useState([
		'uint256',
		'uint8',
		'uint32',
		'uint64',
		'uint128',
		'bool',
		'address',
		'bytes32',
		'string',
		'int256',
		'int8',
		'int32',
		'int64',
		'int128'
	])

	const handleInputs = (index, event, callIndex, forCall = false) => {
		const { value, name } = event.target

		const props = [...proposalForm]
		if (!forCall) {
			if (name === 'signature' && value === 'govFundPool()') {
				// let callLength = getSignatureLength(value),
				// 	callArray = []
				// for (let i = 0; i < callLength; i++) {
				// 	callArray.push({ ...emptyCallData, id: Math.random().toString() })
				// }
				// props[index].callDataArray = callArray
				props[index]['calldata_value'] = ''
			}
			if (name === 'signature' && value !== 'govFundPool()') {
				props[index].value = ''
			}
			props[index][name] = value
			if (value === '') {
				props[index].errors = {
					...props[index].errors,
					[name]: `Please enter a valid ${name !== 'value' ? name : ''} value !`
				}
			} else if (name === 'calldata_value') {
				const val = Number(value)
				if (
					props[index].signature === 'changeTransactionTax(uint8,uint32)' ||
					props[index].signature === 'changeDefundFee(uint8,uint32)'
				) {
					if (val < 0.5 || val > 10) {
						props[index].errors = {
							...props[index].errors,
							[name]: `Value should be between 0.5% to 10% !`
						}
					} else {
						props[index].errors = { ...props[index].errors, [name]: '' }
					}
				} else if (props[index].signature === 'govFundPool()') {
					props[index].errors = { ...props[index].errors, [name]: '' }
				} else {
					if (val > 0.5 || val < 0.0001) {
						props[index].errors = {
							...props[index].errors,
							[name]: `Value should be between 0.0001% to 0.5% !`
						}
					} else {
						props[index].errors = { ...props[index].errors, [name]: '' }
					}
				}
			} else {
				props[index].errors = { ...props[index].errors, [name]: '' }
			}
		} else {
			props[index].callDataArray[callIndex][name] = value
			if (value === '') {
				props[index].callDataArray[callIndex].errors = {
					...props[index].callDataArray[callIndex].errors,
					[name]: 'Please enter a valid value !'
				}
			} else {
				props[index].callDataArray[callIndex].errors = {
					...props[index].callDataArray[callIndex].errors,
					[name]: ''
				}
			}
		}
		setProposalForm(props)
	}

	const afterClickValidate = (
		index,
		callIndex,
		forCall = false,
		value,
		name
	) => {
		const props = [...proposalForm]
		if (!forCall) {
			if (value === '' || value === 'choose_target') {
				if (name === 'value') {
					if (props[index].signature === 'govFundPool()') {
						props[index].errors = {
							...props[index].errors,
							[name]: `Please enter a valid ${
								name !== 'value' ? name : 'ether'
							} value !`
						}
					}
				} else if (name === 'calldata_value') {
					const val = Number(value)
					if (
						props[index].signature === 'changeTransactionTax(uint8,uint32)' ||
						props[index].signature === 'changeDefundFee(uint8,uint32)'
					) {
						if (val > 10 || val < 0.5) {
							props[index].errors = {
								...props[index].errors,
								[name]: `Value should be between 0.5% to 10% !`
							}
						} else {
							props[index].errors = { ...props[index].errors, [name]: '' }
						}
					} else if (props[index].signature === 'govFundPool()') {
						props[index].errors = { ...props[index].errors, [name]: '' }
					} else {
						if (val > 0.5 || val < 0.0001) {
							props[index].errors = {
								...props[index].errors,
								[name]: `Value should be between 0.0001% to 0.5% !`
							}
						} else {
							props[index].errors = { ...props[index].errors, [name]: '' }
						}
					}
				} else {
					props[index].errors = {
						...props[index].errors,
						[name]: `Please enter a valid ${
							name !== 'value' ? name : 'ether'
						} value !`
					}
				}
			}
		} else {
			if (value === '' || value === 'choose_call_data') {
				props[index].callDataArray[callIndex].errors = {
					...props[index].callDataArray[callIndex].errors,
					[name]: `Please enter a valid ${
						name !== 'eth_price' ? name : ''
					} value !`
				}
			}
		}
		setProposalForm(props)
	}

	const singnatureFunction = [
		{ label: 'Change USDAO Mint Fee', value: 'changeMintFee(uint8,uint32)' },
		{ label: 'Change USDAO Burn Fee', value: 'changeBurnFee(uint8,uint32)' },
		{ label: 'Change Asset Burn Fee', value: 'changeDefundFee(uint8,uint32)' },
		{ label: 'Change Transfer Fee', value: 'changeTransferFee(uint8,uint32)' },
		{
			label: 'Change Asset Mint Fee',
			value: 'changeTransactionTax(uint8,uint32)'
		}
		// { label: 'Gov Fund Pool', value: 'govFundPool()' },
		// { label: 'Gov Defund Pool', value: 'govDefundPool(uint256)' }
	]

	const checkCallData = async () => {
		let error = false
		for (const field of proposalForm) {
			const callDatas = field.callDataArray
			const signature = field.signature
			const inputs = signatureValidation.find(
				(s) => s.name === signature
			)?.inputs

			if (inputs) {
				if (inputs.length > 0) {
					let str = ''
					for (const inp of inputs) {
						str += `${inp},`
					}
					if (inputs.length !== callDatas.length) {
						swal(`Calldata inputs not correct. Need : ${str}`)
						error = true
						// throw new Error('Calldata inputs not correct !')
					}
					let ind = 0
					for (const i of inputs) {
						const exist = callDatas[ind].calldata === inputs[ind]

						if (!exist) {
							swal(`Calldata inputs not correct. Need : ${str}`)
							error = true
							// throw new Error('Calldata inputs not correct')
						}
						ind++
					}
				}
			} else {
				error = true
				// throw new Error('Values not valid !')
			}
		}
		return error
	}

	const decimalToWhole = async (value) => {
		let index = 100
		const splitted = value.split('.')
		if (splitted[1]) {
			for (let i = 1; i <= splitted[1].length; i++) {
				console.log('dd')
				index = index * 10
			}
		}
		console.log(index, value * index, 'check decimal values')
		return [splitted[1] ? (value * index) / 100 : value, index]
		// {
		// 	index,
		// 	value: splitted[1] ? value * index : value
		// }
	}

	const createProposal = async () => {
		const userAddress = await getCurrentuserAddress
		const { CompContract, GovContract, signerAddress } = await initialValues

		const delegateDetails = await CompContract.delegates(userAddress)

		if (delegateDetails !== '0x0000000000000000000000000000000000000000') {
			let error = false,
				targets = [],
				values = [],
				signatures = [],
				callData = null,
				param_type = [],
				param_values = [],
				titles = []
			console.log(proposalForm, 'this is proposal form')
			for (const proposal of proposalForm) {
				const {
					target,
					value,
					signature,
					callDataArray,
					calldata_value,
					title
				} = proposal
				if (
					(value === '' && signature === 'govFundPool()') ||
					target === '' ||
					signature === '' ||
					signature === 'choose_sign' ||
					title === ''
				) {
					error = true
				}
				const val = Number(calldata_value)
				if (
					signature === 'changeTransactionTax(uint8,uint32)' ||
					signature === 'changeDefundFee(uint8,uint32)'
				) {
					if (val < 0.5 || val > 10) {
						error = true
					}
				} else if (signature === 'govFundPool()') {
				} else {
					if (val < 0.0001 || val > 0.5) {
						error = true
					}
				}
				// for (const c of callDataArray) {
				// 	const { eth_price, calldata } = c
				// 	if (eth_price === '' || calldata === 'choose_call_data') {
				// 		error = true
				// 	}
				// }
			}
			// if (description.value === '') {
			// 	console.log('error ai ?')
			// 	error = true
			// }

			if (error) {
				let propIndex = 0
				for (const proposal of proposalForm) {
					let callIndex = 0
					// for(const call of proposal.callDataArray) {
					// 	for(const cp in call) {
					// 		afterClickValidate(propIndex, callIndex, true, call[cp], cp)
					// 	}
					// 	callIndex += 1;
					// }
					for (const p in proposal) {
						afterClickValidate(propIndex, 0, false, proposal[p], p)
					}
					propIndex += 1
				}
				if (description.value === '') {
					setDescription({
						error: 'Please enter proper description',
						value: ''
					})
				}
				swal('Please enter proper data !')
				return
			}
			// 	const check = await checkCallData()
			// console.log(check , 'check')
			// if(check) {
			// return
			// }

			for (const proposal of proposalForm) {
				const {
					target,
					value,
					signature,
					callDataArray,
					calldata_value,
					title
				} = proposal
				// for (const c of callDataArray) {
				// 	const { eth_price, calldata } = c
				// 	param_type.push(calldata)
				// 	param_values.push(eth_price)
				// }
				if (signature !== 'govFundPool()') {
					param_type = signatureValidation.find(
						(s) => s.name === signature
					).inputs
					param_values = await decimalToWhole(calldata_value)
				}

				targets.push(target)
				signatures.push(signature)
				values.push(ethers.utils.parseEther(String(value ? value : 0)))
				titles = title
			}
			// return
			callData = [encodeParameters(param_type, param_values)]

			let delegatedVotes = await CompContract.getCurrentVotes(signerAddress)

			delegatedVotes = Number(ethers.utils.formatEther(delegatedVotes))

			if (delegatedVotes < 100000) {
				swal(`You don't have suffficient delegated votes to create proposal `)
				return
			}

			let proposal
			try {
				proposal = await GovContract.propose(
					targets,
					values,
					signatures,
					callData,
					titles
				)
			} catch (e) {
				console.log(e, 'whats the error ?')
				if (String(e).includes('found an already active proposal')) {
					return swal(`Found already active proposal`)
				}
				if (
					String(e).includes(
						'Error Occured ! cannot estimate gas; transaction may fail or may require manual gas limit (error={"code":-32603,'
					)
				) {
					return swal(`Something went wrong!`)
				}
				if (String(e).includes('proposer votes below proposal threshold')) {
					return swal(
						`User dosen’t have enough tokens delegated to create a proposal`
					)
				}
				if (e.code === 4001) {
					return swal(`User denied Transactions.`)
				} else {
					return swal(`Error Occured ! Execution Failed`)
				}
			}

			if (proposal) {
				setDisabled(true)
				swal(`Please wait as your request is being processed.`)
				const result = await provider.waitForTransaction(proposal.hash)
				setDisabled(false)
				if (result.status) {
					swal(`Proposal Created Successfully!`)
					let { logs = [] } = result,
						data = logs[0].data,
						id = data.substring(2, 66)
					id = parseInt(id, 16)
					console.log(id, 'is this prop id ??')
					await axios.post(`${backend_url}/governance/create-desc`, {
						description,
						desc_id: id
					})

					setProposalForm([
						{ ...initialProposalData, id: Math.random().toString() }
					])
					setDescription({
						value: '',
						error: ''
					})

					const idCount = await GovContract.proposalCount()
					refreshSingleContract(Number(idCount), true)
				} else {
					swal(`Your proposal is failed`)
				}
			}
		} else {
			swal(`Please delegate this address before creating proposal !`)
		}
	}

	const [search, setSearch] = useState({ id: '', address: '' })
	const [searchedProposals, setSearchedProposals] = useState({
		proposals: null,
		proposalStates: null,
		current_block: 0,
		responses: null
	})

	const handleDescription = (value) => {
		setDescription(value)
	}

	const searchPorposals = async (type) => {
		const { GovContract, current_block } = await initialValues
		let result = [],
			number = null
		if (type === 'id') {
			result = await GovContract.proposals(search.id)
			number = search.id
		} else if (type === 'address') {
			result = await GovContract.latestProposalIds(search.address)
			console.log(Number(result), 'hex value')
			number = Number(result)
			result = await GovContract.proposals(number)
			console.log(result, 'this is address search result')
		}
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
			// setSearchedProposals({
			// 	proposalStates: _proposalStates,
			// 	proposals: _proposals,
			// 	responses: uniqueResponse,
			// 	current_block
			// })

			setProposalDetails({
				proposalStates: _proposalStates,
				proposals: _proposals,
				responses: uniqueResponse,
				current_block
			})
		}
	}

	return (
		<div className={classNames('', { dark: darkMode })}>
			<div className='create-proposal-wrap'>
				<Navbar
					moduleName='Governance'
					show_portfolio={false}
					show={show}
					setShow={setShow}
					mode={darkMode}
					setmode={setDarkMode}
				/>
				<div className='gov-banner'>
					<div className='gov'>
						<img
							alt='#'
							src={require('../../assets/images/governanceCover.png')}
						/>
						<div className='img-content'>
							<h1>USDAO Governance</h1>
							<p>
								DAOGOV tokens represent voting shares in USDAO governance. You
								can vote on each proposal yourself or delegate your votes to a
								third party.
							</p>
							<a
								target='_blank'
								href='https://docs.usdao.io/docs/decentralized-governance/usdao-governance-protocol'
							>
								Read more about USDAO Governance
							</a>
						</div>
					</div>
				</div>
				<div
					className='container-fluid position-relative '
					style={{ paddingTop: '70px' }}
				>
					<div
						className='col-12 col-md-10 ml-auto mr-auto mt-5 pt-5 pl-5 pr-5 pb-5 recent__proposals'
						style={{ border: '1px solid whitesmoke', borderRadius: '1rem' }}
					>
						<div className='form-group'>
							<div className='col-md-6 d-flex'>
								<div>
									<label style={{ fontSize: '1.5rem' }}>DELEGATE</label>
								</div>
								<div className='mt-auto mb-auto'>
									<PopoverComp
										content='Delegate your votes to your self or any third party'
										margin={true}
									/>
								</div>
							</div>

							<div className='col-12 mt-3'></div>
							<div className='col-12'>
								<div className='row'>
									<div className='col-12 col-md-8 p-0 m-auto'>
										<div className='contact__input'>
											<input
												type='text'
												className='form-control'
												name='deleteTo'
												onChange={(e) => setDelegateTo(e.target.value)}
												placeholder='Provide address you want to delegate your votes'
												value={delegateTo}
											/>
										</div>
									</div>
									<div className='col-12 col-md-4 delegate'>
										<a
											className={cn(
												'btn btn-primary btn-round text-white navbar__button1',
												disabledDeligate && 'disabled'
											)}
											onClick={setDelegate}
										>
											Submit
										</a>
									</div>
								</div>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<PopoverComp content='The amount of GovDAO tokens available in this account.' />
								<h5 className='mt-3'>Your Votes : {votes}</h5>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<PopoverComp content='Tokens that are delegated to address by other accounts.' />
								<h5 className='mt-3'>Delegated Votes : {totalVotes}</h5>
							</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<PopoverComp content='The total voting power you possess.' />
								<h5 className='mt-3'>
									Total Voting Power :{' '}
									{((totalVotes / (divider / 10e17)) * 100).toFixed(4)} %
								</h5>
							</div>
						</div>
					</div>

					<div
						className='col-12 col-md-10 ml-auto mr-auto mt-5 pt-5 pl-5 pr-5 pb-5 recent__proposals'
						style={{ border: '1px solid whitesmoke', borderRadius: '1rem' }}
					>
						<div className='d-flex justify-content-between  flex-wrap'>
							<div className='col-md-12 mb-3'>
								<div className='row'>
									<div className='col-md-6'>
										<h3>Create A Proposal</h3>
									</div>
									<div className='col-md-6 text-right'>
										<div className='ml-2'>
											<span className='refresh-text'>Refresh : </span>
											<img
												src='/assets/refresh.png'
												style={{ cursor: 'pointer' }}
												onClick={async () => {
													const contract = (await initialValues).UsmContract
													loadFees(contract)
												}}
											/>
										</div>
									</div>
								</div>
							</div>
							<div
								className='col-12 col-md-2 p-0 d-flex flex-column mb-2'
								style={{ position: 'relative' }}
							>
								<a
									className='btn btn-primary btn-round text-white navbar__button1 d-flex flex-column justify-content-center align-items-center'
									style={{ fontSize: '12px', height: '70px' }}
								>
									USDAO Burn Fee : {burnFee && Number(burnFee) * 100 + '%'}
									<PopoverComp content='This is the current fee that is being charged while selling USDAO.' />
								</a>
							</div>
							<div className='col-12 col-md-2 p-0 d-flex flex-column mb-2'>
								<a
									className='btn btn-primary btn-round text-white navbar__button1 d-flex flex-column justify-content-center align-items-center'
									style={{ fontSize: '12px', height: '70px' }}
								>
									USDAO Mint Fee : {mintFee && Number(mintFee) * 100 + '%'}
									<PopoverComp content='This is the current fee that is being charged while buying USDAO.' />
								</a>
							</div>
							<div className='col-12 col-md-2 p-0 d-flex flex-column mb-2'>
								<a
									className='btn btn-primary btn-round text-white navbar__button1 d-flex flex-column justify-content-center align-items-center'
									style={{ fontSize: '12px', height: '70px' }}
								>
									USDAO Transfer Fee :{' '}
									{transferFee && Number(transferFee) * 100 + '%'}
									<PopoverComp content='This is the fee that is being charged when transferring USDAO between accounts.' />
								</a>
							</div>
							<div className='col-12 col-md-2 p-0 d-flex flex-column mb-2'>
								<a
									className='btn btn-primary btn-round text-white navbar__button1 d-flex flex-column justify-content-center align-items-center'
									style={{ fontSize: '12px', height: '70px' }}
								>
									ASSET Mint Fee :{' '}
									{transactionFee && Number(transactionFee) + '%'}
									<PopoverComp content='This is the current fee that is being charged while buying ASSET token.' />
								</a>
							</div>
							<div className='col-12 col-md-2 p-0 d-flex flex-column mb-2'>
								<a
									className='btn btn-primary btn-round text-white navbar__button1 d-flex flex-column justify-content-center align-items-center'
									style={{ fontSize: '12px', height: '70px' }}
								>
									ASSET Burn Fee : {defundFee && Number(defundFee) * 100 + '%'}
									<PopoverComp content='This is the current fee that is being charged while selling ASSET token.' />
								</a>
							</div>
						</div>
						{proposalForm.map((proposal, index) => (
							<div className='form-group my-5' key={proposal.id}>
								{index > 0 && <hr />}
								<div className='row'>
									<div className='col-md-12'>
										<div className='form-group'>
											<label>Proposal Title</label>
											<input
												type='text'
												placeholder='Proposal Title'
												className='form-control custom-governance-input my-2'
												onChange={(e) => handleInputs(index, e)}
												name='title'
												value={proposal.title}
											/>
											{proposal.errors.title && (
												<div className='inline-errormsg text-danger'>
													{proposal.errors.title}
												</div>
											)}
										</div>
										<div className='form-group'>
											<label>Target</label>
											<PopoverComp
												content='This is contract address of the signature function'
												margin={true}
											/>
											<select
												name='target'
												id=''
												className='form-control custom-governance-input'
												value={proposal.target}
												onChange={(e) => handleInputs(index, e)}
											>
												{/* <option value='choose_target'>Choose Target</option> */}
												{targetState.map((o) => (
													<option value={o.value} key={o.value}>
														{o.label}
													</option>
												))}
											</select>
											{proposal.errors.target && (
												<div className='inline-errormsg text-danger'>
													{proposal.errors.target}
												</div>
											)}
										</div>

										<div className='form-group'>
											<div className='row'>
												<div className='col-md-6'>
													<label>Signature</label>
													<PopoverComp
														content='This is the parameter you want change'
														margin={true}
													/>
													<select
														name='signature'
														id=''
														className='form-control custom-governance-input'
														value={proposal.signature}
														onChange={(e) => handleInputs(index, e)}
													>
														<option value='choose_sign'>
															Choose Signature
														</option>
														{singnatureFunction.map((o) => (
															<option value={o.value} key={o.value}>
																{o.label}
															</option>
														))}
													</select>
												</div>
												<div className='col-md-6'>
													<label>Call Data</label>
													<PopoverComp
														content='Provide the % you want to change the Fee to.'
														margin={true}
													/>
													<input
														type='text'
														placeholder='Call Data Value'
														className='form-control custom-governance-input'
														value={proposal.calldata_value}
														name='calldata_value'
														onChange={(e) => handleInputs(index, e)}
														disabled={
															proposal.signature === 'choose_sign' ||
															proposal.signature === 'govFundPool()'
														}
													/>
													{proposal.errors.calldata_value && (
														<div className='inline-errormsg text-danger'>
															{proposal.errors.calldata_value}
														</div>
													)}
												</div>
											</div>
										</div>
										<div className='form-group'>
											<label>Description</label>
											<ReactQuill
												name='description'
												className='description-c'
												onChange={handleDescription}
											/>
											{/* {proposal.errors.title && (
												<div className='inline-errormsg text-danger'>
													{proposal.errors.title}
												</div>
											)} */}
										</div>
										{proposal.signature === 'govFundPool()' && (
											<div className='form-group'>
												<label>Enter Amount in ethers</label>
												<input
													type='text'
													placeholder='Value in ethers'
													className='form-control custom-governance-input my-2'
													value={proposal.value}
													name='value'
													onChange={(e) => handleInputs(index, e)}
												/>
												{proposal.errors.value && (
													<div className='inline-errormsg text-danger'>
														{proposal.errors.value}
													</div>
												)}
											</div>
										)}

										{index > 0 && (
											<button
												type='button'
												className='navbar__button2'
												onClick={() => {
													const propForm = [...proposalForm]
													propForm.splice(index, 1)
													setProposalForm(propForm)
												}}
											>
												Remove Current Proposal
											</button>
										)}
									</div>
								</div>
							</div>
						))}
						<div className='row mt-5'>
							<div className='col-md-3 mt-2'>
								<button
									type='button'
									className='navbar__button2'
									disabled={disabled}
									onClick={createProposal}
								>
									Create Proposal
								</button>
							</div>
							<div className='col-md-3 mt-2'></div>
							<div className='col-md-6'></div>
						</div>
					</div>
				</div>
				<div className='pt-5 pb-5'>
					{/* New Proposal card for governance */}

					<div className='row'>
						<div className='col-md-10 offset-md-1'>
							<div
								style={{
									borderRadius: '0.8rem'
								}}
								className='p-5 recent__proposals'
							>
								<div className='row'>
									<div className='col-md-3 m-auto pt-3'>
										<h4>Proposals</h4>
									</div>
									<div className='col-md-6 d-flex justify-content-center align-items-center text-right'>
										{(proposalDetails.proposals?.length >= 19 || searched) && (
											<>
												<input
													type='text'
													className='py-1 px-3 mx-1 prop_black_input'
													placeholder='Search By Id'
													style={{
														boxShadow: 'rgb(100 100 111 / 20%) 0px 7px 29px 0px'
													}}
													onChange={(e) =>
														setSearch({
															...search,
															id: e.target.value,
															address: ''
														})
													}
													value={search.id}
													onKeyDown={(e) => {
														console.log(e, 'ceck', e.code, e.key, e.keyCode)
														if (e.key === 'Enter') {
															searchPorposals('id')
															setSearched(true)
														}
													}}
												/>
												<input
													type='text'
													className='py-1 px-3 mx-1 prop_black_input'
													placeholder='Search By Address'
													style={{
														boxShadow: 'rgb(100 100 111 / 20%) 0px 7px 29px 0px'
													}}
													value={search.address}
													onChange={(e) =>
														setSearch({
															...search,
															address: e.target.value,
															id: ''
														})
													}
													onKeyDown={(e) => {
														if (e.key === 'Enter') {
															searchPorposals('address')
															setSearched(true)
														}
													}}
												/>
											</>
										)}
									</div>
									<div className='col-md-3 text-right'>
										{/* <h3>Refresh Proposals</h3> */}
										<button
											className='py-1 px-4 navbar__button2'
											style={{
												border: '1px solid whitesmoke',
												borderRadius: 6,
												color: 'white'
											}}
											onClick={async () => {
												const { GovContract } = await initialValues
												loadProposals(GovContract, currentBlock)
											}}
										>
											Refresh Proposals
										</button>
									</div>
								</div>
								{!proposalDetails.proposals && proposalLoading ? (
									<div className='col-md-12 loading'>
										{' '}
										<h5 style={{ color: 'black' }}>
											Loading ..... {proposalLoading} %
										</h5>
									</div>
								) : (
									<div className='col-md-12 loading'>
										{/* <h3>No Proposals to show !</h3> */}
									</div>
								)}
								<div style={{ maxHeight: '30rem', overflowY: 'scroll' }}>
									{proposalDetails.proposals &&
										proposalDetails.proposals.length > 0 &&
										proposalDetails.proposals.map((v, i) => {
											return (
												<div
													key={Number(v['endBlock'])}
													className='col-12 p-0 px-3 mt-3 pb-3 proposal__item'
												>
													<NewProposalCard
														uniqueResponse={proposalDetails.responses}
														value={v}
														proposalsState={proposalDetails.proposalStates}
														index={i}
														voteProposal={voteProposal}
														executeProposal={executeProposal}
														queueProposal={queueProposal}
														blockNumber={blockNumber}
														backend_url={backend_url}
													/>
												</div>
											)
										})}
								</div>
							</div>
						</div>
					</div>
					{/*  */}
				</div>
				<HomeFooter />
			</div>
		</div>
	)
}

export default CreateProposal
