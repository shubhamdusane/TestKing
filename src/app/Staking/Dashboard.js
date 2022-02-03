import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <div className="container-scroller">
            <Sidebar />
            <div className="container-fluid page-body-wrapper">
                <Navbar title='DASHBOARD' />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-12 col-md-9 stretch-card">
                                    <div className="col-md-12 grid-margin stretch-card p-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="stake__card__title">Staked USDAO</h4>
                                                <div className="text-center mt-5 mb-5 p-5">
                                                    <img alt="#" src="/assets/governance/no__data.png" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>


                            <div className="col-12 col-md-3 stretch-card">
                                    <div className="col-md-12 grid-margin stretch-card p-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="stake__card__title">Your Wallet</h4>
                                                <div className="col-12 p-0">
                                                    <span>
                                                        Staked Balance
                                                    </span>
                                                    <div className="dash__input mt-2">
                                                        <input type="text" name="amount" placeholder="0.00000" />
                                                    </div>
                                                </div>

                                                <div className="col-12 mt-4 p-0">
                                                    <span>
                                                        Available Balance
                                                    </span>
                                                    <div className="dash__input mt-2">
                                                        <input type="text" name="amount" placeholder="0.00000" />
                                                    </div>
                                                </div>
                                                <div className="col-12 text-center mt-3 p-0">
                                                        <button className="claim__button">
                                                            <img alt="#" src="/assets/governance/stake.png" className="img-fluid" />
                                                        </button>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>


                            <div className="col-12 col-md-9 stretch-card">
                                    <div className="col-md-12 grid-margin stretch-card p-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="stake__card__title">USDAO Rewards</h4>
                                                <div className="text-center mt-5 mb-5 p-5">
                                                    <img alt="#" src="/assets/governance/no__data.png" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div className="col-12 col-md-3 stretch-card">
                                    <div className="col-md-12 grid-margin stretch-card p-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="stake__card__title">USDAO Distribution</h4>
                                                <div className="text-center mt-5 mb-5 p-5">
                                                    <img alt="#" src="/assets/governance/no__data.png" className="img-fluid" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
