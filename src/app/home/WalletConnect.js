import React from 'react'


function WalletConnect({ show, setShow }) {
	return (
		<div className='row text-center pt-5 bg__dark'>
			<div className='d-flex justify-content-between flex-wrap-reverse WalletConnect'>
				{/* <p className="usdao__title text-center">USDAO</p> */}
				<div className=' col-12 col-md-5 leading_blockChains__description pt-5'>
					<p className='WalletConnect__description'>WHAT ARE YOU</p>
					<p className='WalletConnect__descriptionOne'>WAITING FOR?</p>
					<p className='WalletConnect__subdescription'>
						There’s no need to create an account! Just connect your web 3.0
						wallet and get USDAO
					</p>
					<button
						className='WalletConnect__button'
						onClick={() => {
							setShow(!show)
						}}
						disabled
					>
						CONNECT WALLET
					</button>
					<p className='WalletConnect__descriptionOne'>Coming Soon!</p>
				</div>
				<div className='col-12 col-md-5 justify-content-between d-flex flex-wrap'>
					<div className='WalletConnect_icon  m-auto'>
						<img alt="#"
							src='/assets/Group 123141.png'
							className='img-fluid m-auto p-2 pr-3 '
						/>
						<p>Metamask</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123142.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Coinbase Wallet</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123143.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Ledger</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123144.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Portis</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123146.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>WalletConnect</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123147.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Fortmatic</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123148.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Authereum</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123149.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Torus</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 1231401.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Bitski</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 1231402.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Binance Chain Wallet</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 1231403.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Arkane</p>
					</div>
					<div className='WalletConnect_icon m-auto'>
						<img alt="#"
							src='/assets/Group 123145.png'
							className='img-fluid m-auto p-2  pr-3 '
						/>
						<p>Mew</p>
					</div>
				</div>
				{/* <img alt="#" src="/assets/usdao__bottom.png" className="img-fluid mt-5 mb-5 pb-5" /> */}
				{/* <div className="text-left token__spinner">
                        <img alt="#" src="/assets/token__spinner.png" />
                    </div> */}
			</div>
			
		</div>
	)
}

export default WalletConnect
