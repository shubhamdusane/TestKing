import { ethers } from 'ethers'
import React, { useState, useEffect } from 'react'
import AppLayout from '../../HOC/Layout'
import cn from 'classnames'
import { Button } from 'antd'
import { decimalPlaces } from '../../../utils'
import {
	setNoBufferFn,
	getTokenBalanceFn,
	getBufferRotationFn,
	getBufferPool,
	getReservePool,
	getAccumulatedFee,
	getNextFetchBalance,
	getUSDAOAdd,
	getStakingAdd,
	getBufferPoolAdd
} from '../../../redux/staking'

const StakingAdminComp = ({ history }) => {
	const [setBufferInput, setNoBufferInput] = useState(),
		[bufferPool, setBufferPool] = useState(0),
		[bufferInputDisable, setBufferInputDisable] = useState(false),
		[stakeBalance, setStakeBalance] = useState(0),
		[reservePool, setReservePool] = useState(),
		[accumulatedFee, setAccumulatedFee] = useState(0),
		[nextFetchBalane, setNextFetchBalane] = useState(),
		[nextFetchBalaneTime, setNextFetchBalaneTime] = useState(),
		[USDAOAddress, setUSDAOAddress] = useState(),
		[stakingAddress, setStakingAddress] = useState(),
		[bufferPoolAdd, setBufferPoolAdd] = useState(),
		[bufferRotation, setBufferRotation] = useState('0.00')

	const onChangeBuffer = (e) => {
		setNoBufferInput(e.target.value)
	}

	useEffect(async () => {
		await getNextFetchBalance(setNextFetchBalane, setNextFetchBalaneTime)
		await getUSDAOAdd(setUSDAOAddress)
		await getStakingAdd(setStakingAddress)
		await getBufferPoolAdd(setBufferPoolAdd)
		await getTokenBalanceFn(setStakeBalance)
		await getBufferPool(setBufferPool)
		await getBufferRotationFn(setBufferRotation)
		getAccumulatedFee(setAccumulatedFee)
	}, [])

	return (
		<AppLayout>
			<div className='admin-dash'>
				<div className='card '>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getUSDAOAdd(setUSDAOAddress)
									}}
								>
									USDAO ADDRESS
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={USDAOAddress} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getStakingAdd(setStakingAddress)
									}}
								>
									STAKING ADDRESS
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={stakingAddress} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getBufferPoolAdd(setBufferPoolAdd)
									}}
								>
									BUFFER POOL ADDRESS
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={bufferPoolAdd} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getTokenBalanceFn(setStakeBalance)
									}}
								>
									STAKING / RESERVE POOL BALANCE
								</Button>
							</div>
							<div className='col'>
								<input
									className='disabled'
									value={decimalPlaces(stakeBalance)}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => getBufferPool(setBufferPool)}
								>
									BUFFER POOL BALANCE
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={decimalPlaces(bufferPool)} />
							</div>
						</div>
						{/* <div className = 'row'>
                        <div className='col'>
                            <Button type="primary" htmlType="submit" onClick={()=>getReservePool(setReservePool)}>
                                RESERVE POOL
                            </Button>
                        </div>
                        <div className='col'>
                            <input className='disabled' value={decimalPlaces(reservePool)}/>
                        </div>
                    </div> */}
						{/* <div className = 'row'>
                        <div className='col'>
                            <Button type="primary" htmlType="submit" className = {cn(bufferInputDisable && 'disabled')} onClick = {() =>setNoBufferFn(setBufferInput,setBufferInputDisable, setNoBufferInput) }>
                                SET NO. OF BUFFER
                            </Button>
                        </div>
                        <div className='col '>
                        <input placeholder='Enter Buffer' onChange = {onChangeBuffer}/>
                        </div>
                    </div> */}
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getBufferRotationFn(setBufferRotation)
									}}
								>
									CURRENT BUFFER ROTATION
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={bufferRotation} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => getAccumulatedFee(setAccumulatedFee)}
								>
									ACCUMULATED FEE
								</Button>
							</div>
							<div className='col'>
								<input
									className='disabled'
									value={decimalPlaces(accumulatedFee)}
								/>
							</div>
						</div>
						{/* <div className = 'row'>
                        <div className='col-6'>
                            <Button type="primary"  className='disabled' htmlType="submit" >
                                NEXT FETCH BALANCE
                            </Button>
                        </div>
                        <div className='col-3'>
                            <input  className='disabled' value={nextFetchBalane}/>
                        </div>
                        <div className='col-3'>
                           Days Left : {nextFetchBalaneTime}
                        </div>
                    </div> */}
					</div>
				</div>
			</div>
		</AppLayout>
	)
}


