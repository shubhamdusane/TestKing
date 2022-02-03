import React from 'react';
import { connect } from 'react-redux';
import {fumBalanceSelector, usmBalanceSelector, dynamicBalanceSelector, etherBalanceSelector} from '../../redux/selectors';

function CurrentBalance({fum_balance, usm_balance, dynamic_balance, ether_balance}) {

    return (
        <div>

<div className="col-12 p-0 mt-3">
                <div className="balance__card">
                    <h6>ETHER Balance</h6>
                    <div className="balance__input p-1">{ether_balance}</div>
                </div>
            </div>

            <div className="col-12 p-0 mt-3">
                <div className="balance__card">
                    <h6>USDAO Balance</h6>
                    <div className="balance__input p-1">{usm_balance}</div>
                </div>
            </div>
            <div className="col-12 p-0 mt-3">
                <div className="balance__card">
                    <h6>ASSET Balance</h6>
                    <div className="balance__input p-1">{fum_balance}</div>
                </div>
            </div>


           

            <div className="col-12 p-0 mt-3">
                <div className="balance__card">
                    <h6>DAI Balance</h6>
                    <div className="balance__input p-1">{dynamic_balance? dynamic_balance.Dai: 0}</div>
                </div>
            </div>

            <div className="col-12 p-0 mt-3">
                <div className="balance__card">
                    <h6>USDC Balance</h6>
                    <div className="balance__input p-1">{dynamic_balance? dynamic_balance.USDC: 0}</div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    const fum_balance = fumBalanceSelector(state);
    const usm_balance = usmBalanceSelector(state);
    const dynamic_balance = dynamicBalanceSelector(state);
    const ether_balance = etherBalanceSelector(state);
    return {
        fum_balance,
        usm_balance,
        dynamic_balance,
        ether_balance
    }
  }
  
  export default connect(mapStateToProps)(CurrentBalance);
