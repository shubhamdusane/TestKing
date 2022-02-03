import React, { useState, useEffect } from 'react';
import { Radio, Form, Checkbox, Slider, Button, Input, InputNumber } from 'antd';
import swal from 'sweetalert';
import cn from 'classnames';
import moment from 'moment'
import { PopoverComp } from '../../app/Governance/Popover2'
import { loadUsmBalance1 } from '../../redux/interactions';
import {
	fetchAvailableBalance,
	TVLAmount,
	fetchStakedAmount,
	fetchStakedRewards,
	ClaimTable,
	fetchRewardPercent,
	stakeUsdao,
	claimUsdao
} from '../../redux/staking';
import HomeFooter from '../../app/home/HomeFooter'
import { decimalPlaces } from '../../utils';
import { contractDetails } from '../../app/sdk/ContractDetails'
import {NavBar} from '../Home/NewHome'
import './_stake.scss';
// import Loader from "react-loader-spinner";
import Loader, { ThreeDots } from  'react-loader-spinner'
const _ = require('lodash')

const { stake: Stake } = contractDetails;


const marks = {
	1000: '1000',
	100000: '10M'
}

const dayMarks = {
	0: 'Min 0 M',
	6: 'Max 36 M'
}

function onsubmitValidation(value, validateFields, setError) {
	const err = {}
		Object.keys(validateFields).forEach((validate) => {
	    if (!_.isEmpty(value)) {
			if (validateFields[validate].required) {
				if (
					(typeof value[validate] !== 'boolean' &&
						(!value[validate] || value[validate] === '' || !value[validate].length) &&
						validateFields[validate].required)
				) {
					const { errorMessage } = validateFields[validate]
					err[validate] = errorMessage
					setError({ ...err })
					return err
				}
			}
			return err
        }else if(validateFields[validate].required){
            const { errorMessage } = validateFields[validate]
                    err[validate] = errorMessage
                    setError({ ...err })
        }
		})
	
	return err
}

