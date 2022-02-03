import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../app/App.scss'

export class ComingSoon extends Component {
	render() {
		return (
			<div className='comingsoonWrapper'>
				<img
					src='/assets/coming-soon.jpg'
					alt='coming-soon'
					className='comingsoon'
				/>
				<div className='col-12 text-center mt-xl-2 link'>
					<Link className='text-white font-weight-medium' to='/'>
						Back to home
					</Link>
				</div>
			</div>
		)
	}
}

export default ComingSoon
