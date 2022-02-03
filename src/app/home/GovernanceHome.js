import React, { useState } from 'react'

function GovernanceHome({ history }) {
	const [amount, setAmount] = useState(1)
	const [yearlyReward, setYearlyReward] = useState({ usd: 0.0, usdao: 1.0 })
	const [monthlyReward, setMonthlyReward] = useState({ usd: 0.0, usdao: 1.0 })
	const [weeklyReward, setWeeklyReward] = useState({ usd: 0.0, usdao: 1.0 })
	const [dailyReward, setDailyReward] = useState({ usd: 0.0, usdao: 1.0 })

	// const inputChange = (e) => {
	// 	let input_amount = e.target.value
	// 	setAmount(input_amount)
	// 	setYearlyReward({ usd: (input_amount * 20) / 100, usdao: 1.0 })
	// 	setMonthlyReward({ usd: (input_amount * 20) / 100 / 12, usdao: 1.0 })
	// 	setWeeklyReward({ usd: (input_amount * 20) / 100 / 52, usdao: 1.0 })
	// 	setDailyReward({ usd: (input_amount * 20) / 100 / 365, usdao: 1.0 })
	// }
	return (
		<>
			<div className='container-fluid' style={{ backgroundColor: '#201668' }}>
				<div className='row'>
					<div className='col-12 p-5 d-flex'>
						<div className='flex-1' onClick={() => history.push('/')}>
							<img alt="#"
								src={require('../../assets/images/Group12150.png')}
								className='img-fluid'
								style={{ height: '5vh' }}
							/>
						</div>
						<span className='governance__title'>GOVERNANCE</span>
					</div>
					<div className='col-12 col-md-7 mt-4 mb-4 mr-auto ml-auto top__section__description text-center'>
						Governance Overview
					</div>
				</div>
			</div>
			<div
				className='container-fluid position-relative'
				style={{ backgroundColor: '#201668' }}
			>
				<div className='col-9 m-auto bg__box'></div>
				<div className='col-8 mr-auto ml-auto pl-0 pr-0 pt-5'>
					<div className='row'>
						<div className='col-12 col-sm-12 col-md-6 mt-2'>
							<div className='votes__delegated'>6,844 Votes Delegated</div>
						</div>
						<div className='col-12 col-sm-12 col-md-6 mt-2'>
							<div className='votes__delegated'>654 Voting Address</div>
						</div>
					</div>
				</div>
				<div className='col-8 ml-auto mr-auto recent__proposals mt-5 pt-5 pl-5 pr-5'>
					<div className='row'>
						<div className='col-12 p-0 recent__proposal__title'>
							Recent Proposals
						</div>
						<div className='governance mt-4'></div>
						<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
							<div className='row'>
								<div className='col-12 col-md-8'>
									<div className='recent__proposal__title'>
										Migration to Governor Bravo
									</div>
									<div className='d-flex'>
										<div className='success__status__bar'>Passed</div>
										<div className='time__bar'>
											042 - Executed April 08, 2021
										</div>
									</div>
								</div>
								<div className='col-12 col-md-4 m-auto'>
									<div className='d-flex'>
										<div className=''>
											<img alt="#" src='/assets/response.png' />
										</div>
										<div className='ml-3 response__bar'>EXECUTED</div>
									</div>
								</div>
							</div>
						</div>

						<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
							<div className='row'>
								<div className='col-12 col-md-8'>
									<div className='recent__proposal__title'>
										Legacy Market Migration
									</div>
									<div className='d-flex'>
										<div className='failed__status__bar'>Failed</div>
										<div className='time__bar'>
											042 - Executed April 08, 2021
										</div>
									</div>
								</div>
								<div className='col-12 col-md-4 m-auto'>
									<div className='d-flex'>
										<div className=''>
											<img alt="#" src='/assets/failed__response.png' />
										</div>
										<div className='ml-3 response__bar'>FAILED</div>
									</div>
								</div>
							</div>
						</div>

						<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
							<div className='row'>
								<div className='col-12 col-md-8'>
									<div className='recent__proposal__title'>
										Compount Grant Program
									</div>
									<div className='d-flex'>
										<div className='success__status__bar'>Passed</div>
										<div className='time__bar'>
											042 - Executed April 08, 2021
										</div>
									</div>
								</div>
								<div className='col-12 col-md-4 m-auto'>
									<div className='d-flex'>
										<div className=''>
											<img alt="#" src='/assets/response.png' />
										</div>
										<div className='ml-3 response__bar'>EXECUTED</div>
									</div>
								</div>
							</div>
						</div>

						<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
							<div className='row'>
								<div className='col-12 col-md-8'>
									<div className='recent__proposal__title'>
										ZRX, BAT Parameter Update
									</div>
									<div className='d-flex'>
										<div className='success__status__bar'>Passed</div>
										<div className='time__bar'>
											042 - Executed April 08, 2021
										</div>
									</div>
								</div>
								<div className='col-12 col-md-4 m-auto'>
									<div className='d-flex'>
										<div className=''>
											<img alt="#" src='/assets/response.png' />
										</div>
										<div className='ml-3 response__bar'>EXECUTED</div>
									</div>
								</div>
							</div>
						</div>

						<div className='col-12 pointer view__all__proposals justify-content-center p-5'>
							View All Proposals
						</div>
					</div>
				</div>
			</div>

			<div className='' style={{ backgroundColor: '#201668' }}>
				<img alt="#"
					src='/assets/top__section__govern.png'
					className='img-fluid mb-5 top__section__govern'
				/>
			</div>
			<div className='container-fluid' style={{ backgroundColor: '#201668' }}>
				<div className='row'>
					<div className='col-12 col-md-7 mt-4 mb-4 mr-auto ml-auto top__section__description text-center'>
						Top Address by Voting Weight
					</div>
				</div>
			</div>
			<div
				className='col-12 ml-auto mr-auto recent__proposals'
				style={{ backgroundColor: '#201668 !important' }}
			>
				<div className='row p-5'>
					<div className='col-12 p-0 recent__proposal__title'>
						Recent Proposals
					</div>
					<div className='governance mt-4'></div>
					<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
						<div className='row'>
							<div className='col-12 col-md-8'>
								<div className='recent__proposal__title'>
									Migration to Governor Bravo
								</div>
								<div className='d-flex'>
									<div className='success__status__bar'>Passed</div>
									<div className='time__bar'>042 - Executed April 08, 2021</div>
								</div>
							</div>
							<div className='col-12 col-md-4 m-auto'>
								<div className='d-flex'>
									<div className=''>
										<img alt="#" src='/assets/response.png' />
									</div>
									<div className='ml-3 response__bar'>EXECUTED</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
						<div className='row'>
							<div className='col-12 col-md-8'>
								<div className='recent__proposal__title'>
									Legacy Market Migration
								</div>
								<div className='d-flex'>
									<div className='failed__status__bar'>Failed</div>
									<div className='time__bar'>042 - Executed April 08, 2021</div>
								</div>
							</div>
							<div className='col-12 col-md-4 m-auto'>
								<div className='d-flex'>
									<div className=''>
										<img alt="#" src='/assets/failed__response.png' />
									</div>
									<div className='ml-3 response__bar'>FAILED</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
						<div className='row'>
							<div className='col-12 col-md-8'>
								<div className='recent__proposal__title'>
									Compount Grant Program
								</div>
								<div className='d-flex'>
									<div className='success__status__bar'>Passed</div>
									<div className='time__bar'>042 - Executed April 08, 2021</div>
								</div>
							</div>
							<div className='col-12 col-md-4 m-auto'>
								<div className='d-flex'>
									<div className=''>
										<img alt="#" src='/assets/response.png' />
									</div>
									<div className='ml-3 response__bar'>EXECUTED</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12 p-0 mt-3 pb-3 proposal__item'>
						<div className='row'>
							<div className='col-12 col-md-8'>
								<div className='recent__proposal__title'>
									ZRX, BAT Parameter Update
								</div>
								<div className='d-flex'>
									<div className='success__status__bar'>Passed</div>
									<div className='time__bar'>042 - Executed April 08, 2021</div>
								</div>
							</div>
							<div className='col-12 col-md-4 m-auto'>
								<div className='d-flex'>
									<div className=''>
										<img alt="#" src='/assets/response.png' />
									</div>
									<div className='ml-3 response__bar'>EXECUTED</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-12 pointer view__all__proposals justify-content-center p-5'>
						View All Proposals
					</div>
				</div>
			</div>
		</>
	)
}

export default GovernanceHome
