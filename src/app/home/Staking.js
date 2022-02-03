import React, { useState} from 'react';

export const RangeInput = ({rewardPercent}) =>{
    const [stakeSelected, setStakeSelected] = useState(50000),
          [timeSelected, setTimeSelected] = useState(2),
          maxStake = 100000,
          maxTime = 6,
          finalValue = (stakeSelected * (timeSelected / 2) * 6)/100,
          stakeChange = (e, stake)=>{
            stake === 'stake' && setStakeSelected(e.target.value);
            stake === 'time' && setTimeSelected(e.target.value);
          },
          toPercent = (stakeSelected * 100)/maxStake,
          toPercentTime = (timeSelected * 100)/maxTime,
          mystyle = {
            background: `linear-gradient(to right, #F85E11 0%, #F85E11 ${toPercent}%, #dfd9d9 ${toPercent}%, #dfd9d9 100%)`
          },
         styleTime = {
            background: `linear-gradient(to right, #F85E11 0%, #F85E11 ${toPercentTime}%, #dfd9d9 ${toPercentTime}%, #dfd9d9 100%)`
          };
    return(
        <div className='inputRangeWrapper'>
            <div className='data'>
                <h3>Estimate Your Reward</h3>
                <br/>
                <p className='your-stake'>You Stake <span>{stakeSelected} USDAO</span></p>
                <p className='range-p'><input type="range" style={mystyle} id="vol" name="vol" defaultValue={stakeSelected} min="1000" max="100000" className='form-control-range' onChange = {(e) =>{stakeChange(e, 'stake')}} /></p>
                <p>1 K <span className='pull-right'>100 K</span></p>

                <p className='your-stake'>Looking it for <span>{timeSelected * 6} Month</span></p>
                <input type="range" id="vol" style={styleTime} name="vol" min="0" max={'6'} defaultValue={timeSelected}  className='form-control-range' onChange = {(e) =>{stakeChange(e, 'time')}}/>
                <p className='min-max'>Min 0 M<span className='pull-right'>Max 36 M</span></p>
            </div>   
            <div className='data-footer'>
                <p className='title'>Your Estimate Reward <span className='pull-right'>Fixed APR</span></p>
                <p className='footer-data'>{Number(stakeSelected) + Number(finalValue)} USDAO <span className='pull-right'>{rewardPercent || 6}%</span></p>
            </div> 

        </div>
    )
    
}

export default function Staking() {
    return (
        <div className="bg__dark pt-5">
                <div className="bg__dark pt-5">
                    <div className="row pb-5 bg__dark">
                        
                        <div className="col-12 col-md-6 mt-auto mb-auto pl-5 pr-5">
                            <div className="col-12 p-0">
                                {/* <img alt="#" className="img-fluid" src={require('../../assets/images/what__is.png')} /> */}
                                <p className="about__heading">STAKING</p>
                                {/* <p className="about__sub__title">
                                The goal of the USDAO Foundation is to provide USDAO stable 
                                coin as a service that enables users to enjoy the US dollar’s 
                                useability without owning a bank account.
                                </p> */}
                                <p className="about__title">
                                    STAKE ON USDAO
                                </p>
                                <p className="about__sub__title">
                                Earn rewards @6% by staking your USDAO to help secure the network. Start earning with a few clicks.
                                </p>
                                <div className="d-flex flex-wrap w-100 mt-5 hide">
                                    <div className="staking_info">
                                        <img alt="#" src="/assets/Group 12540.png"/>
                                        <p>6% fixed APR</p>
                                    </div>
                                    <div className="staking_info">
                                        <img alt="#" src="/assets/Group 12540.png"/>
                                        <p>Compound your stake</p>
                                    </div>
                                    <div className="staking_info">
                                        <img alt="#" src="/assets/Group 12540.png"/>
                                        <p>Unlock liquidity</p>
                                    </div>
                                    <div className="staking_info">
                                        <img alt="#" src="/assets/Group 12540.png"/>
                                        <p>Choose your rewards</p>
                                    </div>
                                     
                                </div>
                                <br/>
                               <div> <a href='/stakes' className="orange__button mx-4">Stake Now</a></div>
                                <br/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 pl-auto pr-auto d-flex justify-content-center">
                           <RangeInput />
                        </div>
                        
                    </div>
                </div>
            </div>
            
    )
}

// export default Staking
