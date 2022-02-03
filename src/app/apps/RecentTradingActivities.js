import React from 'react';
import web3 from 'web3';

function PayUsingToken() {
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        getRecentActivities()
    }, []);

    const getRecentActivities = async () => {
        if (typeof window.ethereum === 'undefined') {
            console.error("Please use a web3 browser");
        } else {
            var myWeb3 = new web3(window.ethereum.currentProvider);
var arrayList = [];
            // transaction history
            const blockNumber = await myWeb3.eth.getBlockNumber();
            const blocks = await myWeb3.eth.getBlock(blockNumber);
            if(blocks) {
                const transactions = blocks.transactions;
                if(transactions && transactions.length > 0) {
                    transactions.map(async v => {
                        const transactionDetail = await myWeb3.eth.getTransaction(v);
                        if(transactionDetail) {
                            arrayList.push(transactionDetail);
                        }
                    });
                    setList(arrayList);
                }
            }
            // const detail = await myWeb3.eth.getTransaction(blocks.transactions[4]);
            // console.log(detail, 'deteil')

        }
    }
    return (
        <div className="col-lg-12 p-0 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                        <div className="flex-2">
                            <div>
                                <h6>
                                    Recent Trading Activities
                      </h6>
                                <p className="pay__sub__title">Lorem ipsum dolor sit amet, consectetur</p>
                            </div>
                        </div>
                        {/* <div className="custom__dropdown flex-1">
                    <span>ETHER</span>
                  </div> */}
                    </div>
                    <div className="table-responsive borderless">
                        <table className="table">

                            <tbody>
                                {list&&list.length>0&&list.map(transaction => <tr key={transaction.transactionIndex}>
                                    <td>
                                        {(transaction.status&& transaction.status === true) ? <img src={require('../../assets/images/positive.png')} className="img-fluid" /> : <img src={require('../../assets/images/negative.png')} className="img-fluid" />}
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <img src={require('../../assets/images/bitcoin.png')} /><span className="m-auto pl-2 crypto__coin">Bitcoin</span>
                                        </div>
                                    </td>
                                    <td>06:24:45 AM</td>
                                    <td>${transaction.value}</td>
                                    <td>
                                    {(transaction.status&& transaction.status === true) ?<label className="completed__button">Completed</label> : <label className="canceled__button">Canceled</label>}
                                    </td>
                                </tr>)}
                                <tr>
                                    <td>
                                        <img src={require('../../assets/images/neutral.png')} className="img-fluid" />
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <img src={require('../../assets/images/bitcoin.png')} /><span className="m-auto pl-2 crypto__coin">Bitcoin</span>
                                        </div>
                                    </td>
                                    <td>06:24:45 AM</td>
                                    <td>+$5,553</td>
                                    <td><label className="pending__button">Pending</label></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={require('../../assets/images/negative.png')} className="img-fluid" />
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <img src={require('../../assets/images/bitcoin.png')} /><span className="m-auto pl-2 crypto__coin">Bitcoin</span>
                                        </div>
                                    </td>
                                    <td>06:24:45 AM</td>
                                    <td>+$5,553</td>
                                    <td><label className="canceled__button">Canceled</label></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={require('../../assets/images/positive.png')} className="img-fluid" />
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <img src={require('../../assets/images/bitcoin.png')} /><span className="m-auto pl-2 crypto__coin">Bitcoin</span>
                                        </div>
                                    </td>
                                    <td>06:24:45 AM</td>
                                    <td>+$5,553</td>
                                    <td><label className="completed__button">Completed</label></td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={require('../../assets/images/positive.png')} className="img-fluid" />
                                    </td>
                                    <td>
                                        <div className="d-flex">
                                            <img src={require('../../assets/images/bitcoin.png')} /><span className="m-auto pl-2 crypto__coin">Bitcoin</span>
                                        </div>
                                    </td>
                                    <td>06:24:45 AM</td>
                                    <td>+$5,553</td>
                                    <td><label className="completed__button">Completed</label></td>
                                </tr>

                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PayUsingToken
