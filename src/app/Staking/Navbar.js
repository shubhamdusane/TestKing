import React, { useState } from 'react'

// import PoolNavbar from './PoolNavbar';

const Navbar = ({
	history,
	show,
	setShow,
	setmode,
	mode,
	show_portfolio = true,
	moduleName
}) => {
	const [buttonPopup, setButtonPopup] = useState(false)
	const setvalue = () => {
		setmode(!mode)
	}
	// const toggleOffcanvas = () => {
	//     document.querySelector('.sidebar-offcanvas-home').classList.toggle('active');
	// }
	return (
		<>
			<div>
				{/* <Wallet  trigger={buttonPopup} setTrigger = {setButtonPopup}/> */}
				<div className='d-flex justify-content-between home__navbar'>
					<div
						className='d-flex mt-auto mb-auto home__navbar_logo1'
						onClick={() => (window.location = '/')}
					>
						<img
							className='pr-2 pl-4 head-logo'
							src={require('../../assets/images/logo.png')}
						/>
						<p className='mt-auto mb-auto pl-1 font-weight-light home__navbar_logo'>
							USDAO
						</p>
					</div>
					<div className='d-flex justify-content-center align-self-center'>
						<ul className='d-flex nav__menu'>
							{/* <li className="nav__link pointer" onClick={()=>history.push('/about')}>
                                Enterprise
                            </li>
                            <li className="nav__link">
                                <Link to={'/create-proposal'}>Individuals</Link>
                        </li>
                        <li className="nav__link">
                        <Link to={'/stakes'}>Developers</Link>
                        </li> */}
							{/* <li className="nav__link">
                                LIBRARY
                        </li> */}
							{/* <li className="nav__link">
                                Media
                        </li> */}
							{/* <li className="nav__link">
                                COMMUNITY
                        </li>
                            <li className="nav__link">
                                CONTACT
                        </li> */}
						</ul>
					</div>
					<div className='d-flex'>
						{/* <img className="pl-2 pr-2" src='/assets/Group 12432.png' style={{height: '45px'}}/> */}
						<ul className='d-flex justify-content-center align-self-center'>
							{show_portfolio && (
								<li className='nav__link'>
									<a
										target='_blank'
										href='https://gateway.pinata.cloud/ipfs/QmPQqmuEh5y3j8U6sckqXhF9SY8bXkvWPu66SApMMa4BDP'
									>
										Portfolio12
									</a>
								</li>
							)}
							{moduleName && (
								<li className='nav__link'>
									<a target='_blank' href='/create-proposal'>
										{moduleName}
									</a>
								</li>
							)}
							<li className='nav__link' hidden>
								<a target='_blank' href='/whitepaper'>
									Whitepaper
								</a>
							</li>
							<li className='nav__link'>
								<div onClick={setvalue}>
									<img
										src='/assets/_1651832016864.png'
										style={{ width: '20px', height: '20px', cursor: 'pointer' }}
									/>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
// every project we create have secure token or secure key

// %INTEL_DEV_REDIST%redist\intel64\compiler
