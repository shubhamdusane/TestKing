// import React from 'react'
// import { Switch, Route } from 'react-router-dom'
// import './App.css'
// import './App.scss'
// import { connect } from 'react-redux'
// import {
// 	metamaskErrorSelector,
// 	networkProviderSelector
// } from './redux/selectors'
// import Index from './screens/home/Index'
// import About from './screens/about/About'
// import Dashboard from './screens/dashboard/Dashboard'
// import Media from './screens/media/Media'
// import Community from './screens/community/Community'
// import Contact from './screens/contact/Contact'
// import TermsCondition from './screens/static/Terms&Condition'
// import PrivacyPolicy from './screens/static/PrivacyPolicy'
// import Legal from './screens/static/Legal'
// import Disclaimer from './screens/static/Disclaimer'
// import WhyChooseUSDAO from './screens/whyChooseUSDAO/WhyChooseUSDAO'
// import AssetToken from './screens/tokenInfoUI/AssetToken'
// import Individuals from './screens/individuals/Individuals'
// import Business from './screens/business/Business'
// import Blogs from './screens/blogs/MainBlogs'
// import USDAOToken from './screens/tokenInfoUI/USDAOToken'
// import Exchanges from './screens/exchanges/Exchanges'
// import Stake from './screens/stake/Stake'
// import Governance from './screens/Governance/Governance'
// import Contactus from './app/apps/Contactus'
// import Home from './updated_theme/Home/Home'

// function App({ dispatch, networkProvider, metamaskError }) {
// 	return (
// 		<div className='App'>
// 			<Switch>
// 				<Route exact path='/' component={Index} />
// 				<Route exact path='/dashboard' component={Dashboard} />
// 				<Route exact path='/about' component={About} />
// 				<Route exact path='/media' component={Media} />
// 				<Route exact path='/community' component={Community} />
// 				<Route exact path='/contactus' component={Contactus} />
// 				<Route exact path='/contact' component={Contact} />
// 				<Route exact path='/terms' component={TermsCondition} />
// 				<Route exact path='/privacypolicy' component={PrivacyPolicy} />
// 				<Route exact path='/legal' component={Legal} />
// 				<Route exact path='/disclaimer' component={Disclaimer} />
// 				<Route exact path='/whyChooseUs' component={WhyChooseUSDAO} />
// 				<Route exact path='/about/asset' component={AssetToken} />
// 				<Route exact path='/about/usdao' component={USDAOToken} />
// 				<Route exact path='/individuals' component={Individuals} />
// 				<Route exact path='/business' component={Business} />
// 				<Route exact path='/blogs' component={Blogs} />
// 				<Route exact path='/exchanges' component={Exchanges} />
// 				<Route exact path='/stake' component={Stake} />
// 				<Route exact path='/staking' component={Staking} />
// 				<Route exact path='/governance' component={Governance} />
// 				<Route exact path='/home/v2' component={Home} />
// 			</Switch>
// 		</div>
// 	)
// }

// const mapStateToProps = (state) => {
// 	return {
// 		networkProvider: networkProviderSelector(state),
// 		metamaskError: metamaskErrorSelector(state)
// 	}
// }

// export default connect(mapStateToProps)(App)
