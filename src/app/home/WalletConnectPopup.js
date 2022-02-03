import React, { useState } from 'react';

import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'

import Web3Connect from 'web3connect';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from 'authereum';
import Web3 from "web3";
import Torus from '@toruslabs/torus-embed';
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import { webLoaded } from '../../redux/actions';
import Portis from '@portis/web3';

import Loader from '../common/Loader';
import { walletConfig } from './wallet/walletConfig';
import cn  from 'classnames';


import {
  ConnectionRejectedError,
  UseWalletProvider,
  useWallet,
} from 'use-wallet'
import { BscConnector } from '@binance-chain/bsc-connector'

export const bsc = new BscConnector({
  supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})
// const 
// await bsc.activate();
// await bsc.getAccount();
// await bsc.getChainId();

function App({show, setShow, dispatch, history}) {
  const BinanceConnection = ()=>{
    const wallet = useWallet()
    const blockNumber = wallet.getBlockNumber()

    const activate = connector => wallet.connect(connector)


    const handleClose = () => setShow(false),
  [loaderShow, setLoaderShow] = useState(false),
  [networkSelected, setNetworkSelected] = useState('eth'),
  walletToken = walletConfig.filter(({network = ''})=>network.includes(networkSelected)),
  web3Connect = new Web3Connect.Core({
    cacheProvider: false, // optional
    providerOptions: {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: 'b2a8e01ef8b44612999bd2bd4aa6869a'
            },
        },
        portis: {
            package: Portis,
            options: {
                id: 'd4e7b375-6203-40f9-bb10-fafa45263d9c'
            }
        },
        authereum: {
            package: Authereum,
            options: {}
        },
        torus: {
            package: Torus,
            options: {}
        },
        burnerconnect: {
            package: BurnerConnectProvider, // required
            options: {}
        }
    },
  });

  const connectWallets = async (chooseWallet) => {
    if(networkSelected==='bsc'){
      activate(chooseWallet);
    }
    else{
        if (chooseWallet == 'metamask') {
            await window.ethereum.enable()
            //const response = await loadRealMetamask(dispatch)
            
            handleClose()
           // history.push('/dashboard');
        } else {
  
          chooseWallet !== 'walletconnect' && setLoaderShow(true);
            setTimeout(()=>{ setLoaderShow(false)}, 8000);
            const provider = await web3Connect.connectTo(chooseWallet);
            setLoaderShow(false);
            handleClose()
            const web = new Web3(provider);
            web.eth.getAccounts(async (err, accounts) => {
                if (err) {
                    console.log(err);
                } else {
                   // const response = await loadMetamask(dispatch, provider, accounts[0], web);
                    
                   dispatch(webLoaded(web))
                   window.location.href = "/dashboard";
                  // history.push('/dashboard');
                }
            });
            
        }
    }
    
  }
  return (
    <>

      {(() => {
        if (wallet.error?.name) {
          return (
            <p>
              <span>
                {wallet.error instanceof ConnectionRejectedError
                  ? 'Connection error: the user rejected the activation'
                  : wallet.error.name}
              </span>
              <button onClick={() => wallet.reset()}>retry</button>
            </p>
          )
        }

        if (wallet.status === 'connecting') {
          return (
            <p>
              <span>Connecting to {wallet.connector}…</span>
              <button onClick={() => wallet.reset()}>cancel</button>
            </p>
          )
        }

        if (wallet.status === 'connected') {
          return (
            <p>
              <span>Connected.</span>
              <button onClick={() => wallet.reset()}>disconnect</button>
            </p>
          )
        }

        return (
          <>
          {/* <div className="connect">
            <div className="connect-label">Connect:</div>
            <div className="connect-buttons">
              <button onClick={() => activate('injected')}>injected</button>
              <button onClick={() => activate('bsc')}>bsc</button>
              <button onClick={() => activate('frame')}>frame</button>
              <button onClick={() => activate('portis')}>portis</button>
              <button onClick={() => activate('fortmatic')}>fortmatic</button>
              <button onClick={() => activate('torus')}>torus</button>
              <button onClick={() => activate('walletconnect')}></button>
              <button onClick={() => activate('walletconnect')}>
                walletconnect
              </button>
              <button onClick={() => activate('walletlink')}>walletlink</button>
            </div>
          </div> */}
          {loaderShow && <Loader />}      
             <div className='walletWrapperPopup'>     
                <Modal size="lg" show={show} onHide={handleClose} dialogClassName="walletWrapperPopup">
                <Modal.Header closeButton>
                    <Modal.Title>Select Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="container-fluid">
                        <h2 className='chooseNetwork'>Choose Network</h2>
                      
                        <div className="row networkWrapper">
                            <div className='col-md-1 justify-content-center text-center align-items-center pointer pointerHover'>
                                <div onClick={()=>setNetworkSelected('eth')} className={cn('imageWrap', networkSelected==='eth' && 'selected')}>
                                    <img src="https://app.1inch.io/assets/images/network-logos/ethereum.svg" alt='eth' />
                                </div>
                            </div>
                            <div className='col-md-1 justify-content-center text-center align-items-center pointer pointerHover'>
                                <div onClick={()=>setNetworkSelected('bsc')} className={cn('imageWrap', networkSelected==='bsc' && 'selected')}>
                                    <img src="https://app.1inch.io/assets/images/network-logos/binance.svg" alt='eth' />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {   
                                walletToken.map((wallet,index)=>(
                                    <div className="col-12 col-md-3 mt-4 p-5 justify-content-center text-center align-items-center pointer pointerHover" onClick={() => connectWallets(wallet.token)} key={index}>
                                    <div className="col-6 m-auto pb-2">
                                    <img src={wallet.image} className="img-fluid" />
                                    </div>
                                    {wallet.name}
                                </div>
                                ))
                            }
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            </div>
      
          </>
        )
      })()}

      {wallet.connected && (
        <>
          <p>
            <span>Account:</span>
            <span>{wallet.account}</span>
          </p>
        </>
      )}

      {wallet.account && (
        <p>
          <span>Balance:</span>
          <span>
            {/* {wallet.balance === '-1'
              ? '…'
              : `${utils.formatEther(wallet.balance)} ETH`} */}
          </span>
        </p>
      )}

      {wallet.connected && (
        <p>
          <span>Block:</span> <span>{blockNumber || '…'}</span>
        </p>
      )}
    </>
  )
  }
  


  return (
    <div>
     

      <UseWalletProvider
    chainId={1}
    connectors={{
      fortmatic: { apiKey: 'pk_test_48BF9EA45365B4D7' },
      portis: { dAppId: '' },
      walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      walletlink: { url: 'https://mainnet.eth.aragon.network/' },
    }}
  >
<BinanceConnection />
  </UseWalletProvider>
    </div>
  )
}

const mapStateToProps = (state) => {

}
export default connect(mapStateToProps)(App);
//export default App;
