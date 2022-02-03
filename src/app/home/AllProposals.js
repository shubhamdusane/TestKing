import React from 'react'

function GovernanceHome() {
	return (
		<>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-12 p-5 d-flex'>
						<div className='flex-1'>
							<img alt="#"
								src={require('../../assets/images/Group12150.png')}
								className='img-fluid'
								style={{ height: '5vh' }}
							/>
						</div>
						<span className='governance__title'>GOVERNANCE</span>
					</div>
					<div className='col-12 col-md-10 ml-auto mr-auto mt-5'>
						<div className='d-flex'>
							<div className='flex-1 overview'>Overview</div>
							<div className='d-flex'>
								<div className='flex-1 status__proposal ml-5'>
									<img alt="#"
										src='/assets/response.png'
										style={{ width: 20, marginRight: 5 }}
									/>{' '}
									Active
								</div>
								<div className='flex-1 status__proposal ml-5'>
									<img alt="#"
										src='/assets/response.png'
										style={{ width: 20, marginRight: 5 }}
									/>
									Passed
								</div>
								<div className='flex-1 status__proposal ml-5'>
									<img alt="#"
										src='/assets/failed__response.png'
										style={{ width: 20, marginRight: 5 }}
									/>
									Failed
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='container-fluid position-relative'>
				<div className='col-12 col-md-10 ml-auto mr-auto recent__proposals mt-5 pt-5 pl-5 pr-5'>
					<div className='row'>
						<div className='col-12 p-0 recent__proposal__title'>
							All Proposals
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

						<div className='col-12 pointer view__all__proposals justify-content-center p-5'></div>
					</div>
				</div>
			</div>

			<div className=''>
				<img alt="#"
					src='/assets/top__section__govern.png'
					className='img-fluid mb-5 top__section__govern'
				/>
			</div>
		</>
	)
}

export default GovernanceHome
