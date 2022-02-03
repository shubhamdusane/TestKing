import React from 'react'
import AppLayout from '../HOC/Layout'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	compContractSelector,
	govAlphaContractSelector,
	usmContractSelector,
	metamaskGOVSelector,
	metamaskCOMPSelector,
	metamaskUSMSelector,
	allProposalsSelector,
	proposalsStateSelector,
	webContractSelector,
	etherBalanceSelector
} from '../../redux/selectors'
import { loadNetwork } from '../../redux/governance'
import ProposalCardOne from '../Governance/ProposalCardOne'

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
	},
	{
		name: 'Dashboard',
		customClass: '',
		isLink: true
	},
	{
		name: 'Governance',
		customClass: '',
		isLink: true
	},
	{
		name: 'Staking',
		customClass: '',
		isLink: true
	},
	{
		name: 'LaunchPads',
		customClass: '',
		isLink: true
	}
]

const GovernanceBody = ({
	dispatch,
	history,
	govAlphaContract,
	usmContract,
	metamaskCOMP,
	metamaskGOV,
	allProposals,
	proposalsState,
	web
}) => {
	React.useEffect(() => {
		connectMetamask()
		// console.log(window.ethereum.currentProvider, 'hi hello');
	}, [allProposals])

	const connectMetamask = () => {
		// loadMetamask(dispatch)
		loadNetwork(dispatch)
	}

	return (
		<>
			<AppLayout sideBarConfig={sideBarConfig} moduleName='Governance'>
				<div className='card-body'>
					<div className='card-content'>
						<div className='card-content-wrap'>
							<div class='img-wrapper'>
								<img
									alt='#'
									src={require('../../assets/images/governanceCover.png')}
								/>
								<div class='img-content'>
									<h1>USDAO Governance</h1>
									<p>
										USDAO tokens represent token shares in USDAO governance. You
										can vote on each proposal yourself or delegate your vote to
										a third party.
									</p>
									<a>Read more about USDAO Governance</a>
								</div>
							</div>
							<div className='proposal-wrapper'>
								<div className='proposal-content'>
									<div className='proposal-header'>
										<h2>All Proposal</h2>
										<button
											type='button'
											className='btn btn-primary btn-rounded navbar__button ml-3'
										>
											<Link to='/create-proposal'>Create Proposal</Link>
										</button>
									</div>
									<div className='card-wrap'>
										{allProposals &&
											allProposals.length > 0 &&
											allProposals.map((val, key) => (
												<ProposalCardOne
													v={val}
													proposalsState={proposalsState}
													i={key}
												/>
											))}
										{!allProposals && (
											<div className='col-md-12 loading'>
												{' '}
												<h3>Loading .....</h3>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</AppLayout>
		</>
	)
}

const mapStateToProps = (state) => {
	const compContract = compContractSelector(state)
	const govAlphaContract = govAlphaContractSelector(state)
	const usmContract = usmContractSelector(state)

	const metamaskUSM = metamaskUSMSelector(state)
	const metamaskCOMP = metamaskCOMPSelector(state)
	const metamaskGOV = metamaskGOVSelector(state)
	const allProposals = allProposalsSelector(state)
	const proposalsState = proposalsStateSelector(state)
	const web = webContractSelector(state)
	const ether_balance = etherBalanceSelector(state)
	return {
		compContract,
		govAlphaContract,
		usmContract,
		metamaskUSM,
		metamaskCOMP,
		metamaskGOV,
		allProposals,
		proposalsState,
		ether_balance,
		web
	}
}

const memoReactProposal = connect(mapStateToProps)(GovernanceBody)
export default React.memo(memoReactProposal)
// export default GovernanceBody
