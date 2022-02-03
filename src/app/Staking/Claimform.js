import React, {useState} from 'react'
import { reduxForm } from 'redux-form'
import { Form, Input, Button } from 'antd';
import { fetchAvailableBalance, fetchStakedAmount, fetchStakedRewards } from '../../redux/staking';

const Claimform = (props) => {
    const [availablebalance, setAvailablebalance] = useState();
    const [stakedAmount, setStakedAmount] = useState();
    const [stakedRewards, setStakedRewards] = useState();

    const { onFinish } = props

    React.useEffect(()=>{
    fetchAvailableBalance(setAvailablebalance);
    fetchStakedAmount(setStakedAmount);
    fetchStakedRewards(setStakedRewards);
     
    },[])
    return (
        <div  className="d-flex justify-content-between flex-wrap pool_selector">
            <div className="col-md-9 m-auto grid-margin stretch-card p-0">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12 col-md-12 m-auto">
                                <div className="text-center stake__card__title">
                                    Claim USDAO
                                </div>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    // onFinishFailed={onFinishFailed}
                                    >
                                    <Form.Item
                                        label="Enter Amount"
                                        name="amount"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your amount',
                                        },
                                        ]}
                                    >
                                        <Input style={{color: 'black !important'}}/>
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

                                    
                                    <Form.Item
                                        wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                        }}
                                    >
                                        <Button type="primary" htmlType="submit">
                                        Submit
                                        </Button>
                                    </Form.Item>
                                    </Form>
                                <div className="row mt-5">
                                    <div className="col-4">
                                        <div className="stake__label">  
                                            Available Balance 
                                        </div>
                                        <div className="stake__value">
                                            {availablebalance} USDAO
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="stake__label">
                                            Staked Amount
                                        </div>
                                        <div className="stake__value">
                                            {stakedAmount}
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <div className="stake__label">
                                            Staked Rewards
                                        </div>
                                        <div className="stake__value">
                                            {stakedRewards} USDAO
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
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
        // <form onSubmit={handleSubmit}  className="d-flex justify-content-between flex-wrap pool_selector">
        //     <div className="col-md-9 m-auto grid-margin stretch-card p-0">
        //             <div className="card">
        //                 <div className="card-body">
        //                     <div className="col-12 col-md-12 m-auto">
        //                             <div className="text-center stake__card__title">
        //                                 Claim USDAO
        //                             </div>
        //                             <div className="stake__input">
        //                                 {/* <input type="text" name="amount" placeholder="Enter Your Amount" /> */}
        //                                 <Field className="form-control h-auto custom__input"  name="amount" component="input" type="number" placeholder="Enter Your Amount" style={{color: 'black'}}/>

        //                             </div>
        //                             <div className="row mt-5">
        //                                 <div className="col-4">
        //                                     <div className="stake__label">
        //                                         Staked Amount
        //                                     </div>
        //                                     <div className="stake__value">
        //                                         100 USDAO
        //                                     </div>
        //                                 </div>

        //                                 <div className="col-4">
        //                                     <div className="stake__label">
        //                                         Staked Validity
        //                                     </div>
        //                                     <div className="stake__value">
        //                                         45 Days
        //                                     </div>
        //                                 </div>

        //                                 <div className="col-4">
        //                                     <div className="stake__label">
        //                                         Staked Rewards
        //                                     </div>
        //                                     <div className="stake__value">
        //                                         25 USDAO
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="col-12 text-center">
        //                                 {/* <button className="claim__button">
        //                                     <img src="/assets/governance/claim.png" className="img-fluid" />
        //                                 </button> */}
        //                                 <button className="pool_selector_input-button-one" type="submit">CLAIM</button>

        //                             </div>
                                    
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        // </form>
    )
}

export default reduxForm({
    form: 'Claimform',  // a unique identifier for this form
  })(Claimform)
