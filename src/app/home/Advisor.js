import React, {useState, useEffect } from 'react'


const Advisor = ({title = 'Meet our Advisors' }) => {

    return (
        <div className='text-center bg__dark advisor_class'>
            <h2>{title}</h2>
            <div className='container'>
			<div className='row d-flex flex-sm-row'>
                <div className='col-12 col-md-3 mt-5 flex-column'>
                    <div className='column-wrap'>
                        <div className='d-inline-flex'>
                            <div className='img-wrap'>
                                <img src="/assets/bf.gif"/>
                            </div>
                            <div className='content mt-1'>
                                <h3>John Doe</h3>
                                <p>City Country</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-3 mt-5'>
                    <div className='column-wrap'>
                        <div className='d-inline-flex'>
                            <div className='img-wrap'>
                                <img src="/assets/bf.gif"/>
                            </div>
                            <div className='content mt-1'>
                                <h3>John Doe</h3>
                                <p>City Country</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-3 mt-5'>
                    <div className='column-wrap'>
                        <div className='d-inline-flex'>
                            <div className='img-wrap'>
                                <img src="/assets/bf.gif"/>
                            </div>
                            <div className='content mt-1'>
                                <h3>John Doe</h3>
                                <p>City Country</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-3 mt-5'>
                    <div className='column-wrap'>
                        <div className='d-inline-flex'>
                            <div className='img-wrap'>
                                <img src="/assets/bf.gif"/>
                            </div>
                            <div className='content mt-1'>
                                <h3>John Doe</h3>
                                <p>City Country</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
		</div>
    )
}

export default Advisor