import React from 'react';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { metamaskErrorSelector, networkProviderSelector } from '../../redux/selectors';
import { loadNetwork } from '../../redux/interactions';


const { TabPane } = Tabs;
const Wallet = ({ dispatch, networkProvider, metamaskError, trigger, setTrigger }) => {
    // { dispatch, networkProvider, metamaskError } = props;
    if(!networkProvider){
        if(typeof window.ethereum !== 'undefined')
        {
            loadNetwork(dispatch)
        }
        else{
         //   alert("Please Add MetaMask Extension to Browser");

        }
    }
    
    // if (metamaskError) {
    //   alert(metamaskError.toString())
    //   dispatch(clearMetamaskError())
    // }

    return(trigger)?(
        <>  
            <div className="wallet">
                <div className="wallet__inner">
                        <div className="d-flex justify-content-end">
                            <Link onClick={()=>setTrigger(false)}><img alt="#" src="/assets/Group 12356.png" className="img-fluid" style={{width: '20px'}}/></Link>
                        </div>
                        <h1>CONNECT WALLET</h1>
                        <p>Choose Network</p>
                        <div>
                        <Tabs defaultActiveKey="1" type="card" >
                            
                            <TabPane tab="Ethereum" key="1">
                                <div className="wallet__choose">
                                    <div className="wallet__choose_blocks">
                                        <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>
                                        <img alt="#" src="/assets/Group 123141.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Metamask</p>
                                        </a>
                                    </div>
                                    {/* <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123142.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Coinbase Wallet</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123143.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Ledger</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123144.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Ledger</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123145.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Mew</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123146.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>WalletConnect</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123147.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Fortmatic</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123148.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Authereum</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123149.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Torus</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 1231401.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Bitski</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 1231402.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Binance Chain Wallet</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 1231403.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Arkane</p>
                                    </div> */}
                                </div>
                            </TabPane>
                            {/* <TabPane tab="Binance" key="2">
                            <div className="wallet__choose">
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123141.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Metamask</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123142.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Coinbase Wallet</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123143.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Ledger</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123144.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Ledger</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123145.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Mew</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123146.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>WalletConnect</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123147.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Fortmatic</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123148.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Authereum</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123149.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Torus</p>
                                    </div>
                                   
                                </div>
                            </TabPane>
                            <TabPane tab="Polygon" key="3">
                            <div className="wallet__choose">
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123141.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Metamask</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123142.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Coinbase Wallet</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123143.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Ledger</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123144.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Ledger</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123145.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>Mew</p>
                                    </div>
                                    <div className="wallet__choose_blocks">
                                        <img alt="#" src="/assets/Group 123146.png" className="img-fluid" style={{width: '60px'}}/>
                                        <p style={{fontSize: '10px', padding: '5px 0px', marginBottom: '0px', textAlign: 'center'}}>WalletConnect</p>
                                    </div>
                                    
                                </div>
                            </TabPane> */}
                        </Tabs>
                        </div>
                </div>
            </div>
        </>
    ):"";
}


const mapStateToProps = (state) => {
    return {
      networkProvider: networkProviderSelector(state),
      metamaskError: metamaskErrorSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(Wallet);