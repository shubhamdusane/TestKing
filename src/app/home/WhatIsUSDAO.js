import React from 'react'

function WhatIsUSDAO({history}) {
    return (
        <div className="bg__dark pt-5">
                <div className="bg__dark pt-5">
                    <div className="row pb-5 bg__dark">
                        
                        <div className="col-12 col-md-6 mt-auto mb-auto pl-5 pr-5">
                            <div className="col-12 p-0">
                                {/* <img alt="#" className="img-fluid" src={require('../../assets/images/what__is.png')} /> */}
                                <p className="about__heading">Why USDAO?</p>
                                {/* <p className="about__sub__title">
                                The goal of the USDAO Foundation is to provide USDAO stable 
                                coin as a service that enables users to enjoy the US dollar’s 
                                useability without owning a bank account.
                                </p> */}
                                <p className="about__title">
                                SPEED, SCALABLE, SECURED
                                </p>
                                <p className="about__sub__title">
                                The USDAO Protocol provides a highly scalable and 
                                decentralized stable currency with lower transaction 
                                fees. USDAO is a crypto-backed digital stablecoin 
                                intended to serve as a global currency.
                                </p>
                                <p>Please go through our documentation</p>
                                {/* <div className="d-flex">
                                    <a className="color" href='/create/proposal'>Governence</a>
                                    <a className="color" href='/whitepaper/'>Whitepapper</a>
                                    <a className="color" target='_blank' href='https://gateway.pinata.cloud/ipfs/QmccELVcxMoSF5vsR9jbym9AW24sTwxCxT6pvvBkneEAYb'>Portfolio</a>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 pl-auto pr-auto d-flex justify-content-center">
                            <img alt="#" src='/assets/Group 12580.png' className="img-fluid aboutusdao_img mr-4" />
                        </div>
                        
                    </div>

                </div>

            </div>
            
    )
}

export default WhatIsUSDAO
