import React, { useState, useMemo, useEffect, useCallback } from 'react';
import './_gov.scss'


const GovernanceDetail = () =>{
    return(
        <div className='v2-governance gov-detail'>
            <div className='row'>
				<div className='col-md-6 text-left'>
					<img src={require('../../assets/images/home_logo.png')} alt='' />
				</div>
				<div className='col-md-6 d-flex justify-content-end align-items-center'>
					<p className='common-white-font px-2 pointer m-0'>Staking</p>
					<p className='common-white-font px-2 pointer m-0'>Whitepaper</p>
					<p className='common-white-font px-2 pointer m-0'>
						<img src={require('../../assets/images/sun.svg')} alt='' />
					</p>
				</div>
			</div>

            <div className='row p-5 m-md-5 mx-md-4 px-md-3'>
				<div className='col'>
                    <p className='p-3'>All Proposal</p>
					<div className='shadow-card p-md-4 px-md-5'>
						<div className='row first-row'>
                            <div className='col-md-6 text-left d-flex'>
                                <div className='d-flex mr-5'>
                                    <p className='pr-2'>Ended</p>
                                    <div className= 'dot red'></div>
                                </div>
                                <div className='d-flex'>
                                    <p className='pr-2'>On Going</p>
                                    <div className= 'dot green'></div>
                                </div>
                            </div>
                            <div className='col-md-6 justify-content-end btn-green execute-btn'>
                                
                                    <button className='prop-button-success'>EXECUTED</button>
                            </div>
						</div>
                        <div className='row vote-status mt-5'>
                            <div className='col-md-6 text-left'>
                                <p className='medium-white-font'>Should USDAO be deployed to?</p>
                                <p className='mt-5 vot-detail'>Voting ended December 19, 2021, 12:47 AM GMT+5:30</p>
                            </div>
                            <div className='col-md-6 justify-content-end vote-status-card'>
                                <div className='card-wrap pull-right'>
                                    <div className='shadow-card p-md-4 px-md-5 '>
                                        <div className='row'>
                                            <div className='col-md-6 justify-content-center '>
                                                    <p className='pr-2'>For Vote : </p>
                                            </div>
                                            <div className='col-md-6 justify-content-center'>
                                                    <p className='pr-2'>0.0000 </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='shadow-card p-md-4 px-md-5 mt-5'>
                                        <div className='row'>
                                            <div className='col-md-6 justify-content-center '>
                                                    <p className='pr-2'>For Vote : </p>
                                            </div>
                                            <div className='col-md-6 justify-content-center'>
                                                    <p className='pr-2'>0.0000 </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>
                        <div className='content '>
                            <div>
                                <p className='medium-white-font'> Details </p>
                                <div className='d-flex mt-3'>
                                    <p>1: </p>
                                    <p className='orange-color' > USDAO</p>
                                    <p>.transfer(</p>
                                    <p className='orange-color' >0x8706B58660687147ED2946ce82D34F4cD0aAF42F </p>
                                    <p>, 0)</p>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <p className='medium-white-font'> Description </p>
                                <div>
                                    <br/>   
                                    The Polygon team proposes to authorize USDAO Labs to deploy USDAO protocol to Polygon PoS on behalf of the community.
                                    <br/>
                                    <br/>
                                    We believe this is the right moment for USDAO to deploy on Polygon, for several major reasons:
                                    <ul>
                                        <li>Polygon PoS has the second strongest DeFi ecosystem, right after Ethereum L1;</li>
                                        <li>Deploying to Polygon PoS can bring a lot of benefits (user base growth, huge savings for users, higher user activity, higher revenue, market capture, return to the original DeFi vision etc);</li>
                                        <li>We are willing to incentivize USDAO adoption, financially and otherwise;</li>
                                        <li>Polygon PoS is battle-tested;</li>
                                        <li>Polygon is aligned with Ethereum and its values.</li>
                                        <li>We respectfully submit this proposal for your consideration, and we are looking forward to your questions and feedback.</li>
                                    </ul>
                                    <br/>
                                    We would be willing to commit up to $20M for the aforementioned financial incentives, and we propose to use these funds in the following way:
                                    <br/>
                                    <ul>
                                        <li>Up to $15M for a long-term liquidity mining campaign;</li>
                                        <li>Up to $5M towards the overall adoption of USDAO on Polygon.</li>
                                    </ul>
                                    <br/>
                                    In addition to the financial incentives we are offering will also be supporting the integration by:
                                    <ul>
                                        <li>Actively participate in the design and execution of liquidity mining campaigns;</li>
                                        <li>Work with prominent projects in the Polygon DeFi ecosystem to help them understand the benefits of using USDAO V3 as a "money lego."</li>
                                        <li>Promote USDAO as a "money lego" on hackathons and other developer-focused events and efforts etc.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='medium-white-font'> On-chain voting </p>
                            <div>
                                <br/>
                                This proposal has no on-chain functionality other than polling all USDAO holders. Although the proposal already exceeded the 40m quorum threshold during the consensus check, the USDAO community feels it is important to allow all  holders the opportunity to cast a vote. One important argument in favor of this decision is that Snapshot is not supported by custody providers like Coinbase, Anchorage, etc., smart contract wallets like Argent/Gnosis safe, or meta governance layers like Index & Compound.
                                <br/>
                                <br/>
                                Governor Bravo requires at least one on-chain action, so the proposal includes a transfer of 0 to satisfy the requirement.
                                <br/>
                                <br/>
                                If the proposal passes this phase, the USDAO Labs can deploy USDAO on Polygon on behalf of the USDAO community.
                            </div>
                        </div>
                        <div>
                            <br/>
                            <p className='medium-white-font'>Proposer</p>
                            <br/>
                            <p className='orange-color'>0x8706B58660687147ED2946ce82D34F4cD0aAF42F</p>
                        </div>
                    </div>
				</div>
			</div>
        </div>
    )
}

export default GovernanceDetail;