import React from 'react'
import SlidingTabsDemo from './slider';


function UseCase() {
    return (
        <div className="bg__dark pt-5">
                <div className="container-fluid pt-5">
                    <div className="col-12 pb-5">
                        <div className="col-12">
                            <p className="leading_blockChains__description">Explore Use Cases</p>
                        </div>
                        {/* <SlidingTabsDemo/> */}
                        <div style={{padding: '2rem 0rem'}}>

                            <SlidingTabsDemo />
                        </div>
                    </div>

                </div>

            </div>
            
    )
}

export default UseCase
