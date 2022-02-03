import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	metamaskSelector,
	metamaskSignerSelector,
	networkProviderSelector,
	metamaskUSMSelector
} from '../../redux/selectors'
import { ERCTOKEN_TO_WETH, buyUSM, loadNetwork } from '../../redux/interactions'
import defiTokens from '../../cryptos_abi.json'

function PayUsingToken({
	dispatch,
	metamaskSigner,
	networkProvider,
	metamaskUSM
}) {
	const [usdrOptions, setUsdrOptions] = useState([])
	const [form, setForm] = useState({ amount: 0, usdr: null })

	useEffect(() => {
		let usdr = []
		for (var key of Object.keys(defiTokens)) {
			usdr.push(defiTokens[key])
		}
		setUsdrOptions(usdr)
	}, [])

	const changeInput = (e) => {
		const { name, value } = e.target
		setForm({ ...form, [name]: value })
	}

	const submit = async () => {
		const response = await ERCTOKEN_TO_WETH(
			metamaskSigner,
			form.amount,
			usdrOptions.find((v) => v.name === form.usdr),
			networkProvider
		)
		if (response) {
			buyUSM(dispatch, metamaskUSM, metamaskSigner, response)
			loadNetwork(dispatch)
		}
	}

	return (
		<div className='card'>
			<div className='card-body'>
				<div className='d-flex'>
					<div className='flex-2'>
						<div>
							<h6>Pay using Token</h6>
							<p className='pay__sub__title'>Enter amount as input.</p>
						</div>
					</div>
					<div className='custom__dropdown flex-1'>
						<select
							className=''
							defaultValue=''
							style={{ width: 170, height: 30 }}
							name='usdr'
							onChange={changeInput}
						>
							<option disabled value=''>
								Select ERC20 Token
							</option>
							{usdrOptions &&
								usdrOptions.length > 0 &&
								usdrOptions.map((option, i) => (
									<option key={i} value={option.name}>
										{option.name}
									</option>
								))}
						</select>
					</div>
				</div>

				<div className='col-12 mt-3 p-0'>
					<div className='custom__pay__input d-flex'>
						<div className='flex-1 amount__section'>Amount</div>
						<div className='flex-3 text-right amount__value'>
							<input
								type='number'
								onChange={changeInput}
								value={form.amount}
								name='amount'
							/>
						</div>
					</div>
				</div>

				{/* <div className="col-12 mt-3 p-0">
                  <div className="custom__pay__input d-flex">
                    <div className="flex-1 amount__section">
                      Address
                    </div>
                    <div className="flex-3 text-right amount__value">
                      0xasdasdasfasfsdgdgasdf
                    </div>
                  </div>
                </div> */}

				{/* <div className="row mt-4">
                  <div className="col-3 col-md-3">
                    <img src={require('../../assets/images/grey__box.png')} className="img-fluid" />
                  </div>

                  <div className="col-3 col-md-3">
                    <img src={require('../../assets/images/grey__box.png')} className="img-fluid" />
                  </div>

                  <div className="col-3 col-md-3">
                    <img src={require('../../assets/images/grey__box.png')} className="img-fluid" />
                  </div>

                  <div className="col-3 col-md-3">
                    <img src={require('../../assets/images/grey__box.png')} className="img-fluid" />
                  </div>
                </div> */}

				<div className='d-flex mt-5'>
					<div className='flex-1'>
						{/* <p className="submit__info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p> */}
					</div>
					<div className='flex-1 ml-auto mr-auto'>
						<button className='custom__transfer__button' onClick={submit}>
							TRANSFER NOW
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const metamask = metamaskSelector(state)
	const metamaskConnected = metamask != null
	return {
		metamaskConnected,
		metamaskSigner: metamaskSignerSelector(state),
		networkProvider: networkProviderSelector(state),
		metamaskUSM: metamaskUSMSelector(state)
	}
}

export default connect(mapStateToProps)(PayUsingToken)
