import React from 'react';
import { Button } from 'antd';

const GovernanceHeader = ({ setmode, mode }) => {

    const setvalue = () => {
        setmode(!mode)        
    }
    return (
        <>
            <div style={{borderTop: '1px solid #D5D5D5', borderBottom: '1px solid #D5D5D5'}}>
                <div className="d-flex justify-content-between home__navbar">
                    <div className="d-flex mt-auto mb-auto home__navbar_logo1" onClick={()=>window.location='/'}>
                        <img alt="#" className="pr-2 pl-4 head-logo" src={require('../../assets/images/logo.png')} />
                        <p className="mt-auto mb-auto pl-1 font-weight-light home__navbar_logo">USDAO</p>
                    </div>

                    {/* <nav class="navbar navbar-gov-header navbar-light justify-content-between">
                    <form class="form-inline">
                        <input class="form-control form-gov-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    </form>
                    </nav> */}
                   
                    <div className="d-flex gov-header">
                        <ul className="d-flex justify-content-center align-self-center">
                            <li className="nav__link">
                                <Button className='btn-center' size="default">KOVAM</Button>
                            </li>
                            <li className="nav__link">
                                <Button className="ml-3"  style={{backgroundColor: '#F85E11'}} size="large">0 USDAO</Button>
                            </li>
                            <li className="nav__link">
                                <Button style={{backgroundColor: '#FFFFFF', color: 'black'}} className="ml-3"  size="large">205 <img alt="#" className="ml-1" src='/assets/gas-station.png' /></Button>
                            </li>
                            <li className="nav__link">
                                <div  onClick={setvalue}><img alt="#" src='/assets/_1651832016864.png' style={{width: '20px', height: '20px', cursor: 'pointer'}} /></div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" >
                            <span className="mdi mdi-format-line-spacing" style={{color:'white'}}></span>
                        </button> */}
            </div>
        </>
    )
}

export default GovernanceHeader