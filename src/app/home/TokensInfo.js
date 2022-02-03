import React from 'react'

function TokensInfo({history, myRef, usdaoBuyRef}) {
    const onClick = (type) =>{
        if(type === 'usdao'){
            usdaoBuyRef.current.focus();
        }
        else{
            myRef.current.focus();
        }
        
    }
    return (
        <div className="col-12 pt-5 pb-5" >
        <div className="col-12 col-md-11 pb-5 m-auto text-center tokenPower ">
                <p className="built__on">
                    TWO TOKENS POWERS THE NETWORK
                </p>
                <div className="col-12 position__relative">
                    <div className="position__relative">
                        <div className="col-12 col-md-10 ml-auto mr-auto mb-5">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-5 mr-auto mt-5 stretch-card">
                                    <div className="token__card text-center">
                                        {/* <div className="usdao__card"> */}
                                            {/* <img alt="#" src='/assets/Group 114761.png' className="img-fluid"  style={{width: '150px'}}/> */}
                                            <div className="token__card__title text-center pt-4 pb-4">
                                                <img alt="#" className="mr-2" src="/assets/power-usdao.png" style={{width: '180px'}}/>
                                            </div>
                                            <p className="card__content pl-4 pr-4">
                                                A stablecoin whose price is relatively pegged
                                                to 1 US Dollar. It can be minted using Ether or
                                                any other ERC20 tokens.
                                            </p>

                                            {/* <div className='token__current__price'>
                                                $1 Current Price
                                        </div> */}
                                            {/* <form  className="d-flex pt-4 pl-5 pr-5 flex-column">
                                                <div>
                                                    <label>Send</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control h-auto custom__input" 
                                                        placeholder="0.000000 ETH" 
                                                        // onChange={inputChangeHandler}
                                                        required />   
                                                    <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px', color: 'grey'}}>Wallet Balance: 0.0000 ETH</p>      
                                                </div>   */}   
                                                <a className="custom__button1 mt-3 mb-3" onClick={()=>{onClick('usdao')}}>
                                                    BUY USDAO
                                                </a>
                                            {/* </form>  */}
                                            {/* <div className="mt-5 pb-5">
                                                 <img alt="#" src={require('../../assets/images/buy__now.png')} /> 
                                            </div> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-5 ml-auto mt-5 stretch-card mobile-only">
                                    <img alt="#" src='/assets/governence.png' alt='governence-image'/>
                                </div>            
                                <div className="col-12 col-sm-6 col-md-5 ml-auto mt-5 stretch-card">
                                    <div className="token__card text-center">
                                        {/* <div className="usdao__card">
                                            <img alt="#" src='/assets/Group 11476.png' className="img-fluid" style={{width: '150px'}}/>
                                        </div> */}
                                        <div className="token__card__title text-center pt-4 pb-4">
                                            <img alt="#" className="mr-2" src="/assets/power-asset.png" style={{width: '180px'}}/>
                                        </div>
                                        <p className="card__content pl-4 pr-4">
                                            The ASSET token allows investors to fund the
                                            reserve pool with Ether and maintain the
                                            USDAO price pegged to 1 USD.
                                        </p>
                                        {/* <div className='token__current__price'>
                                            $1 Current Price
                                    </div> */}
                                    {/* <form  className="d-flex pt-4 pl-5 pr-5 flex-column">
                                        <div>
                                            <label>Send</label>
                                            <input 
                                                type="number" 
                                                className="form-control h-auto custom__input" 
                                                placeholder="0.000000 ETH" 
                                                // onChange={inputChangeHandler}
                                                required />   
                                            <p style={{fontWeight: 100, fontSize: '10px', float: 'right', padding: '10px', color: 'grey'}}>Wallet Balance: 0.0000 ETH</p>      
                                        </div>    */}  
                                        <a className="custom__button1 mt-3 mb-3" onClick={()=>{onClick('asset')}}>
                                            BUY ASSET
                                        </a>
                                    {/* </form>  */}
                                        {/* <div className="mt-5 pb-5">
                                            
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            </div>

    )
}

export default TokensInfo
