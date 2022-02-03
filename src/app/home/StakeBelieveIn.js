import React from 'react'

function StakeBelieveIn() {
	return (
		<div className='row text-center pt-5 bg__dark'>
			<div className='col-12 p-5'>
				{/* <p className="usdao__title text-center">USDAO</p> */}
				<div className=' col-12 col-md-5 believein__heading'>
					<p
						className='leading_blockChains__description'
						style={{ fontWeight: 600 }}
					>
						Staking in 2 Easy Steps
					</p>
				</div>
				<div className='col-12'>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<div className='stake__believein_card'>
								<img alt="#"
									src='/assets/Layer_x0020_12.png'
									className='img-fluid m-auto p-2 pr-3 '
								/>
								<div className='stake__believein_card_desc'>
									<h4 style={{ fontWeight: 800, fontSize: 22 }}>
										Deposit 100 USDAO
									</h4>
									<p style={{ fontSize: 18 }}>
										Simply deposit 100 USDAO (Stable Coin) to your account to
										begin staking.
									</p>
								</div>
							</div>
						</div>
						<div className='col-12 col-md-6'>
							<div className='stake__believein_card'>
								<img alt="#"
									src='/assets/Layer_x0020_1.png'
									className='img-fluid m-auto p-2  pr-3 '
								/>
								<div className='stake__believein_card_desc'>
									<h4 style={{ fontWeight: 800, fontSize: 22 }}>
										Earn Monthly Rewards
									</h4>
									<p style={{ fontSize: 18 }}>
										Watch your account grow USDAO automatically deposits your
										staking rewards into your account weekly basis.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StakeBelieveIn