const StakeForm = ({setUSDAOValue, availablebalance, disableStakeBtn, setStakedAmount, stakedAmount, usdao_value, setDisableStakeBtn, setClaim_Table, setAvailablebalance}) =>{

	const [form] = Form.useForm()
	const [data, setData] = useState({})
	const [error, setError] = useState({})
	
	

	const checkvalidinput = (e) => {
		setUSDAOValue(e.target.value)
		if (parseFloat(e.target.value) > parseFloat(availablebalance)) {
			setData()
			// form.resetFields()
			swal(
				`Entered Amount is more than the available balance! Please Re-enter the amount and try again`
			)
		}
		if (parseFloat(availablebalance) === parseFloat(0)) {
			// form.resetFields()
			setData()
			swal(`User has insufficient balance.`)
		}
		setData({...data, [e.target.name] : e.target.value})
	}

	const validateFields = {
        timeperiod : {
            required : true,
            errorMessage : 'Please enter the time period.'
        },
        amount : {
            required : true,
            errorMessage : 'Please enter the Amount.'
        }
    }

	const handleSubmit = async(e, form) => {
		const errorObject = await onsubmitValidation(
            data,
            validateFields,
            setError
        );
		if (!Object.keys(errorObject).length){
			var available_balance = decimalPlaces(availablebalance).replace(',', '')

			let { auto_staked = false } = data
			var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/
			if (format.test(data.amount)) {
				return swal(
					`Your entered amount is not in correct format. Please correct and retry.`
				)
			}
			if (parseFloat(data.amount) < 100) {
				return swal(
					`Minimum amount should be 100 USDAO! Please Re-enter the amount and try again`
				)
			}
			if (Number(data.amount) > Number(available_balance)) {
				return swal(`You do not have sufficient balance to Stake.`)
			}
			swal(
				`Are you sure you want to Stake ${data.amount} USDAO for ${data.timeperiod} months?`,
				{
					buttons: ['Cancel', true]
				}
			).then((result) => {
				if (result) {
					setDisableStakeBtn(true)
					stakeUsdao(
						Stake,
						data.timeperiod,
						data.amount,
						setDisableStakeBtn,
						form,
						auto_staked,
						setClaim_Table,
						setAvailablebalance,
						setStakedAmount,
						stakedAmount,
						availablebalance,
						setData
					)
				} else {
					// setDisableStakeBtn(false)
				}
			})
		}
	}

	const resetForm = () => {
		setUSDAOValue()
		setData()
	}


	const radioChange = (e) =>{
		setData({...data, [e.target.name] : e.target.value})
		delete error[e.target.name]
         setError({ ...error});
	}
	
	const checkBoxChange = (e) =>{
		setData({...data, [e.target.name] : e.target.checked})
		delete error[e.target.name]
         setError({ ...error});
	}

	const maxHandler = () => {
		if (parseFloat(availablebalance) === parseFloat(0)) {
			setData()
			swal(`User has insufficient balance.`)
		}else{
			let avl_bal = parseFloat(availablebalance).toFixed(2);
			delete error['amount']
         	setError({ ...error});
			setData({...data, 'amount': avl_bal })
		}
	}

	return(
		<div className='col-md-5'>
			<div className='shadow-card'>
				<div className='caption-content-prop'>Stake USDAO</div>
				<p className='label-content'>(Stake USDAO and get rewards)</p>
				<Form
					className='stakeform-v2'
					name='basic'
					form={form}
					initialValues={{
						remember: true,
					}}
					onFinish={(e) => handleSubmit(e, form)}
				>
				<p className='caption-font p-label'><span className='required'>* </span>Enter Amount</p>

				
				<div className='stake-input'>
					<input
						type='number'
						name='amount'
						placeholder='Enter Amount'
						className='input-content'
						onChange={checkvalidinput}
						value={data && data.amount || ''}
					/>
					<Button className='linear-button' onClick={e=>maxHandler()}>MAX</Button>
				</div>
				{error.amount && <p className='required'>{error.amount}</p>}
				
				<p className='caption-font p-label'><span className='required'>* </span>Select Time Period (in months)</p>
				<Radio.Group defaultValue='' value={data && data.timeperiod || ''} className='radio-grp-btn' name='timeperiod' onChange={radioChange}>
					<div className='d-flex justify-content-between'>
						<Radio value='12'>12 Months</Radio>
						<Radio value='18'>18 Months</Radio>
					</div>
					<div className='d-flex  justify-content-between'>
						<Radio value='24'>24 Months</Radio>
						<Radio value='30'>30 Months</Radio>
					</div>
					<div className='d-flex  justify-content-between'>
						<Radio value='5'>5 Minutes</Radio>
						<Radio value='10'>10 Minutes</Radio>
					</div>
				</Radio.Group>
				{error.timeperiod && <p className='required'>{error.timeperiod}</p>}
				<div className='d-flex '>
					<div style={{ color: 'white' }}>
						<Checkbox defaultChecked={false} checked={data && data.auto_staked || false} onChange={checkBoxChange} name='auto_staked'>Auto Stake</Checkbox>
					</div>
					<div className='help-icon justify-content-center align-item-center'>
						<PopoverComp
							content='By enabling this, you will keep receiving interest on your staked amount, in case you do not claim it after Staking period is over.'
							margin={true}
						/>
					</div>
				</div>
				
				<div className='d-flex mt-4'>
					<Button
						type='primary'
						htmlType='submit'
						className={cn(
							'mx-2 linear-button',
							disableStakeBtn && 'disabled'
						)}
					>
						STAKE
					</Button>
					<Button
						type='primary'
						onClick={resetForm}
						className={cn(
							'mx-2  linear-button',
							disableStakeBtn && 'disabled'
						)}
					>
						RESET
					</Button>
				</div>
				</Form>
			</div>
		</div>
	)
}

