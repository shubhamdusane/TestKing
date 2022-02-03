import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { DownOutlined } from '@ant-design/icons'

const Calculateform = (props) => {
	const { handleSubmit, submitting, onChange } = props
	return (
		<form
			onSubmit={handleSubmit}
			onChange={onChange}
			className='d-flex justify-content-between flex-wrap pool_selector'
		>
			{/* <div class='dropdown w-lg-80'> */}
			<div className='row'>
				<div className='col-md-8 my-2 dropdown'>
					<div class='pool_selector_input-button d-flex justify-content-between'>
						Type of Fee <DownOutlined />
					</div>
					<div class='dropdown-content'>
						<div>
							<Field
								type='checkbox'
								id='BurnFee'
								name='BurnFee'
								component='input'
								style={{ margin: '1rem' }}
							/>
							<label for='BurnFee' style={{ color: 'grey' }}>
								{' '}
								USDAO Burn
							</label>
							<br />
						</div>
						<div>
							<Field
								type='checkbox'
								id='DefundFee'
								name='DefundFee'
								component='input'
								style={{ margin: '1rem' }}
							/>
							<label for='DefundFee' style={{ color: 'grey' }}>
								{' '}
								ASSET Burn
							</label>
							<br />
						</div>
						<div>
							<Field
								type='checkbox'
								id='TaxFee'
								name='TaxFee'
								component='input'
								style={{ margin: '1rem' }}
							/>
							<label for='TaxFee' style={{ color: 'grey' }}>
								{' '}
								ASSET MINT
							</label>
							<br />
						</div>
						<div>
							<Field
								type='checkbox'
								id='USDAOMintFee'
								name='USDAOMintFee'
								component='input'
								style={{ margin: '1rem' }}
							/>
							<label for='USDAOMintFee' style={{ color: 'grey' }}>
								{' '}
								USDAO MINT
							</label>
							<br />
						</div>
						<div>
							<Field
								type='checkbox'
								id='TransferFee'
								name='TransferFee'
								component='input'
								style={{ margin: '1rem' }}
							/>
							<label for='TransferFee' style={{ color: 'grey' }}>
								{' '}
								USDAO Transfer
							</label>
							<br />
						</div>
						{/* <a href="#">BurnFee</a>
                    <a href="#">DefundFee</a>
                    <a href="#">TaxFee</a>
                    <a href="#">USDAOMintFee</a>
                    <a href="#">TransferFee</a> */}
					</div>
				</div>

				{/* <Button className="pool_selector_input-button-one" type="primary" >
                    Calculate
                </Button> */}
				<div className='col-md-4 my-2'>
					<button
						className='pool_selector_input-button-one'
						type='submit'
						disabled={submitting}
					>
						Calculate
					</button>
				</div>
			</div>
		</form>
	)
}

export default reduxForm({
	form: 'Calculateform' // a unique identifier for this form
})(Calculateform)
