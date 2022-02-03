import React, { useState, useRef } from 'react'
import '../App.scss'
import classNames from 'classnames/dedupe'
import HomeFooter from './HomeFooter'
import HomeNavbar from './HomeNavbar'
import Intro from './Intro'
import Services from './Services'
import BelieveIn from './BelieveIn'
import Staking from './Staking'
import WalletConnect from './WalletConnect'
import TokensInfo from './TokensInfo'
import Roadmap from './RoadMap/Roadmap'
import UseCaseDemo from './UsecaseDemo'
import Wallet from './wallet'
import WhatIsUSDAO from './WhatIsUSDAO'
import JoinUs from './joinUs'
import Dashboard from '../dashboard/Dashboard'
import WalletConnectPopup from './WalletConnectPopup'
import Partners from './Partners'
import Advisor from './Advisor'

const Index = ({ history }) => {
	const [buttonPopup, setButtonPopup] = useState(false)

	const [darkMode, setDarkMode] = useState(false),
		myRef = useRef(null),
		usdaoBuyRef = useRef(null),
		[show, setShow] = useState(false),
		[usmSupply, setUsmSupply] = useState('00.0000'),
		[fumSupply, setFumSupply] = useState('00.0000')

	return (
		<div className={classNames('', { dark: darkMode })}>
			<div className='home__container '>
				<Wallet trigger={buttonPopup} />
				<WalletConnectPopup show={show} setShow={setShow} />
				<div>
					<HomeNavbar
						history={history}
						show={show}
						setShow={setShow}
						mode={darkMode}
						setmode={setDarkMode}
						moduleName='Governance'
					/>
					<Intro
						history={history}
						myRef={myRef}
						usmSupply={usmSupply}
						setUsmSupply={setUsmSupply}
						fumSupply={fumSupply}
						setFumSupply={setFumSupply}
						mode={darkMode}
					/>
				</div>
				{/* <UsdaoQuick /> */}
				<Dashboard
					myRef={myRef}
					usdaoBuyRef={usdaoBuyRef}
					setFumSupply={setFumSupply}
					setUsmSupply={setUsmSupply}
					mode={darkMode}
				/>
				{/* <div className="d-flex justify-content-center" style={{ transform: 'translateY(50%)'}}>
                 <img src='/assets/Group12306.png' className="img-fluid" />
            </div> */}
				<WhatIsUSDAO />
				<Services />
				<BelieveIn />
				{/* <DigitalCash /> */}
				<TokensInfo
					history={history}
					myRef={myRef}
					usdaoBuyRef={usdaoBuyRef}
					setUsmSupply={setUsmSupply}
					fumSupply={fumSupply}
					setFumSupply={setFumSupply}
				/>
				{/* <Market/> */}
				{/* <UseCase /> */}
				<UseCaseDemo />
				<Staking />
				<WalletConnect show={show} setShow={setShow} />
				{/* <Partners/>
				<Advisor/> */}
				<Roadmap />
				{/* <Services1 /> */}
				<JoinUs />
				{/* <Services2 />
            <BuiltOn />
            <Guides /> */}

				{/* <Blogs /> */}
				{/* <Social /> */}
				<HomeFooter history={history} />
			</div>
		</div>
	)
}

export default Index
