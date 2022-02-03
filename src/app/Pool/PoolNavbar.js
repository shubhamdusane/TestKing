import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// import PoolNavbar from './PoolNavbar';

const PoolNavbar = ({ history, show, setShow, setmode, mode }) => {
	const [buttonPopup, setButtonPopup] = useState(false)
	const setvalue = () => {
		setmode(!mode)
	}
	const toggleOffcanvas = () => {
		document.querySelector('.sidebar-offcanvas-home').classList.toggle('active')
	}
	return (
		<>
			<div
				style={{
					borderTop: '1px solid #D5D5D5',
					borderBottom: '1px solid #D5D5D5'
				}}
			>
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
							<li className='nav__link'>
								<a
									target='_blank'
									href='https://gateway.pinata.cloud/ipfs/QmPQqmuEh5y3j8U6sckqXhF9SY8bXkvWPu66SApMMa4BDP'
								>
									Portfolio
								</a>
							</li>
							<li className='nav__link' hidden>
								<a
									target='_blank'
									href='/whitepaper
'
								>
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
						<button
							type='button'
							className='btn btn-primary navbar__button d-none d-lg-block mr-5 ml-1 hide'
							onClick={() => setShow(!show)}
						>
							Launch App
						</button>
						{/* <button type="button" className="btn btn-primary btn-rounded navbar__button d-none d-lg-block" onClick={()=>history.push('/dashboard')}>Connect Wallet</button> */}
						<button
							className='navbar-toggler navbar-toggler-right d-lg-none align-self-center'
							type='button'
							onClick={toggleOffcanvas}
						>
							<span
								className='mdi mdi-format-line-spacing'
								style={{ color: 'white' }}
							></span>
						</button>
					</div>
				</div>
			</div>
			<nav
				className='sidebar sidebar-offcanvas-home d-lg-none home__navbar'
				id='sidebar'
			>
				<ul className='nav'>
					<li className={'nav-item menu-items mt-3'}>
						<Link className='nav-link' to='/dashboard'>
							<span className='menu-title'>About</span>
						</Link>
					</li>

					<li className={'nav-item menu-items mt-3'}>
						<Link className='nav-link' to='/dashboard'>
							<span className='menu-title'>Developers</span>
						</Link>
					</li>

					<li className={'nav-item menu-items mt-3'}>
						<Link className='nav-link' to='/dashboard'>
							<span className='menu-title'>Library</span>
						</Link>
					</li>

					<li className={'nav-item menu-items mt-3'}>
						<Link className='nav-link' to='/dashboard'>
							<span className='menu-title'>Media</span>
						</Link>
					</li>

					<li className={'nav-item menu-items mt-3'}>
						<Link className='nav-link' to='/dashboard'>
							<span className='menu-title'>Community</span>
						</Link>
					</li>

					<li className={'nav-item menu-items mt-3'}>
						<Link className='nav-link' to='/dashboard'>
							<span className='menu-title'>Contact</span>
						</Link>
					</li>

					<li className={'nav-item menu-items mt-3'}>
						<button
							type='button'
							className='btn btn-primary btn-rounded navbar__button ml-3'
						>
							Connect Wallet
						</button>
					</li>
				</ul>
			</nav>
		</>
	)
}

export default PoolNavbar
// every project we create have secure token or secure key

// %INTEL_DEV_REDIST%redist\intel64\compiler
