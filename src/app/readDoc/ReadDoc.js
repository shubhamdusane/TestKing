import React, { useState } from 'react'

import HomeNavbar from '../home/HomeNavbar'
import Wallet from '../home/wallet'
import '../../app/App.scss'

const ReadDoc = ({ history }) => {
	const [buttonPopup, setButtonPopup] = useState(false)
	const [darkMode, setDarkMode] = useState(false)
	return (
		<div className='home__container '>
			<Wallet trigger={buttonPopup} />
			<div>
				<HomeNavbar history={history} />
			</div>
			<h2 className='comming-soon'>We are coming soon!</h2>
		</div>
	)
}

export default ReadDoc
