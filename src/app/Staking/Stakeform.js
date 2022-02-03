import React, { useState, useEffect } from 'react'
import cn from 'classnames'
import { reduxForm } from 'redux-form'
import { Form, Input, Button, Radio, Checkbox } from 'antd'
import moment from 'moment'
import swal from 'sweetalert'
import { PopoverComp } from '../Governance/Popover2'
import {
	fetchAvailableBalance,
	claimEndDate,
	fetchStakedAmount,
	fetchStakedRewards
} from '../../redux/staking'

const Stakeform = (props) => {
	const [form] = Form.useForm()
	const [availablebalance, setAvailablebalance] = useState()
	const [stakedAmount, setStakedAmount] = useState()
	const [stakedRewards, setStakedRewards] = useState()
	const [claimenable, setClaimenable] = useState()
	const [claimbutton, setClaimbutton] = useState()

	const { onFinish, usdao_value, setUSDAOValue, disableStakeBtn, maxHandler } =
		props

	React.useEffect(() => {
		fetchAvailableBalance(setAvailablebalance)
		fetchStakedAmount(setStakedAmount)
		fetchStakedRewards(setStakedRewards)
		claimEndDate(setClaimenable)
	}, [])
	//  const unixDate = moment(new Date(), "M/D/YYYY H:mm").unix();
	// console.log(unixDate)

	const checkvalidinput = (data) => {
		setUSDAOValue(data.target.value)
		if (parseFloat(data.target.value) > parseFloat(availablebalance)) {
			form.resetFields()
			swal(
				`Entered Amount is more than the available balance! Please Re-enter the amount and try again`
			)
		}
		if (parseFloat(availablebalance) === parseFloat(0)) {
			form.resetFields()
			swal(`User has insufficient balance.`)
		}
	}

	const resetForm = () => {
		form.resetFields()
	}

	const diableButton = () => {
		const unixDate = moment(new Date(), 'M/D/YYYY H:mm').unix()
		if (unixDate === claimenable) {
			return false
		} else {
			return true
		}
	}

	return (
		<div className='d-flex justify-content-between flex-wrap pool_selector m-0'>
			<div className='col-md-12 grid-margin stretch-card p-0'>
				<div className='card'>
					<div className='card-body'>
						<div className='col-12 col-md-12 m-auto'>
							{/* <div className="text-center stake__card__title" style={{color: 'black'}}>
                                    Stake USDAO
                                </div> */}
							<Form
								className='stakeform'
								name='basic'
								form={form}
								labelCol={{
									span: 8
								}}
								wrapperCol={{
									span: 16
								}}
								initialValues={{
									remember: true
								}}
								onFinish={(e) => onFinish(e, form)}
								// onFinishFailed={onFinishFailed}
							>
								<Form.Item
									label='Enter Amount'
									name='amount'
									rules={[
										{
											required: true,
											message: 'Please enter the Amount.'
										}
									]}
								>
									{/* <a href='javascript:void(0)' className='max-btn' onClick={maxHandler}>Max</a> */}

									<Input
										type='number'
										style={{ color: 'black !important' }}
										onChange={checkvalidinput}
										className='stake-input'
										value={usdao_value}
									/>
								</Form.Item>

								{/* <Form.Item
                                        label="Date"
                                        name="date"
                                        Component={<DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />}
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item> */}

								{/* <DatePicker style={{color: 'black !important'}} defaultValue={moment()} format={dateFormat} onChange={date} /> */}
								<Form.Item
									label='Select Time Period (in months)'
									name='timeperiod'
									rules={[
										{
											required: true,
											message: 'Please enter the time period.'
										}
									]}
								>
									{/* <Select>
                                        <Select.Option value="6">6</Select.Option>
                                        <Select.Option value="12">12</Select.Option>
                                        <Select.Option value="24">24</Select.Option>
                                        <Select.Option value="36">36</Select.Option>
                                    </Select> */}
									<Radio.Group defaultValue='' className='radio-grp-btn'>
										<div className='d-flex row'>
											<Radio.Button value='12' className='col-sm'>
												12 Months
											</Radio.Button>
											<Radio.Button value='18' className='col-sm'>
												18 Months
											</Radio.Button>
										</div>
										<div className='d-flex row'>
											<Radio.Button value='24' className='col-sm'>
												24 Months
											</Radio.Button>
											<Radio.Button value='30' className='col-sm'>
												30 Months
											</Radio.Button>
										</div>
										<div className='d-flex row'>
											<Radio.Button value='5' className='col-sm'>
												5 Minutes
											</Radio.Button>
											<Radio.Button value='10' className='col-sm'>
												10 Minutes
											</Radio.Button>
										</div>
									</Radio.Group>
								</Form.Item>
								<div className='row d-flex auto-stake'>
									<div className='col-sm-4 checkbox-btn'>
										<Form.Item
											name='auto_staked'
											valuePropName='checked'
											defaultChecked='false'
										>
											<Checkbox defaultChecked='false'>Auto Stake</Checkbox>
										</Form.Item>
									</div>
									<div className='col-sm-6 help-icon'>
										<PopoverComp
											content='By enabling this, you will keep receiving interest on your staked amount, in case you do not claim it after Staking period is over.'
											margin={true}
										/>
									</div>
								</div>

								<Form.Item
									wrapperCol={{
										span: 16
									}}
								>
									<div className='stakebutton'>
										<Button
											type='primary'
											htmlType='submit'
											className={cn(
												'mt-4 mr-2 ml-2',
												disableStakeBtn && 'disabled'
											)}
										>
											STAKE
										</Button>
										<Button
											type='primary'
											onClick={resetForm}
											className={cn(
												'mt-4 mr-2 ml-2',
												disableStakeBtn && 'disabled'
											)}
										>
											RESET
										</Button>
									</div>
								</Form.Item>
							</Form>
							<div className='row mt-5 hide' style={{ color: 'black' }}>
								<div className='col-4'>
									<div className='stake__label'>Available Balance</div>
									<div className='stake__value'>{availablebalance} USDAO</div>
								</div>

								<div className='col-4'>
									<div className='stake__label'>Staked Amount</div>
									<div className='stake__value'>{stakedAmount}</div>
								</div>

								<div className='col-4'>
									<div className='stake__label'>Staked Rewards</div>
									<div className='stake__value'>{stakedRewards} USDAO</div>
								</div>
							</div>
							<div className='col-12 text-center'>
								{/* <button className="claim__button">
                                        <img src="/assets/governance/stake.png" className="img-fluid" />
                                    </button> */}
								{/* <button className="pool_selector_input-button-one" type="submit">STAKE</button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default reduxForm({
	form: 'Stakeform' // a unique identifier for this form
})(Stakeform)
