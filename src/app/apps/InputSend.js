import React from 'react'
import { Field, reduxForm } from 'redux-form'
import 'antd/dist/antd.css'

const TodoListComponentSend = (props) => {
	const { handleSubmit, tokenName } = props
	return (
		<>
			{/* <Tabs defaultActiveKey="1" >
            <TabPane tab="USDAO" key="1"  style={{color: 'white'}}> */}
			<form
				onSubmit={handleSubmit}
				className='add-items d-flex pt-4 flex-column usDaoWrapperNew'
				autoComplete='off'
			>
				<div className='mb-3'>
					{/* <label style={{color: 'white'}}>Address</label> */}
					<div className='col-md-12'>
						<Field
							className='form-control h-auto custom__input'
							name='address'
							component='input'
							type='text'
							placeholder='address'
							style={{ color: 'black' }}
						/>
						<button disabled>Address</button>
					</div>
				</div>
				<div>
					{/* <label style={{color: 'white'}}>Amount</label> */}
					<div className='col-md-12'>
						<Field
							className='form-control h-auto custom__input'
							name='amount'
							component='input'
							type='number'
							placeholder='amount'
							style={{ color: 'black' }}
						/>
						<button style={{ marginBottom: '35px' }} disabled>{tokenName}</button>
						<p></p>
						<div className='custom__button' onClick={handleSubmit}>
							<a>SEND</a>
						</div>
					</div>
				</div>
				<div></div>
			</form>
			{/* </TabPane>
            <TabPane tab="ASSET" key="2"  style={{color: 'white'}}>
            <form onSubmit={handleSubmit1} className="add-items d-flex pt-4 flex-column">
                <div>
                    <label style={{color: 'white'}}>Address</label>
                    <div>
                    <Field className="form-control h-auto custom__input"  name="address" component="input" type="text" placeholder="address" style={{color: 'black'}}/>
                    </div>
                </div>
                <div>
                    <label style={{color: 'white'}}>Amount</label>
                    <div>
                    <Field className="form-control h-auto custom__input"  name="amount" component="input" type="text" placeholder="amount" style={{color: 'black'}}/>
                    </div>
                </div>
                <div>
                    <button className="custom__button" type="submit">Submit</button>
                </div>
            </form>
            </TabPane>
            
        </Tabs> */}
		</>
	)
}

export default reduxForm({
	form: 'BuyForm' // a unique identifier for this form
})(TodoListComponentSend)
