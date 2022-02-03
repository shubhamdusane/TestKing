import React from 'react'

function Guides() {
    return (
        <div className="bg__dark pt-5 mt-5">
                <div className="bg__dark pt-5">
                    <div className="row pb-5 bg__dark">
                        <div className="col-12 col-md-6 mt-auto mb-auto p-5">
                            <div className="col-12 col-md-8 p-0 m-auto">
                                <img className="img-fluid" src='/assets/network__summary.png' />
                                <p className="about__title">
                                    GUIDES AND RESOURCES
                                </p>
                                <p className="about__sub__title">
                                    The community has put together a vast amount of resources and documentation. Users can find useful info and guides about common configurations and tips in the 'User Guides' section. Developers can find everything they need to build a service based on USDAO or simply communicate with the network in the 'Developer Guides'.
                                </p>
                                <div className="mt-5 row">
                                    {/* <div className="col-6 mt-3">
                                        <button className="know_more_btn w-100">ONE PAGER</button>
                                    </div> */}
                                    <div className="col-6 mt-3">
                                    <a href='/pdf/whitepaper.pdf' target="_blank" className='text-white'><button className="know_more_btn w-100" >
                                            WHITE PAPER
                                        </button></a>
                                    </div>
                                    {/* <div className="col-6 mt-3">
                                        <button className="know_more_btn w-100">LITEPAPER</button>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <button className="know_more_btn w-100">BLUEPAPER</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 border__img" >
                            <img src='/assets/usdao__globe.png' className="img-fluid" />
                        </div>
                    </div>

                </div>

            </div>

    )
}

export default Guides