const RangeInput = ({rewardPercent}) => {
	const [stakeSelected, setStakeSelected] = useState(50000),
	[timeSelected, setTimeSelected] = useState(2),
	maxStake = 100000,
	maxTime = 6,
	finalValue = (stakeSelected * (timeSelected / 2) * 6)/100,
	stakeChange = (e, stake)=>{
	  stake === 'stake' && setStakeSelected(e);
	  stake === 'time' && setTimeSelected(e);
	},
	toPercent = (stakeSelected * 100)/maxStake,
	toPercentTime = (timeSelected * 100)/maxTime;
	return (
	<div className='col-md-4'>
		<div className='shadow-card-1'>
			<p className='caption-content-prop'>Estimate Your Reward</p>

			<div className='slider-content my-4'>
				<p className='label-content py-2'>
					You Stake {stakeSelected} USDAO
				</p>

				<Slider
					defaultValue={stakeSelected}
					min={1000}
					max={100000}
					marks={marks}
					onChange = {(e) =>{stakeChange(e, 'stake')}}
				/>
			</div>

			<div className='slider-content my-4'>
				<p className='label-content py-2'>Locking it for {timeSelected * 6} days</p>
                {/* <input type="range" id="vol" name="vol" min="0" max={'6'} defaultValue={timeSelected}  className='form-control-range' onChange = {(e) =>{stakeChange(e, 'time')}}/> */}

				<Slider
					defaultValue={timeSelected}
					min={0}
					max={6}
					marks={dayMarks}
					onChange = {(e) =>{stakeChange(e, 'time')}}
				/>
			</div>
		</div>
		<div className='linear-button estimated-div'>
			<div className='d-flex justify-content-between'>
				<div>
					<p className='caption-content p-color'>Your Estimated Reward</p>
					<p className='caption-content-prop p-color'>{Number(stakeSelected) + Number(finalValue)}  USDAO</p>
				</div>

				<div>
					<p className='caption-content p-color'>Fixed APR</p>
					<p className='caption-content-prop p-color'>{rewardPercent || 6}%</p>
				</div>
			</div>
		</div>
	</div>
	)
}

const RewardHistory = ({claim_Table,
	setClaim_Table,
	setStakedAmount,
	setAvailablebalance,
	stakedAmount}) =>{

		const [disableClaim, setDisableClaimbtn] = useState(false);
		const [loader, setLoader] = useState(false);

		useEffect(() => {
			setLoader(true)
			ClaimTable(setClaim_Table, setStakedAmount, setLoader)
		}, [])

		const renderTableData = () => {
			const claimform = async (StakeId) => {
				swal(`Are you sure you want to Claim ?`, {
					buttons: ['Cancel', true]
				}).then((result) => {
					if (result) {
						setDisableClaimbtn(true)
						claimUsdao(
							Stake,
							StakeId,
							setStakedAmount,
							stakedAmount,
							setDisableClaimbtn,
							setAvailablebalance,
							setClaim_Table,
							setStakedAmount
						)
					}
				})
			}

			const usdaoColor = () =>{
				return(
					<>USDAO</>
				)
			}

			return (
				!!claim_Table.length ?
				claim_Table.map((val, key) => {
					const diableButton = () => {
						const unixDate = moment(new Date(), 'M/D/YYYY H:mm').unix()
						if (unixDate * 1000 < val.claim_enableTime * 1000) {
							return true
						}
						if (unixDate * 1000 > val.unixdate * 1000) {
							return false
						} else {
							return true
						}
					}
					// <div className='usdao-color'> &thinsp; USDAO</div>
					return (
						<tr key={key}>
							<td scope='row'>{key + 1}</td>
							<td>{val.StakeId}</td>
							<td>{decimalPlaces(val.amount, 4)} <span className='usdao-color'> &thinsp; USDAO</span></td>
							<td>{decimalPlaces(val.rewardtimeperiod, 4)} <span className='usdao-color'> &thinsp; USDAO</span></td>
							<td>{val.timeperiod} Months</td>
							<td>{val.startTime}</td>
							<td>{val.stakingType ? 'Enable' : 'Disable'}</td>
							<td>
								{val.claimed ? (
									'Rewarded'
								) : (
									<Button
										type='primary'
										className={cn('linear-button claim-btn', (disableClaim || diableButton()) && 'disableClaim')}
										onClick={() => claimform(val.StakeId)}
										disabled={disableClaim || diableButton()}
									>
										{' '}
										CLAIM{' '}
									</Button>
								)}
							</td>
						</tr>
					)
				}) : 
				<tr>
				<td colSpan={8}>
				<div className='no-data'>
					No Data Found
				</div>

				</td>
			</tr>
			)
		}

	return(
		<div className='row mt-5'>
			<div className='shadow-card-2 table-card reward-table margin-0-10'>
				<p className='caption-content-prop py-4'>Reward History</p>
				<div className='table-wrapper'>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>S.No</th>
							<th scope='col'>StakeId</th>
							<th scope='col'>Staked Amount</th>
							<th scope='col'>Reward</th>
							<th scope='col'>Time Period</th>
							<th scope='col'>Staked Date</th>
							<th scope='col'>Auto Staked </th>
							<th scope='col'>Action</th>
						</tr>
					</thead>
					
					<tbody className='table-striped'>
						{loader ? 
						<tr>
							<td colSpan={8}>
							<div className='spinner'>

							<ThreeDots color="#F85E11" height={100} width={100} />
							</div>

							</td>
						</tr> : 

						renderTableData()}
					</tbody>


				</table>
				</div>
			</div>
		</div>
	)
}

