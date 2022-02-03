import React from 'react';
import { reduxForm } from 'redux-form'


import 'antd/dist/antd.css';




const Calculator = (props) => {
    const { handleSubmit } = props
    return (
        <>
        {/* <Tabs defaultActiveKey="1" >
            <TabPane tab="USDAO" key="1"  style={{color: 'white'}}> */}
            <form onSubmit={handleSubmit} className="d-flex pt-4 flex-column mt-5 " autoComplete="off">
                {/* <div className="d-flex justify-content-between flex-wrap">
                    <div>
                    <Field className="h-auto custom__input_cal"  name="address" component="input" type="text" placeholder="address" style={{color: 'black'}}/>
                    </div>
                    <div>
                    <Field className="h-auto custom__input_cal"  name="amount" component="input" type="text" placeholder="amount" style={{color: 'black'}}/>
                    </div>
                </div>
                <div className="mt-4">
                    <div>
                    <Field className="h-auto custom__input_caltext"  name="description" component="TextArea"
                     type="text" placeholder="Additional Info" style={{color: 'black'}}/>
                    </div>
                </div> */}
                <div>
                    <button className="pool_selector_input-button-one" type="submit">Send To Pool</button>
                </div>
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
    form: 'CalForm'  // a unique identifier for this form
  })(Calculator)