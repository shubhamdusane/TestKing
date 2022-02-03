import React from 'react'

function BelieveIn() {
    return (
        <div className="row text-center pt-5 bg__dark explore-wrapper">
                    <div className="col-12 p-5">
                    {/* <p className="usdao__title text-center">USDAO</p> */}
                    <div className=" col-12 col-md-3 believein__heading">
                        <p className="leading_blockChains__description">Explore Use Cases</p>
                    </div>
                    <div className="justify-content-center d-flex flex-wrap">
                        <div className='card-box'>
                            <img alt="#" src="/assets/power-strake.png" className="img-fluid m-auto" />
                            <div className="believein_card_desc">
                                <h4>Powerstake</h4>
                                <p>
                                A new age staking model with with USDAO stablecoin, where users can earn from 40% to 180% interest in native usecase token launched by USDAO ecosystem platforms.
                                </p>
                            </div>
                        </div>
                        <div className='card-box'>
                            <img alt="#" src="/assets/remittance.png" className="img-fluid m-auto" />
                            <div className="believein_card_desc">
                                <h4>Remittance</h4>
                                <p>
                                Send money, Anytime , Anywhere for  Any cause with complete tracking through USDAO.
                                </p>
                            </div>
                        </div>
                        <div className='card-box'>
                            <img alt="#" src="/assets/nft.png" className="img-fluid m-auto"  />
                            <div className="believein_card_desc">
                                <h4>NFT</h4>
                                <p>
                                We see a huge potential in the economics involved in the gaming  industry.  The concept of tokens and payments have existed even before the advent of stablecoins
                                </p>
                            </div>
                        </div>
                        
                    </div>  
                </div>
                                
            </div>

    )
}

export default BelieveIn