const StakingAdmin = ({ history }) => {
	const [setBufferInput, setNoBufferInput] = useState(),
		[bufferPool, setBufferPool] = useState(0),
		[bufferInputDisable, setBufferInputDisable] = useState(false),
		[stakeBalance, setStakeBalance] = useState(0),
		[reservePool, setReservePool] = useState(),
		[accumulatedFee, setAccumulatedFee] = useState(0),
		[nextFetchBalane, setNextFetchBalane] = useState(),
		[nextFetchBalaneTime, setNextFetchBalaneTime] = useState(),
		[USDAOAddress, setUSDAOAddress] = useState(),
		[stakingAddress, setStakingAddress] = useState(),
		[bufferPoolAdd, setBufferPoolAdd] = useState(),
		[bufferRotation, setBufferRotation] = useState('0.00')

	

	useEffect( () => {
		(async()=>{
			await getNextFetchBalance(setNextFetchBalane, setNextFetchBalaneTime)
			await getUSDAOAdd(setUSDAOAddress)
			await getStakingAdd(setStakingAddress)
			await getBufferPoolAdd(setBufferPoolAdd)
			await getTokenBalanceFn(setStakeBalance)
			await getBufferPool(setBufferPool)
			await getBufferRotationFn(setBufferRotation)
			getAccumulatedFee(setAccumulatedFee)
		})()
		
	}, [])

	return (
		<div className='admin-dash'>
				<div className='card '>
					<div className='card-body'>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getUSDAOAdd(setUSDAOAddress)
									}}
								>
									USDAO ADDRESS
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={USDAOAddress} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getStakingAdd(setStakingAddress)
									}}
								>
									STAKING ADDRESS
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={stakingAddress} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getBufferPoolAdd(setBufferPoolAdd)
									}}
								>
									BUFFER POOL ADDRESS
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={bufferPoolAdd} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getTokenBalanceFn(setStakeBalance)
									}}
								>
									STAKING / RESERVE POOL BALANCE
								</Button>
							</div>
							<div className='col'>
								<input
									className='disabled'
									value={decimalPlaces(stakeBalance)}
								/>
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => getBufferPool(setBufferPool)}
								>
									BUFFER POOL BALANCE
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={decimalPlaces(bufferPool)} />
							</div>
						</div>
						{/* <div className = 'row'>
                        <div className='col'>
                            <Button type="primary" htmlType="submit" onClick={()=>getReservePool(setReservePool)}>
                                RESERVE POOL
                            </Button>
                        </div>
                        <div className='col'>
                            <input className='disabled' value={decimalPlaces(reservePool)}/>
                        </div>
                    </div> */}
						{/* <div className = 'row'>
                        <div className='col'>
                            <Button type="primary" htmlType="submit" className = {cn(bufferInputDisable && 'disabled')} onClick = {() =>setNoBufferFn(setBufferInput,setBufferInputDisable, setNoBufferInput) }>
                                SET NO. OF BUFFER
                            </Button>
                        </div>
                        <div className='col '>
                        <input placeholder='Enter Buffer' onChange = {onChangeBuffer}/>
                        </div>
                    </div> */}
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => {
										getBufferRotationFn(setBufferRotation)
									}}
								>
									CURRENT BUFFER ROTATION
								</Button>
							</div>
							<div className='col'>
								<input className='disabled' value={bufferRotation} />
							</div>
						</div>
						<div className='row'>
							<div className='col'>
								<Button
									type='primary'
									htmlType='submit'
									onClick={() => getAccumulatedFee(setAccumulatedFee)}
								>
									ACCUMULATED FEE
								</Button>
							</div>
							<div className='col'>
								<input
									className='disabled'
									value={decimalPlaces(accumulatedFee)}
								/>
							</div>
						</div>
						{/* <div className = 'row'>
                        <div className='col-6'>
                            <Button type="primary"  className='disabled' htmlType="submit" >
                                NEXT FETCH BALANCE
                            </Button>
                        </div>
                        <div className='col-3'>
                            <input  className='disabled' value={nextFetchBalane}/>
                        </div>
                        <div className='col-3'>
                           Days Left : {nextFetchBalaneTime}
                        </div>
                    </div> */}
					</div>
				</div>
			</div>
		
	)
}
export default StakingAdminComp

export {StakingAdmin}