const StakeMain = () => {

	const [availablebalance, setAvailablebalance] = useState()
	const [stakedAmount, setStakedAmount] = useState(0)
	const [usmbalance, setUsmbalance] = useState()
	const [usdao_value, setUSDAOValue] = useState()
	const [rewardPercent, setRewardPercent] = useState()
	const [stakedRewards, setStakedRewards] = useState()
	const [tvlAmount, settvlAmount] = useState()
	const [claim_Table, setClaim_Table] = useState([])
	const [darkMode, setDarkMode] = useState(false);
	const [disableStakeBtn, setDisableStakeBtn] = useState(false);

	useEffect(() => {
		fetchAvailableBalance(setAvailablebalance)
		fetchStakedAmount(setStakedAmount);
		fetchStakedRewards(setStakedRewards)
		TVLAmount(settvlAmount)
		loadUsmBalance1(setUsmbalance)
		ClaimTable(setClaim_Table)
		fetchRewardPercent(setRewardPercent)
	}, [])

	const setValue = () =>{
		setDarkMode(!darkMode)
	}

	return (
		<>
		<div  className={cn('staking-dashboard', { light: darkMode })}>
			<div className='pl-5 pr-5'>
				<NavBar setDarkMode={setDarkMode} darkMode={darkMode}/>
			</div>
			<div className='staking-dashboard-wrap'>

				<div className='row my-4'>
					<div className='col-md-3'>
						<div className='shadow-card-2 d-flex mb-5'>
							<img src={require('../../assets/images/cup.svg')} alt='' />
							<div className='ml-3'>
								<div className='caption-content'>Total Rewards</div>
								<div className='caption-content'>{rewardPercent}% Yearly</div>
							</div>
						</div>
						<div className='shadow-card-2 my-4 mb-5'>
							<div className='caption-content'>Total Staked</div>
							<div className='caption-content d-flex'>{decimalPlaces(stakedAmount)} <div className='usdao-color'>&thinsp; USDAO</div></div>
						</div>
						<div className='shadow-card-2 mt-5'>
							<div className='caption-content'>Available Balance</div>
							<div className='caption-content d-flex'>{decimalPlaces(availablebalance)} <div className='usdao-color'>&thinsp; USDAO</div></div>
						</div>
					</div>
					<StakeForm setUSDAOValue={setUSDAOValue} setStakedAmount={setStakedAmount} stakedAmount={stakedAmount} setClaim_Table={setClaim_Table} setAvailablebalance={setAvailablebalance} disableStakeBtn={disableStakeBtn} setDisableStakeBtn={setDisableStakeBtn} availablebalance={availablebalance} usdao_value={usdao_value}/>
					<RangeInput rewardPercent={rewardPercent}/>
				</div>
				<RewardHistory 
					setClaim_Table={setClaim_Table}
					claim_Table={claim_Table}
					setStakedAmount={setStakedAmount}
					stakedAmount={stakedAmount}
					setAvailablebalance={setAvailablebalance}
				/>
			</div>
		</div>
		{/* <HomeFooter /> */}
		</>

	)
}

export default StakeMain
