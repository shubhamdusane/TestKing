import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Spinner from '../app/shared/Spinner'
// import Index from './home/Index'
import ReadDoc from './readDoc/ReadDoc'
import About from './about/About'
import Blogs from './blogs/Blogs'
// import Dashboardmain from '../app/dashboard/Dashboardmain';
import AllProposals from '../app/Governance/AllProposals'
// import CreateProposal from '../app/Governance/CreateProposal'
import StakingDashboard from '../app/Staking/Dashboard'
import Pool from '../app/Pool/Pool'
import History from '../app/Staking/History'
import StakeV2 from '../updated_theme/Stake/V2-Stake'
import Contactus from '../app/apps/Contactus'
import Cookie from '../app/Policies/Cookie'
import Privacypolicy from '../app/Policies/Privacypolicy'
import Tremsofuse from '../app/Policies/Tremsofuse'
import Governance from './GovernanceNew/Governance'
import GovernanceBody from '../app/GovernanceNew/GovernanceBody'
import Stakingmain from '../app/Staking/Stakingmain'
import StakingAdminDash from '../app/Staking/StakingAdminDashboard/stakingAdminDash'
import GovernanceAdminDashboard from '../app/Governance/GovernanceAdminDashboard/GovernanceAdminDashboard'
import Dashboardmain from '../app/dashboard/Dashboardmain'
import Stake from './home/Stake'
import Support from '../app/apps/Support'
import Whitepaper from '../app/apps/Whitepaper'
import Hackathon from './apps/Hackathon'
import Quiz from '../app/quiz/Quiz'
import Hackathon1 from './apps/Hackathon1'
import SellToken from './apps/SellToken'
import Home from '../updated_theme/Home/NewHome'
import Error404 from './error-pages/ComingSoon'


// const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Dashboard = lazy(() => import('./dashboard/Dashboard'))
// const CreateProposal = lazy(() => import('../app/Governance/CreateProposal'))
const CreateProposal = lazy(() => import('../app/Governance/CreateProposal'))
const GovernanceDetail = lazy(() => import('../app/Governance/GovernanceDetail'))
const CreateProposalv2 = lazy(() => import('../app/Governance/CreateProposal1'))
const CreateProposalDetails = lazy(() =>
	import('../app/Governance/create-proposal-details')
)
const Index = lazy(() => import('./home/Index'))

class AppRoutes extends Component {
	render() {
		return (
			<Suspense fallback={<div>...Loading</div>}>
				<Switch>
					<Route path='/quiz' exact component={Quiz} />
					<Route exact path='/' component={Home} />
					{/* <Route exact path='/' component={Index} /> */}
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/about' component={About} />
					<Route exact path='/contactus' component={Contactus} />
					<Route exact path='/cookies' component={Cookie} />
					<Route exact path='/privacypolicy' component={Privacypolicy} />
					<Route exact path='/terms' component={Tremsofuse} />
					<Route exact path='/blogs' component={Blogs} />
					{/* <Route exact path="/about/usdao" component={ AboutUsdao } /> */}
					<Route path='/governance-proposals' component={GovernanceBody} />
					<Route path='/stakes' component={Stakingmain} />
					<Route path='/governance-new' exact component={Governance} />
					<Route path='/Dashboardmain' exact component={Dashboardmain} />
					{/* <Route path='/staking' exact component={StakingHome} /> */}
					<Route path='/staking/dashboard' exact component={StakingDashboard} />
					<Route path='/history' exact component={History} />
					{/* <Route path='/staking' exact component={Stake} /> */}
					<Route path='/all/proposals' exact component={AllProposals} />
					<Route path='/create-proposal' exact component={CreateProposal} />
					<Route
						path='/governance'
						exact
						component={CreateProposalv2}
					/>
					<Route path='/staking' exact component={StakeV2} />
					<Route
						path='/governance/details/:id'
						exact
						component={CreateProposalDetails}
					/>
					<Route path='/stake/v2' exact component={StakeV2} />
					<Route path='/revenueAdmin' exact component={Pool} />
					<Route path='/read-doc' exact component={ReadDoc} />
					<Route exact path='/support' component={Support} />
					<Route exact path='/whitepaper' component={Whitepaper} />
					<Route path='/hackathon' exact component={Hackathon} />
					<Route path='/stakingAdmin' exact component={StakingAdminDash} />
					<Route path='/hackathon1' exact component={Hackathon1} />
					<Route path='/tokensale' exact component={SellToken} />
					<Route
						path='/governance-admin'
						exact
						component={GovernanceAdminDashboard}
					/>
					<Route exact path='/coming-soon' component={Error404} />
					<Route exact path='/coming-soon' component={Error404} />
					<Route exact path='/governance/details' component={GovernanceDetail} />

					
					<Redirect to='/' />
				</Switch>
			</Suspense>
		)
	}
}

export default AppRoutes
