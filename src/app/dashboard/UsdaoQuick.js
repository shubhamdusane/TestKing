import React from 'react';

const UsdaoQuick = () =>{
    return(
        <div className='container'>
            <div className='usDaoWrapper'>
                <p className='about__title'>USDAO Quick <span>GO TO MAIN DASHBOARD</span></p>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='usdaoWrap'>
                             <p className='about__title'>USDAO </p>
                             <div className='inputWrap'>
                                 <p>Convert From</p>
                                <input />
                                <select>
                                    <option value='ETH'>ETH</option>
                                    <option value='USDAO'>USDAO</option>
                                </select>
                                <br/><br/>
                                <p>To Receive</p>
                                <input />
                                <button>Buy</button>
                                <p>1 ETH = 9875.16 USDAO</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='usdaoWrap'>
                            <p className='about__title'>ASSET </p>
                            <div className='inputWrap'>
                                <p>Convert From</p>
                                <input />
                                <select>
                                    <option value='ETH'>ETH</option>
                                    <option value='USDAO'>USDAO</option>
                                </select>

                                <br/><br/>
                                <p>To Receive</p>
                                <input />
                                <button>Buy</button>
                                <p>1 ETH = 9875.16 ASSET</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsdaoQuick;