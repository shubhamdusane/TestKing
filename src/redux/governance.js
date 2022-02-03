import { ethers } from 'ethers'
import {
	networkLoaded,
	compLoaded,
	govAlphaLoaded,
	govLoaded,
	usmLoaded,
	metamaskError,
	etherBalanceLoaded,
	metamaskLoaded,
	allProposalsLoaded,
	proposalStateLoaded
} from './actions'
import web3 from 'web3'
import Swal from 'sweetalert2'
import swal from 'sweetalert'
import { contractDetails } from '../app/sdk/ContractDetails'

const { comp: Comp, governorAlpha, usm } = contractDetails

let INFURA_URL = 'https://rinkeby.infura.io/v3/b001cbdee80c4e52806e2e072e601ce4'

let dev = false
if (dev) {
	INFURA_URL = 'http://127.0.0.1:7545'
}

export const loadNetwork = async (dispatch) => {
	//const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/5290fb172fa744018c26c3af1f4ffab8`)
	const provider = new ethers.providers.JsonRpcProvider(INFURA_URL)

	const network = await provider.getNetwork()

	dispatch(networkLoaded(provider))
	loadComp(dispatch, provider)
	loadGovAlpha(dispatch, provider)
	loadUSM(dispatch, provider)
	loadetherBalance(dispatch, provider)
}

export const loadComp = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = Comp.abi
	const address = Comp.address[network.chainId]
	//var signer = provider.getSigner();
	const compContract = new ethers.Contract(address, abi, provider)
	//const compContractWithSigner = compContract.connect(signer);
	dispatch(compLoaded(compContract))
	return compContract
}

export const loadGovAlpha = async (dispatch, provider) => {
	await window.ethereum.enable()
	const provider1 = await new ethers.providers.Web3Provider(window.ethereum)
	const signer1 = await provider1.getSigner()
	const network1 = await provider1.getNetwork()
	const address1 = governorAlpha.address[network1.chainId]

	//load USM with Metamask
	const network = await provider.getNetwork()
	const abi = governorAlpha.abi
	const address = governorAlpha.address[network.chainId]
	//var signer = provider.getSigner();
	const govContract = new ethers.Contract(address1, abi, signer1)
	const govAlphaContract = new ethers.Contract(address, abi, provider)
	loadProposals(dispatch, govAlphaContract)
	dispatch(govAlphaLoaded(govAlphaContract))
	dispatch(govLoaded(govContract))
}

export const loadUSM = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]
	//var signer = provider.getSigner();
	const usmContract = new ethers.Contract(address, abi, provider)
	dispatch(usmLoaded(usmContract))
}

export const loadMetamask = async (dispatch, provider2) => {
	try {
		const provider = await new ethers.providers.Web3Provider(provider2)
		const signer = await provider.getSigner()
		const network = await provider.getNetwork()

		//load contracts with Metamask
		const usmAbi = usm.abi
		const usmAddress = usm.address[network.chainId]
		const usmContract = new ethers.Contract(usmAddress, usmAbi, signer)

		const governorAlphaAbi = governorAlpha.abi
		const governorAlphaAbiAddress = governorAlpha.address[network.chainId]
		const govAlphaContract = new ethers.Contract(
			governorAlphaAbiAddress,
			governorAlphaAbi,
			signer
		)

		const compAbi = Comp.abi
		const compAddress = Comp.address[network.chainId]
		const compContract = new ethers.Contract(compAddress, compAbi, signer)

		dispatch(
			metamaskLoaded(
				provider,
				signer,
				compContract,
				govAlphaContract,
				usmContract
			)
		)
	} catch (e) {
		dispatch(metamaskError(e))
		return false, false
	}
}

export const getCurrentuserAddress = new Promise((resolve, reject) => {
	var myWeb3 = new web3(window.web3 && window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			// console.log(err);
		} else {
			resolve(accounts && accounts[0])
		}
	})
})

export const loadetherBalance = async (dispatch, provider) => {
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			// console.log(err);
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}
			const balacne = await myWeb3.eth.getBalance(accounts[0])

			dispatch(etherBalanceLoaded(myWeb3.utils.fromWei(balacne, 'ether')))
		}
	})
}

export const loadDAOBalance = async (dispatch, provider) => {
	var myWeb3 = new web3(window.web3.currentProvider)
	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}
			const balacne = await myWeb3.eth.getBalance(accounts[0])
			dispatch(etherBalanceLoaded(myWeb3.utils.fromWei(balacne, 'ether')))
		}
	})
}

