import React, { useState } from 'react'
import Swal from 'sweetalert2'

import PoolNavbar from './PoolNavbar'
import PoolFees from './PoolFees'
import PoolHistory from './PoolHistory'
import HomeFooter from '../home/HomeFooter'
import classNames from 'classnames/dedupe'
import { readContractFunction, writeContractFunction } from '../sdk/tradingSdk'

import '../../app/App.scss'

function Pool({ history }) {
	const [show, setShow] = useState(false)
	const [darkMode, setDarkMode] = useState(false)

	const fundUsdaoPool = async (action) => {
		const sellTokenWriteContract = await writeContractFunction('tokenSale')
		console.log('sellTokenWriteContract', sellTokenWriteContract)

		if (action == 'pool') {
			console.log('pool')

			sellTokenWriteContract
				.fundUSDAOPool()
				.then((data) => {
					console.log('data', data)
				})
				.catch((err) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Somwthing went wrong'
					})

					console.log('error', err)
				})
		} else {
			console.log('start ico')
			sellTokenWriteContract
				.start_ICO()
				.then((data) => {
					console.log('data', data)
				})
				.catch((err) => {
					if (String(err).includes('caller is not the owner')) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Only owner can start ICO!'
						})
					}
					console.log('error', err)
				})
		}

		//console.log("poolDetails", poolDetails);
	}

	return (
		<div className={classNames('', { dark: darkMode })}>
			<div className='pool-warp'>
				{/* Comment due to add in admin page */}
				{/* <PoolNavbar
					show={show}
					setShow={setShow}
					mode={darkMode}
					setmode={setDarkMode}
				/> */}
				<div className='row'>
					<div className='col-md-12 px-5'>
						<br />
						{/* <button className='pool_selector_input-button-one' onClick={()=>{fundUsdaoPool('start')}}>START ICO</button>
					&nbsp;&nbsp;&nbsp;
				<button className='pool_selector_input-button-one' onClick={()=>{fundUsdaoPool('pool')}}>Fund USDAO Pool</button> */}
					</div>
					<div className='col-md-6'>
						<PoolFees />
					</div>
					<div className='col-md-6'>
						<PoolHistory />
					</div>
				</div>
				<HomeFooter history={history} />
			</div>
		</div>
	)
}

export default Pool
