import React from 'react'

function JoinUs() {
	return (
		<>
			<div className='col-12 pb-5 m-auto community__section position__relative'>
				{/* <div className='community__bg'>
                    <img alt="#" src={require('../../assets/images/community__bg.png')} />
                </div> */}
				<div className='col-12 community__title pb-2'>
					Join global open source community
				</div>
				{/* <div className="d-flex justify-content-center w-100">
                    <div className="community__line"></div>
                </div> */}
				<div className='row px-5'>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() => window.open('https://t.me/usdaoofficial')}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/Vector.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>Telegram</span>
							</div>
						</div>
					</div>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() =>
							window.open(
								'https://discord.com/login?redirect_to=%2Fchannels%2F826560976509206528%2F826560976509206532'
							)
						}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/discord 1.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>Discord</span>
							</div>
						</div>
					</div>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() => window.open('https://github.com')}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/github 1.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>Github</span>
							</div>
						</div>
					</div>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() => window.open('https://www.reddit.com/user/USDAO')}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/reddit.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>Reddit</span>
							</div>
						</div>
					</div>
				</div>
				<div className='row px-5'>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() => window.open('https://twitter.com/usdao_io')}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/tweeter 1.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>Twitter</span>
							</div>
						</div>
					</div>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() =>
							window.open(
								'https://www.facebook.com/USDAO-111790941005211/?ref=pages_you_manage'
							)
						}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#"
									src='/assets/facebook-app-symbol 1.png'
									className='img-fluid'
								/>
							</div>
							<div className='col-8  text-left'>
								<span>Facebook</span>
							</div>
						</div>
					</div>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() =>
							window.open('https://www.linkedin.com/company/usdaoofficial')
						}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/linkedin 1.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>LinkedIN</span>
							</div>
						</div>
					</div>
					<div
						className='col-md-3 my-4 link_button_hover'
						onClick={() => window.open('https://medium.com/@usdao')}
					>
						<div
							className='row link__buttons mx-2 py-4 d-flex align-items-center'
							style={{ height: '100%' }}
						>
							<div className='col-4  text-right'>
								<img alt="#" src='/assets/Group 260.png' className='img-fluid' />
							</div>
							<div className='col-8  text-left'>
								<span>Medium</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default JoinUs
