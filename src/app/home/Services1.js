import React from 'react'

const Service1 = () => {
    return (
        <>
        <div className="d-flex justify-content-center flex-wrap" style={{backgroundColor: '#FBFBFF', border: '1px solid white', padding: '8rem 0rem'}}>
            <div className="d-flex justify-content-center flex-wrap service1_main">
                <div className="roadmap__cards service1_adj" >
                    <img src="/assets/monitor1.png" className="img-fluid" style={{color: 'black'}}/>
                    <h2 style={{color: '#FEA441'}}>BECOME A GOVERNER OF USDAO</h2>
                    <p style={{color: 'black', padding: '0rem 2rem'}}>Purchase USDAO governance token which 
                    will give you the right to vote on how the USDAO protocol 
                    should improve for the greater good
                    </p>
                </div>
                <div className="roadmap__cards service1_adj" style={{width:'300px'}} >
                    <img src="/assets/blockchain.png" className="img-fluid"/>                    
                    <h2 style={{color: '#FEA441'}}>INTEGRATION PARTNERS</h2>
                    <p style={{color: 'black', padding: '0rem 2rem'}}>Key information for partners looking to
                        integrate with USDAO. Wallets, developer
                        tools, oracles and more - get all the info
                        you need
                    </p>
                </div>
                <div className="roadmap__cards service1_adj" style={{width:'300px'}} >
                    <img src="/assets/blockchain.png" className="img-fluid"/>                    
                    <h2 style={{color: '#FEA441'}}>CONTRIBUTE TO CORE</h2>
                    <p style={{color: 'black', padding: '0rem 2rem'}}>Contribute and get involved with the
                        USDAO Network code base. Spin up a
                        local testnet, or just submit a Pull
                        Request on one of our repos
                    </p>
                </div>
            </div>
            
            
        </div>
        <div className="col-12 pt-3 pb-3" style={{backgroundColor: '#FBFBFF'}}>
            <p className="about__title text-left">AS SEEN IN</p>
        </div>
        <div className="d-flex justify-content-center align-item-center p-3 pl-5 pr-5 flex-wrap" style={{backgroundColor: '#FBFBFF'}}>
            <img src="/assets/Group.png" className="pr-5 pl-5 pb-3"  style={{width: '250px', height: 'auto'}}/>
            <img src="/assets/Coindesk 1.png" className="pr-5 pl-5 pb-3" style={{width: '250px', height: 'auto'}}/>
            <img src="/assets/INV_Logo_2019-02 (1) 1.png" className="pr-5 pl-5 pb-3" style={{width: '250px', height: 'auto'}}/>
        </div>
        </>
    )
}

export default Service1