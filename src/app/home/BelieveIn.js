import React from 'react'

function BelieveIn() {
    return (
        <div className="row text-center pt-5 bg__dark explore-wrapper">
                    <div className="col-12 p-5">
                    {/* <p className="usdao__title text-center">USDAO</p> */}
                    <div className=" col-12 col-md-3 believein__heading">
                        <p className="leading_blockChains__description">We Believe In</p>
                    </div>
                    <div className="justify-content-center d-flex flex-wrap">
                        <div className='card-box'>
                            <img alt="#" src="/assets/Layer_x0020_12.png" className="img-fluid m-auto" />
                            <div className="believein_card_desc">
                                <h4>Security</h4>
                                <p>
                                    USDAO is backed by the pool of
                                    cryptocurrencies. ASSET token fund
                                    the pool and maintains the stability
                                    of USDAO's price
                                </p>
                            </div>
                        </div>
                        <div className='card-box'>
                            <img alt="#" src="/assets/Layer_x0020_1.png" className="img-fluid m-auto " />
                            <div className="believein_card_desc">
                                <h4>Decentralized</h4>
                                <p>
                                    USDAO uses strong cryptographic
                                    techniques which makes it more
                                    secure over the public blockchain
                                </p>
                            </div>
                        </div>
                        <div className='card-box'>
                            <img alt="#" src="/assets/people_5.png" className="img-fluid m-auto peopleImage"  />
                            <div className="believein_card_desc">
                                <h4>People</h4>
                                <p>
                                    USDAO is a fully community-driven
                                    decentralized protocol deployed on
                                    Ethereum, Polkadot, Binance Smart
                                    -Chain, Cardano, & more
                                </p>
                            </div>
                        </div>
                        
                    </div>  
                </div>
                                
            </div>

    )
}

export default BelieveIn