export const delegateComp = async (
	metamaskCOMP,
	delegateTo,
	setDisabledDeligate
) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)

	const network = await provider.getNetwork()
	const signer = await provider.getSigner()
	const delegateToaddress = ethers.utils.getAddress(delegateTo)
	const abi = metamaskCOMP.abi
	const address = metamaskCOMP.address[network.chainId]
	const compContract = new ethers.Contract(address, abi, signer)
	window.compContract = compContract
	let delegatecomp
	try {
		delegatecomp = await compContract.delegate(delegateToaddress)
	} catch (e) {
		swal(`Error occured!`)
	}
	if (delegatecomp) {
		setDisabledDeligate(true)
		swal(`Please wait as your request is being processed.`)
		provider.waitForTransaction(delegatecomp.hash).then((result, error) => {
			setDisabledDeligate(false)
			if (result.status) {
				swal(`Successfully Delegated ${delegateTo} !`)
			} else {
				swal(`Please try again`)
			}
		})
	} else {
	}
	return delegatecomp
}

export const loadProposals = async (dispatch, govContract) => {
	const proposals = await govContract.proposalCount()
	let proposal_promise = []
	let proposal_state = []
	if (Number(proposals) > 0) {
		for (let i = 1; i <= Number(proposals); i++) {
			proposal_promise.push(await getProposalsByIndex(govContract, i))
		}
	}
	if (Number(proposals) > 0) {
		for (let i = 1; i <= Number(proposals); i++) {
			proposal_state.push(await proposalState(govContract, i))
		}
	}
	dispatch(proposalStateLoaded(proposal_state))
	dispatch(allProposalsLoaded(proposal_promise))
}

export const createProposal = async (
	dispatch,
	targets,
	values,
	signatures,
	calldatas,
	description,
	metamaskGov,
	govAlphaContract,
	setDisabled
) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)

	const network = await provider.getNetwork()
	const signer = await provider.getSigner()
	const abi = metamaskGov.abi
	const address = metamaskGov.address[network.chainId]
	const abiComp = Comp.abi
	const addressComp = Comp.address[network.chainId]
	const governorAlphaContract = new ethers.Contract(address, abi, signer)
	const CompContract = new ethers.Contract(addressComp, abiComp, signer)
	const loggedInAddress = await signer.getAddress()
	var delegatedVotes = await CompContract.getCurrentVotes(loggedInAddress)
	delegatedVotes = Number(ethers.utils.formatEther(delegatedVotes))
	if (delegatedVotes < 100000) {
		return swal(
			`You don't have suffficient delegated votes to create proposal `
		)
	}
	// const gasLimit = await governorAlphaContract.estimateGas.propose(targets, values, signatures, calldatas, description);
	// const gasPrice = await provider.getGasPrice();
	let proposal
	try {
		proposal = await governorAlphaContract.propose(
			targets,
			values,
			signatures,
			calldatas,
			description
		)
	} catch (e) {
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
		// .then((result, error)=>{
		setDisabled(false)
		if (result.status) {
			loadProposals(dispatch, governorAlphaContract)
			swal(`Proposal Created Successfully!`)
			return proposal
		} else {
			swal(`Your proposal is failed`)
		}
		// })
	}
}

export const encodeParameters = (types, values) => {
	const abi = new ethers.utils.AbiCoder()
	return abi.encode(types, values)
}

export const getProposalsByIndex = async (govAlphaContract, proposalIndex) => {
	return await govAlphaContract.proposals(proposalIndex)
}

export const proposalState = async (govAlphaContract, proposalIndex) => {
	return await govAlphaContract.state(proposalIndex)
}

