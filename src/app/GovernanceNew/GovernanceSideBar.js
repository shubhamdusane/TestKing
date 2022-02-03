import React from 'react';
import { Link } from 'react-router-dom';

const GovernanceSideBar = () => {

    return (
        <>
        
            <nav className="sidebar sidebar-offcanvas-home governance_navbar" id="sidebar">
            
                <ul className="nav">

                   <li className={'nav-item menu-items'}>
                        <button type="button" className="btn btn-primary btn-rounded navbar__button ml-3">Connect Wallet</button>
                    </li>

                    <li className={'nav-item menu-items kovam-btn'}>
                        <button type="button" className="btn btn-primary btn-rounded navbar__button ml-3">KOVAM</button>
                    </li>
                    <li className={'nav-item menu-items'}>
                    <button type="button" className="btn btn-primary btn-rounded navbar__button ml-3">0 USDAO</button>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            
                            <span className="menu-title">Governance</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            
                            <span className="menu-title">Staking</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            <span className="menu-title">LaunchPads</span>
                        </Link>
                    </li>
                </ul>
                    
                {/* <div className='nav-bottom' >
                    <ul className="nav">
                        <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            <span className="menu-title">History</span>
                        </Link>
                        </li>
                        <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            <span className="menu-title">Settings </span>
                        </Link>
                        </li>
                        <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            <span className="menu-title">Terms of Use</span>
                        </Link>
                        </li>
                        <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" >
                            <span className="menu-title">Privacy Policy</span>
                        </Link>
                        </li>
                    </ul>
                </div> */}


            </nav>
        </>
    )
}

export default GovernanceSideBar
