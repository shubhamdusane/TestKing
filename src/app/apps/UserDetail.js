import React from 'react'
import web3 from 'web3'
function UserDetail() {
	const [addr, setAddr] = React.useState('')

	React.useEffect(() => {
		getAccount()
	}, [])

	const getAccount = async () => {
		if (typeof window.ethereum === 'undefined') {
			console.error('Please use a web3 browser')
		} else {
			var myWeb3 = new web3(window.ethereum.currentProvider)

			// transaction history

			// const blockNumber = await myWeb3.eth.getBlockNumber();
			// console.log(blockNumber, 'block number');
			// const blocks = await myWeb3.eth.getBlock(blockNumber);
			// console.log(blocks, 'block blocks');
			// const detail = await myWeb3.eth.getTransaction(blocks.transactions[4]);
			// console.log(detail, 'deteil')

			// current balance

			myWeb3.eth.getAccounts(async (err, accounts) => {
				if (err) {
					console.log(err)
				} else {
					setAddr(accounts[0])
					// const balacne = await myWeb3.eth.getBalance(accounts[0]);
					// console.log(parseInt((Math.round(balacne * 100) / 100).toFixed(2)), 'eth balance');
				}
			})
		}
	}

	return (
		<div className='profile-name mt-3 text-center'>
			{/* <h5 className="mb-0 font-weight-normal"><Trans>Hello, Yakshit Patel</Trans></h5> */}
			<h5 className='mb-0 font-weight-normal'>Welcome</h5>
			<span>{addr ? addr.substr(0, 20) : ''}...</span>
		</div>
	)
}

export default UserDetail