export const voteProposal = async (
	govAlphaContract,
	id,
	approval,
	setDisabled
) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const signer = await provider.getSigner()
	const abiComp = Comp.abi
	const addressComp = Comp.address[network.chainId]
	const CompContract = new ethers.Contract(addressComp, abiComp, signer)
	const loggedInAddress = await signer.getAddress()
	var delegatedVotes = await CompContract.getCurrentVotes(loggedInAddress)
	delegatedVotes = Number(ethers.utils.formatEther(delegatedVotes))
	if (delegatedVotes < 1) {
		return swal(
			`You don't have suffficient delegated votes to vote in a proposal `
		)
	}
	let proposal

	try {
		proposal = await govAlphaContract.castVote(id, approval)
		if (proposal) {
			let { hash } = proposal
			setDisabled(true)
			swal(`Please wait as your request is being processed.`)
			// check transaction
			const mProviderInner = new ethers.providers.Web3Provider(window.ethereum)
			mProviderInner
				.waitForTransaction(hash)
				.then((result) => {
					setDisabled(false)
					if (result.status) {
						swal(`Your transaction is successfull`)
					} else {
						swal(`Your transaction is failed`)
					}
				})
				.catch((e) => {
					console.log('Transaction error-----------', e)
				})
		}
	} catch (e) {
		if (e.code === 4001) {
			return swal(`User denied transaction signature.`)
		}
		if (String(e).includes('proposer votes below proposal threshold')) {
			return swal(
				`User dosen’t have enough tokens delegated to create a proposal`
			)
		} else {
			return swal(`You have already voted for this Proposal.`)
		}
	}
	return proposal
}

export const currentVotes = async (setDelegatedVotes) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const signer = await provider.getSigner()
	const abiComp = Comp.abi
	const addressComp = Comp.address[network.chainId]
	const CompContract = new ethers.Contract(addressComp, abiComp, signer)
	const loggedInAddress = await signer.getAddress()
	var delegatedVotes = await CompContract.getCurrentVotes(loggedInAddress)
	delegatedVotes = Number(ethers.utils.formatEther(delegatedVotes))
	// console.log(await CompContract.delegates(loggedInAddress))
	setDelegatedVotes(delegatedVotes)
}

export const queueProposal = async (
	govAlphaContract,
	id,
	setDisabledQueueBtn
) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	let queue
	try {
		queue = await govAlphaContract.queue(id)
	} catch (e) {
		if (e.code === 4001) {
			return swal('User denied transaction.')
		}
		if (String(e).includes('proposal can only be queued if it is succeeded')) {
			return swal('You have already voted for this proposal.')
		}
	}
	if (queue) {
		setDisabledQueueBtn(true)
		swal(`Please wait as your request is being processed.`)
		provider.waitForTransaction(queue.hash).then((result, error) => {
			setDisabledQueueBtn(false)
			if (result) {
				swal(`Queued Successfully!`)
			} else {
				swal(`Please try again`)
			}
		})
	}
}

export const executionGov = async (
	govAlphaContract,
	id,
	setDisabledExecuteBtn
) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	let executiongov
	try {
		executiongov = await govAlphaContract.execute(id)
	} catch (e) {
		if (e.code === 4001) {
			swal('User denied transaction signature.')
		} else {
			swal(`We request you to wait for a while to Execute.`)
		}
	}
	if (executiongov) {
		setDisabledExecuteBtn(true)
		swal(`Please wait as your request is being processed.`)
		provider.waitForTransaction(executiongov.hash).then((result, error) => {
			setDisabledExecuteBtn(false)
			if (result) {
				swal(`Executed Successfully!`)
			} else {
				swal(`Please try again`)
			}
		})
	}
	return
}

export const getReceipt = async (govAlphaContract, id, user_address) => {
	return await govAlphaContract.getReceipt(id, user_address)
}

export const check_change_BURN_FEE = async (usm, ether_balance) => {
	var data = await usm.burnFee()
	data = ethers.utils.formatEther(data)
	return data
}

export const check_change_MINT_FEE = async (usm, ether_balance) => {
	var data = await usm.mintFee()
	data = ethers.utils.formatEther(data)
	return data
}

export const check_change_TRANSFER_FEE = async (usm, ether_balance) => {
	var data = await usm.transferFee()
	data = ethers.utils.formatEther(data)
	return data
}

export const check_change_TRANSACTION_TAX = async (usm, ether_balance) => {
	var data = await usm.transactionTax()
	data = ethers.utils.formatEther(data)
	return data
}

export const check_change_DEFUND_FEE = async (usm, ether_balance) => {
	var data = await usm.defundFee()
	data = ethers.utils.formatEther(data)
	return data
}

export const getCurrentBlockNumber = async () => {
	const provider = new ethers.providers.JsonRpcProvider(INFURA_URL)
	const current_block = await provider.getBlockNumber()
	return current_block
}

export const contract = async (govContract, v) => {
	return await govContract.queryFilter(
		'ProposalCreated',
		Number(v['startBlock']) - 500,
		Number(v['endBlock'])
	)
}
