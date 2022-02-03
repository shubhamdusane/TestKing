import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wallet from './wallet'

const HomeSubNavbar = ({ mode, history, setmode }) => {

    const [buttonPopup, setButtonPopup] = useState(false);

    const setvalue = () => {
        setmode(!mode)        
    }


    // const toggleOffcanvas = () => {
    //     document.querySelector('.sidebar-offcanvas-home').classList.toggle('active');
    // }
    return (
        <>
            <div className="" >
            <Wallet  trigger={buttonPopup} setTrigger = {setButtonPopup}/>
                <div className="d-flex justify-content-between home__navbar">
                    {/* <div className="col-3 mt-auto mb-auto" onClick={()=>history.push('/')}>
                        <img src={require('../../assets/images/Group12150.png')} />
                    </div> */}
                    <div className="">
                        <ul className="d-flex nav__menu">
                        {/* <li className="nav__link pointer" >
                           <Link to=''>Telegram</Link> 
                        </li>
                        <li className="nav__link pointer">
                            <Link to=''>Discord</Link>   
                        </li>
                        <li className="nav__link pointer">
                        <Link to=''>Github</Link>  
                        </li> */}
                        </ul>
                    </div>
                    <div className="">
                        <ul className="d-flex nav__menu">
                        {/* <li className="nav__link pointer">
                            Litepaper
                        </li> */}
                        <li className="nav__link">
                            <a target='_blank' href='https://gateway.ipfs.io/ipfs/QmQC7js6gwJ4EsDY8t2x2nECX1BD66c2qj6HvnbDV9Mn8y'>Whitepaper</a>
                        </li>
                        <li className="nav__link">
                            <div onClick={setvalue}><img src='/assets/_1651832016864.png' style={{width: '20px', height: '20px', cursor: 'pointer'}} /></div>
                        </li>
                        </ul>
                    </div>
                </div>

            </div>
            <nav className="sidebar sidebar-offcanvas-home d-lg-none home__navbar" id="sidebar">

                <ul className="nav">

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" to="/dashboard">
                        
                            <span className="menu-title">About</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" to="/dashboard">
                          
                            <span className="menu-title">Developers</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" to="/dashboard">
                           
                            <span className="menu-title">Library</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" to="/dashboard">
                          
                            <span className="menu-title">Media</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" to="/dashboard">
                          
                            <span className="menu-title">Community</span>
                        </Link>
                    </li>

                    <li className={'nav-item menu-items mt-3'}>
                        <Link className="nav-link" to="/dashboard">
                           
                            <span className="menu-title">Contact</span>
                        </Link>
                    </li>
                    
                    <li className={'nav-item menu-items mt-3'}>
                        <button type="button" className="btn btn-primary btn-rounded navbar__button ml-3">Connect Wallet</button>
                    </li>

                </ul>

            </nav>

        </>
    )
}

export default HomeSubNavbar
// every project we create have secure token or secure key


// %INTEL_DEV_REDIST%redist\intel64\compiler