import React from 'react'

function Market() {
    return (
        <div className="row text-center pt-5 bg__dark">
                    <div className="col-12 p-5">
                    {/* <p className="usdao__title text-center">USDAO</p> */}
                    <div className=" col-12 col-md-3 believein__heading">
                        <p className="leading_blockChains__description">Market</p>
                    </div>
                    <div className="justify-content-between d-flex flex-wrap market_card_main">
                        <div className='market_card'>
                            
                            <div className="believein_card_desc">
                                <p>Total Supply</p>
                                <h4>
                                    103,102,470.31
                                </h4>
                            </div>
                        </div>
                        <div className='market_card'>
                            
                            <div className="believein_card_desc">
                                <p>Number of token holders</p>
                                <h4>
                                    2710
                                </h4>
                            </div>
                        </div>
                        <div className='market_card'>
                            
                            <div className="believein_card_desc">
                                <p>Total Borrowed</p>
                                <h4>
                                    31,028,500
                                </h4>
                            </div>
                        </div>
                        {/* <div className='market_card'>
                            
                            <div className="believein_card_desc">
                                <p>Number of Borrowers</p>
                                <h4>
                                    714
                                </h4>
                            </div>
                        </div> */}
                        <div className='market_card'>
                            
                            <div className="believein_card_desc">
                                <p>Token Address</p>
                                <h4>
                                0xd0f9d58e13c18ddcc7db69afbac53339169aa435
                                </h4>
                            </div>
                        </div>
                        
                    </div>  
                </div>
                                
            </div>

    )
}

export default Market
