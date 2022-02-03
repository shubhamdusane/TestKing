import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function StackingHome({ history }) {
    const [amount, setAmount] = useState(1);
    const [yearlyReward, setYearlyReward] = useState({ usd: 0.00, usdao: 1.00 });
    const [monthlyReward, setMonthlyReward] = useState({ usd: 0.00, usdao: 1.00 });
    const [weeklyReward, setWeeklyReward] = useState({ usd: 0.00, usdao: 1.00 });
    const [dailyReward, setDailyReward] = useState({ usd: 0.00, usdao: 1.00 });

    const inputChange = (e) => {
        let input_amount = e.target.value;
        setAmount(input_amount);
        setYearlyReward({ usd: (input_amount * 20) / 100, usdao: 1.00 })
        setMonthlyReward({ usd: (input_amount * 20 / 100) / 12, usdao: 1.00 })
        setWeeklyReward({ usd: (input_amount * 20 / 100) / 52, usdao: 1.00 })
        setDailyReward({ usd: (input_amount * 20 / 100) / 365, usdao: 1.00 })
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center p-5">
                        <img src="/assets/governance/green_logo.png" className="img-fluid" style={{ height: '5vh' }} />
                    </div>
                    <div className="col-12 col-md-7 mt-4 mb-4 mr-auto ml-auto top__section__description text-center">
                        Earn Stacking rewards using USDAO
                    </div>
                    <div className="col-12 text-center top_section_button">
                        <button><Link className="nav-link" to="/staking/dashboard">DEPOSIT NOW</Link></button>
                    </div>
                </div>
            </div>
            <div className="">
                <img src="/assets/governance/top__section.png" className="img-fluid mt-5 mb-5" />
            </div>
            <div className="info__description mt-5 mb-5 col-12 col-md-7 p-5 text-center m-auto">
                <p>Our soft-staking program allows yout to easily generate rewards by simply holding your stable token USDAO. Staking rewards can be as high as 20%* per year. Please read the FAQs for details.</p>
                <div className="description__heading">
                    STAKING IN 2 EASY STEPS
                </div>
            </div>
            <div className="col-12 col-md-8 m-auto p-5 content-row">
                <div className="row">
                    <div className="col-6">
                        <div className="description__card p-5">
                            <p className="card__title2 pt-3 mt-5">
                                DEPOSIT 1 USDAO
                            </p>
                            <div className="card__description">
                                Simply deposit 1 USDAO (Stable Coin) to your account to begin staking.
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="description__card p-4">
                            <p className="card__title2 pt-4 mt-5">
                                EARN MONTHLY REWARDS
                            </p>
                            <p className="card__description">
                                Watch your account grow as USDAO automatically deposits your staking rewards into your account on a weekly basis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="info__description mt-5 col-12 col-md-7 p-5 text-center m-auto buy__now">
                <p>If you don’t have USDAO, Then you need to buy it with 1 US Dollar or You can Convert your other cryptocurrency into USDAO!</p>
                <button>BUY NOW</button>
            </div>
            <div className="">
                <img src="/assets/governance/middle.png" className="img-fluid mt-5 mb-5" />
            </div>
            <div className="info__description mt-5 mb-5 col-12 col-md-7 p-5 text-center m-auto">
                <div className="description__heading">
                    YOUR POTENTIAL REWARD
                </div>
            </div>
            <div className="col-10 col-md-7 m-auto">
                <div className="d-flex mb-2">
                    <div className="flex-1 label__text">
                        STAKING TOKEN
                    </div>
                    <div className="flex-1 label__text">
                        STAKING AMOUNT
                    </div>
                </div>
                <div className="col-12 col-md-9 m-auto d-flex input__box p-3">
                    <div className="flex-1">
                        <div className="flex-1 label__text">
                            USDAO
                    </div>
                    </div>
                    <div>
                        <div className="label__text">
                            =
                    </div>
                    </div>
                    <div className="flex-1 label__text">
                        <input type="number" min="1" step="any" className="transparent__input" name="amount" value={amount} onChange={(e) => inputChange(e)} />
                    </div>
                </div>
            </div>

            <div className="col-11 ml-auto mr-auto mt-5">
                <div className="row">
                    <div className="col-3">
                        <ul>
                            <li className="list__title">
                                Daily Rewards
                            </li>
                            <li className="list__item">
                                {dailyReward.usd.toFixed(2)} USDAO
                            </li>
                            {/* <li className="list__item">
                            {dailyReward.usdao.toFixed(2)} USDAO
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul>
                            <li className="list__title">
                                Weekly Rewards
                            </li>
                            <li className="list__item">
                                {weeklyReward.usd.toFixed(2)} USDAO
                            </li>
                            {/* <li className="list__item">
                            {weeklyReward.usdao.toFixed(2)} USDAO
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul>
                            <li className="list__title">
                                Monthly Rewards
                            </li>
                            <li className="list__item">
                                {monthlyReward.usd.toFixed(2)} USDAO
                            </li>
                            {/* <li className="list__item">
                            {monthlyReward.usdao.toFixed(2)} USDAO
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul>
                            <li className="list__title">
                                Yearly Rewards
                            </li>
                            <li className="list__item">
                                {yearlyReward.usd.toFixed(2)} USDAO
                            </li>
                            {/* <li className="list__item">
                            {yearlyReward.usdao.toFixed(2)} USDAO
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-7 p-5 text-center m-auto buy__now">
                <button onClick={()=>history.push('/dashboard')}>DEPOSIT NOW</button>
            </div>
            <div className="">
                <img src="/assets/governance/bottom.png" className="img-fluid mt-5 mb-5" />
            </div>
            <div className="info__description mt-5 mb-5 col-12 col-md-7 p-5 text-center m-auto">
                <div className="description__heading">
                    FREQUENTLY ASKED QUESTIONS !!
                </div>
            </div>
            <div className=" mt-5 mb-5 col-12 col-md-10 p-5 text-center m-auto">
                <div className="faq_1">
                    How frequently will I receive staking rewards?
                </div>
                <div className="faq_2">
                    Is there a minimum/maximum digital token holdings requirement to start staking?
                </div>
                <div className="faq_2">
                    Do I have to pay fees to use this service?
                </div>
                <div className="faq_2">
                    Is it safe and how does USDAO stake my digital tokens?
                </div>
                <div className="faq_2">
                    So I just leave my digital tokens in my USDAO account and they earn rewards?
                </div>
            </div>
            <div className="col-12 text-center p-5">
                <img src="/assets/governance/green_logo.png" className="img-fluid" style={{ height: '5vh' }} />
            </div>
        </>
    )
}

export default StackingHome
