import React, { useEffect, useState } from 'react'
import { usmContractSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import { readContractFunction, writeContractFunction } from '../sdk/tradingSdk'
import { ethers } from 'ethers'
import { decimalPlaces } from '../../utils'

function Intro(props) {
	const { myRef, usmSupply, setUsmSupply, fumSupply, setFumSupply, mode } =
		props

	const [govSupply, setgovSupply] = useState('00.0000')

	useEffect(() => {
		;(async () => {
			const usmCont = await readContractFunction('usm')
			const usmTotalSupply = await usmCont.totalSupply()
			const formatedUsmSupply = decimalPlaces(
					ethers.utils.formatEther(usmTotalSupply),
					4
				),
				{ totalSupply: fumTotalSupplyFum } = await readContractFunction('fum'),
				fumTotalSupply = await fumTotalSupplyFum(),
				formatedFumSupply = decimalPlaces(
					ethers.utils.formatEther(fumTotalSupply),
					4
				)
			setFumSupply(formatedFumSupply)
			setUsmSupply(formatedUsmSupply)

			const { totalSupply: govTotalSupplyGov } = await readContractFunction(
					'comp'
				),
				govTotalSupply = await govTotalSupplyGov(),
				formatedGovSupply = decimalPlaces(
					ethers.utils.formatEther(govTotalSupply),
					4
				)

			const tokenSaleContract = await writeContractFunction('tokenSale')
			const compSaleContract = await writeContractFunction('comp')

			const finalValue = (
				(Number(await compSaleContract.totalSupply()) -
					Number(await tokenSaleContract.currentTotalTokens())) /
				10e17
			).toLocaleString()

			console.log(usmTotalSupply, 'usm totl s')

			setgovSupply(finalValue)
		})()
	}, [])

	const onClick = () => {
			myRef.current.focus()
		},
		particleColor = mode ? '#ffffff' : '#000000'
	return (
		<div className='introWrapper'>
			<div className='particleWrapper'></div>
			<div className='col-9 text-left demo-content ml-auto mr-auto'>
				<div className='intro__title__height'>
					<div className='intro__title'>
						Truly decentralized <br />
						<span style={{ color: '#F85E11' }}>GLOBAL DIGITAL CURRENCY</span>
					</div>
					<div className=''>
						<div className='d-flex text-center mt-1'>
							<div className='flex-1 info__amount'>
								USDAO is a fast, secure and censorship resistant protocol
								providing liquidity and the open infrastructure required for
								global adoption.
							</div>
						</div>
					</div>
					{/* <div className='d-flex justify-content-center flex-wrap'>
						<div className='d-flex justify-content-center text-center mt-5 w-100'> */}
					{/* <div className='btn navbar__button text-center'> */}
					<div className='row mt-3'>
						<div className='col-md-6 text-lg-right text-center my-2'>
							<button className='orange__button mx-4' onClick={onClick}>
								START INVESTING
							</button>
						</div>
						<div className='col-md-6 text-lg-left my-2 text-center'>
							<button className='orange__button mx-4'>
								<a
									href='https://docs.usdao.io/'
									style={{ color: 'white' }}
									target='_blank'
								>
									READ THE DOCS
								</a>
							</button>
						</div>
					</div>
					{/* <span
								style={{ textDecoration: 'none', color: 'white' }}
								className='readDoc'
								onClick={() => {
									onClick()
								}}
							>
								START INVESTING
							</span> */}
					{/* </div> */}
					{/* <a
								className='readDoc'
								href='https://docs.usdao.io/'
								target='_blank'
							>
								READ THE DOCS
							</a> */}
					{/* </div>
					</div> */}
				</div>
			</div>

			<div className='row supplyWrapper'>
				<div className='col-md-4'>
					<div className='card-wrap'>
						<div className='row '>
							<div className='col-3 image'>
								<img
									className='pr-2 pl-4 head-logo'
									src={require('../../assets/images/logo.png')}
									alt='usdao'
								/>
							</div>
							<div className='col-9 data'>
								<p className='text'>USDAO in Circulation</p>
								<p className='figure'>{usmSupply && usmSupply}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='col-md-4'>
					<div className='card-wrap'>
						<div className='row '>
							<div className='col-3 image'>
								<img
									className='pr-2 pl-4 head-logo'
									src={require('../../assets/images/gov.png')}
									alt='gov'
								/>
							</div>
							<div
								className='col-9 data'
								style={{
									wordWrap: 'break-word',
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-word'
								}}
							>
								<p className='text'>Governance in Circulation</p>
								<p className='figure'>{govSupply}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='col-md-4'>
					<div className='card-wrap'>
						<div className='row '>
							<div className='col-3 image'>
								<img
									className='pr-2 pl-4 head-logo'
									src={require('../../assets/images/fum.png')}
									alt='asset'
								/>
							</div>
							<div className='col-9 data'>
								<p className='text'>ASSET in Circulation</p>
								<p className='figure'>{fumSupply}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

//export default Intro

const mapStateToProps = (state) => {
	const usmContract = usmContractSelector(state)

	return {
		usmContract
	}
}

export default connect(mapStateToProps)(Intro)
