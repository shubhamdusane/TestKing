import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function HomeFooter() {
	const history = useHistory();
	return (
		<>
			<div className='footer__home'>
				<div className='row footer__home_sub'>
					<div className='col-12 text-center text-md-left col-md-6 mt-5 '>
						<img
							src={require('../../assets/images/logo-full.png')}
							className='img-fluid'
							style={{ width: '200px' }}
							alt='#'
						/>
						<div className='footer__description mt-5'>
							The USDAO is created to cater as a stable coin as a service. The
							USDAO protocol, is a Ethereum cryptocurrency system, allows users
							to generate USDAO stablecoin by leveraging collateral assets
							approved by “USDAO Governance - which is controlled by DAOGOV
							token.
						</div>
						<div className='footer__description mt-3'>
							USDAO Governance is a community organized and operated process of
							managing the various aspects of the USDAO protocol.
						</div>
						<div className='footer__description '>
							<br />
							{/* <h3 style={{ color: 'white' }}>Disclaimer</h3> */}
							USDAO is a decentralized, community-based, multi collateral-backed
							cryptocurrency soft-pegged to the US dollar. It is designed to be
							resilient during market crash and hyperinflation which is ensured
							by ASSET token which is a USDAO pool stabilizer, USDAO offers
							owning US dollar without having a bank account and provide
							economic freedom and opportunity globally to anyone.
							<div className='footer__bottom'>
								© 2021 USDAO. All Rights Reserved
							</div>
						</div>
					</div>
					<div className='col-12 text-center text-md-left col-md-6 mt-5 '>
						<div className='row'>
							<div className='col-12 text-center text-md-left col-md-3 '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										About
									</li>
									{/* <li className='footer__list__item'>
										<a target='_blank' rel="noopener noreferrer" href='https://docs.usdao.io/usdao-1/'>
											About Us
										</a>
									</li> */}
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/'
										>
											USDAO Stablecoin
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/docs/decentralized-governance/usdao-governance-protocol'
										>
											DAOGOV
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/usdao-stack/smart-contract-modules/asset-module'
										>
											ASSET Token
										</a>
									</li>
									{/* <li className='footer__list__item'>
										<a
											target='_blank' rel="noopener noreferrer"
											href='https://docs.usdao.io/usdao-1/getting-started/for-individuals'
										>
											For Traders
										</a>
									</li> */}
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/getting-started/for-businesses'
										>
											For Businesses
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/building-on-top-of-usdao-protocol/developer-guides-and-tutorials'
										>
											For Developer
										</a>
									</li>
								</ul>
							</div>

							<div className='col-12 text-center text-md-left col-md-3 '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										Explore
									</li>
									{/* <li className='footer__list__item'>
										<a
											target='_blank' rel="noopener noreferrer"
											href='https://docs.usdao.io/usdao-1/how-to/staking'
										>
											Staking
										</a>
									</li> */}
									<li className='footer__list__item'>
										<a rel='noopener noreferrer' href='staking'>
											Staking
										</a>
									</li>
									{/* <li 
										className='footer__list__item'
									>
										<a target='_blank' rel="noopener noreferrer" href='https://docs.usdao.io/docs/how-to/governance'>
											Governance
										</a>
									</li> */}
									<li className='footer__list__item'>
										<a
											target=''
											rel='noopener noreferrer'
											href='/governance'
										>
											Governance
										</a>
									</li>
									{/* <li className='footer__list__item'>
										<a target='_blank' rel="noopener noreferrer" href='https://docs.usdao.io/docs/how-to/deposit-swap-minting-by-other-tokens'>
											Deposit Swap
										</a>
									</li> */}

									{/* <li className="footer__list__item">
                                        <a target='_blank' rel="noopener noreferrer" href="javascript:void(0)">Media</a>
                                    </li> */}
									{/* <li className="footer__list__item">
                                        Busniesses
                                    </li> */}
								</ul>
							</div>
							{/* <div className="col-12 text-center text-md-left col-md-12">
                            Digital assets are subject to a number of risks, including price volatility. Transacting in digital assets could result in significant losses and may not be suitable for some consumers. Digital asset markets and exchanges are not regulated with the same controls or customer protections available with other forms of financial products and are subject to an evolving regulatory environment. Digital assets do not typically have legal tender status and are not covered by deposit protection insurance. The past performance of a digital asset is not a guide to future performance, nor is it a reliable indicator of future results or performance. Additional disclosures can be found on the Legal and Privacy page.

                            </div> */}

							<div className='col-12 text-center text-md-left col-md-3  '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										Library
									</li>
									<li className='footer__list__item' hidden>
										<a rel='noopener noreferrer' href='/whitepaper/'>
											Whitepaper
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											href='https://gateway.pinata.cloud/ipfs/QmUHnrVc3r4NRdtGh8biD4z4v4xsc7DDFdDLfgy136VNVq'
										>
											Portfolio
										</a>
									</li>
									{/* <li className="footer__list__item">
                                        Litepaper
                                    </li>
                                    <li className="footer__list__item">
                                        Bluepaper
                                    </li>
                                    <li className="footer__list__item">
                                        Onepaper
                                    </li>
                                    <li className="footer__list__item">
                                        Github Access
                                    </li> */}
								</ul>
							</div>

							<div className='col-12 text-center text-md-left col-md-3 '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										Contact
									</li>
									<li
										className='footer__list__item'
										onClick={() => history.push('/contactus')}
									>
										{/* <a className="footer__list__item_a" href="https://form.typeform.com/to/MhTFXDBz?typeform-medium=embed-snippet" target="_blank">Contact Us</a> */}
										Contact Us
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://medium.com/@usdao'
										>
											Blog
										</a>
									</li>
									{/* <li className="footer__list__item">
                                        <a target='_blank' rel="noopener noreferrer" href="javascript:void(0)">Talk to Expert</a>
                                    </li> */}
									<li
										className='footer__list__item'
										onClick={() => history.push('/support')}
									>
										Support
									</li>
									<li
										className='footer__list__item'
										onClick={() => history.push('/support')}
									>
										Press inquiries
									</li>
								</ul>
							</div>

							{/* <div className="col-12 text-center text-md-left col-md-3 mt-3">
                                <ul>
                                    <li className="footer__list__title">
                                        Social Media
                                    </li>
                                    <li className="footer__list__item">
                                        Facebook
                                    </li>
                                    <li className="footer__list__item">
                                        Twitter
                                    </li>
                                    <li className="footer__list__item">
                                        Telegram
                                    </li>
                                    <li className="footer__list__item">
                                        Github
                                    </li>
                                    <li className="footer__list__item">
                                        Medium
                                    </li>
                                    <li className="footer__list__item">
                                        LinkedIn
                                    </li>
                                </ul>
                            </div> */}

							<div className='col-12 text-center text-md-left col-md-3 mt-3 hidden'>
								<ul className='hidden'>
									<li
										className='footer__list__title'
										
									>
										Policies
									</li>
									<li className='footer__list__item'>
										<Link to='/privacypolicy' exact>
											Privacy Policy
										</Link>
										{/* Privacy Policy */}
									</li>
									<li className='footer__list__item'>
										<Link to='/terms'>Terms of Use</Link>
									</li>
									<li className='footer__list__item'>
										<a href='javascript:void(0)'>Legal Disclaimer</a>
									</li>
									<li className='footer__list__item'>
										<Link to='/cookies'>Cookie Policy</Link>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/usdao-stack/smart-contract-modules/fees-rates-module'
										>
											Fees
										</a>
									</li>
								</ul>
							</div>

							<div className='col-12 text-center text-md-left col-md-3 mt-3 '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										Developers
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/'
										>
											Docs
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/building-on-top-of-usdao-protocol/developer-guides-and-tutorials'
										>
											Developer Resources
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/docs/usdao-stack/smart-contract-modules/oracle-module'
										>
											Price Feeds
										</a>
									</li>
									{/* <li className='footer__list__item'>
										<a target='_blank' rel="noopener noreferrer" href='javascript:void(0)'>
											Randomness
										</a>
									</li> */}
									{/* <li className='footer__list__item'>
										<a
											target='_blank' rel="noopener noreferrer"
											href='https://docs.usdao.io/usdao-1/usdao-stack/usdao-apis'
										>
											External API Calls
										</a>
									</li> */}
									{/* <li className='footer__list__item'>
										<a target='_blank' rel="noopener noreferrer" href='javascript:void(0)'>
											Contact Reference
										</a>
									</li> */}
									{/* <li className='footer__list__item'>
										<a
											target='_blank' rel="noopener noreferrer"
											href='https://docs.usdao.io/usdao-1/usdao-stack/smart-contract-modules'
										>
											Node Operators
										</a>
									</li> */}
								</ul>
							</div>
							<div className='col-12 text-center text-md-left col-md-3 mt-3 '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										Partners
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/usdao-foundation/role-of-usdao-foundation'
										>
											USDAO Foundation
										</a>
									</li>
								</ul>
							</div>
							<div className='col-12 text-center text-md-left col-md-6 mt-6 '>
								<ul>
									<li
										className='footer__list__title'
										
									>
										Use Cases
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/docs/how-to/staking'
										>
											USDAO Staking
										</a>
									</li>

									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/startups-funding'
										>
											Startups funding
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/game-economy'
										>
											Game Economics and NFT{' '}
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/funding-tree-launchpad-decentralized'
										>
											Funding Tree: Launchpad Decentralized{' '}
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/power-stake'
										>
											Power Stake{' '}
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/universal-swap'
										>
											Universal Swap{' '}
										</a>
									</li>
									<li className='footer__list__item'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/remittance'
										>
											Remittance{' '}
										</a>
									</li>
									<li className='footer__list__item hide'>
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://docs.usdao.io/usdao-1/potential-use-cases/'
										>
											View All
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='footer__bottom hide'>
						Digital assets are subject to a number of risks, including price
						volatility. Transacting in digital assets could result in
						significant losses and may not be suitable for some consumers.
						Digital asset markets and exchanges are not regulated with the same
						controls or customer protections available with other forms of
						financial products and are subject to an evolving regulatory
						environment. Digital assets do not typically have legal tender
						status and are not covered by deposit protection insurance. The past
						performance of a digital asset is not a guide to future performance,
						nor is it a reliable indicator of future results or performance.
						Additional disclosures can be found on the Legal and Privacy page.
						<div className='footer__bottom'>
							© 2021 USDAO. All Rights Reserved
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default HomeFooter
