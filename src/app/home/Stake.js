import React, { useState, useRef, useEffect } from 'react'
import '../App.scss'
import classNames from 'classnames/dedupe'
import HomeFooter from './HomeFooter'
import StakeNavbar from './StakeNavbar'
import StakeIntro from './StakeIntro'
import StakeBelieveIn from './StakeBelieveIn'
import Staking from './Staking'
import Wallet from './wallet'
import WalletConnectPopup from './WalletConnectPopup'
import { decimalPlaces} from '../../utils';
import { TVLAmount } from '../../redux/staking';

const Stake = ({ history }) => {
	const [buttonPopup, setButtonPopup] = useState(false)

	const [darkMode, setDarkMode] = useState(false),
		myRef = useRef(null),
		[show, setShow] = useState(false)
	const [tvlAmount, settvlAmount] = useState();

	useEffect(()=>{
        TVLAmount(settvlAmount);
         
        },[])
		
	return (
		<div className={classNames('', { dark: darkMode })}>
			<div className='home__container '>
				<Wallet trigger={buttonPopup} />
				<WalletConnectPopup show={show} setShow={setShow} />
				<div>
					<StakeNavbar
						history={history}
						show={show}
						setShow={setShow}
						mode={darkMode}
						setmode={setDarkMode}
					/>
					<StakeIntro history={history} myRef={myRef} tvl={decimalPlaces(tvlAmount)} />
				</div>
				<Staking />
				<StakeBelieveIn />
				<div className='col-11 m-auto p-0 pt-5'>
					<div className='row pt-5'>
						<div className='orange__container p-4 text-center'>
							<h2 style={{ color: 'white', fontWeight: 400 }}>
								IF YOU DON'T HAVE USDAO, THEN YOU NEED TO BUY IT WITH 1 US
								DOLLAR OR YOU CAN CONVERT YOUR OTHER CRYPTOCURRENCY INTO USDAO!
							</h2>
							<div
								className='btn btn-primary navbar__button text-center mt-3'
								style={{ background: 'white', fontWeight: 700 }}
							>
								<span
									style={{ textDecoration: 'none', color: 'orangered' }}
									// onClick={() => {
									// 	history.push('/stakes')
									// }}
								>
									TVL: {decimalPlaces(tvlAmount)} yearly
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* <Staking /> */}
				<HomeFooter history={history} />
			</div>
		</div>
	)
}

export default Stake
