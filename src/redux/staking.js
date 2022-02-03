import { ethers } from 'ethers'
import moment from 'moment'
import { contractDetails } from '../app/sdk/ContractDetails'
import {
	networkLoaded,
	usmLoaded,
	metamaskLoaded,
	metamaskError,
	weeklyAmountLoaded,
	dailyAmountLoaded,
	monthlyAmountLoaded,
	transferableAmountLoaded,
	lockedAmountLoaded,
	stakeLockRewardLoaded,
	STAKE_VALIDITY_LOADED,
	STAKE_AMUONT_LOADED
} from './actions'
import Web3 from 'web3'
import swal from 'sweetalert'
import Checkbox from 'antd/lib/checkbox/Checkbox'

const { fum, usm, stake: Stake } = contractDetails

export const loadNetwork = async (dispatch) => {
	const provider = new ethers.providers.JsonRpcProvider(
		`https://kovan.infura.io/v3/b2a8e01ef8b44612999bd2bd4aa6869a`
	)
	dispatch(networkLoaded(provider))
	loadUSM(dispatch, provider)
}
export const loadRealMetamask = async (dispatch) => {
	try {
		await window.ethereum.enable()
		const provider = await new ethers.providers.Web3Provider(
			'https://kovan.infura.io/v3/b2a8e01ef8b44612999bd2bd4aa6869a'
		)
		const signer = await provider.getSigner()
		const network = await provider.getNetwork()

		var myWeb3 = new Web3(window.web3.currentProvider)
		const usmAbi = usm.abi
		const usmAddress = usm.address[network.chainId]
		const usmContract = new ethers.Contract(usmAddress, usmAbi, signer)
		//load FUM with Metamask
		const fumAbi = fum.abi
		const fumAddress = fum.address[network.chainId]
		const fumContract = new ethers.Contract(fumAddress, fumAbi, signer)
		fetchTransferableAmount(dispatch, usmContract, signer, myWeb3)
		getWeeklyRewards(dispatch, usmContract, signer)
		getDailyRewards(dispatch, usmContract, signer)
		fetchLockAmount(dispatch, usmContract, signer)
		getMonthlyRewards(dispatch, usmContract, signer)
		fetchLockAmount(dispatch, usmContract, signer)
		StakeLockAmount(dispatch, usmContract, signer)
		StakeLockValidity(dispatch, usmContract, signer)
		StakeLockReward(dispatch, usmContract, signer)
		dispatch(metamaskLoaded(provider, signer, usmContract, fumContract))
		return true
	} catch (e) {
		dispatch(metamaskError(e))
		return false
	}
}
export const loadMetamask = async (dispatch, provider2, account, web) => {
	try {
		const provider = await new ethers.providers.Web3Provider(provider2)
		const signer = await provider.getSigner()
		const network = await provider.getNetwork()

		if (network.chainId !== 1) {
			//throw new Error("Must be on mainnet. Please alter Metamask network and refresh the page.")
		}
		//load USM with Metamask
		const usmAbi = usm.abi
		const usmAddress = usm.address[network.chainId]
		const usmContract = new ethers.Contract(usmAddress, usmAbi, signer)
		//load FUM with Metamask
		const fumAbi = fum.abi
		const fumAddress = fum.address[network.chainId]
		const fumContract = new ethers.Contract(fumAddress, fumAbi, signer)
		fetchTransferableAmount(dispatch, usmContract, signer, web)
		getWeeklyRewards(dispatch, usmContract, signer)
		getDailyRewards(dispatch, usmContract, signer)
		fetchLockAmount(dispatch, usmContract, signer)
		getMonthlyRewards(dispatch, usmContract, signer)
		fetchLockAmount(dispatch, usmContract, signer)
		StakeLockAmount(dispatch, usmContract, signer)
		StakeLockValidity(dispatch, usmContract, signer)
		StakeLockReward(dispatch, usmContract, signer)
		dispatch(metamaskLoaded(provider, signer, usmContract, fumContract))
	} catch (e) {
		dispatch(metamaskError(e))
		return false, false
	}
}

export const reloadMetamask = async (dispatch, provider, account, web) => {
	try {
		const signer = await provider.getSigner()
		const network = await provider.getNetwork()

		if (network.chainId !== 1) {
			//throw new Error("Must be on mainnet. Please alter Metamask network and refresh the page.")
		}
		//load USM with Metamask
		const usmAbi = usm.abi
		const usmAddress = usm.address[network.chainId]
		const usmContract = new ethers.Contract(usmAddress, usmAbi, signer)
		//load FUM with Metamask
		const fumAbi = fum.abi
		const fumAddress = fum.address[network.chainId]
		const fumContract = new ethers.Contract(fumAddress, fumAbi, signer)
		fetchTransferableAmount(dispatch, usmContract, signer, web)
		getWeeklyRewards(dispatch, usmContract, signer)
		getDailyRewards(dispatch, usmContract, signer)
		fetchLockAmount(dispatch, usmContract, signer)
		getMonthlyRewards(dispatch, usmContract, signer)
		fetchLockAmount(dispatch, usmContract, signer)
		StakeLockAmount(dispatch, usmContract, signer)
		StakeLockValidity(dispatch, usmContract, signer)
		StakeLockReward(dispatch, usmContract, signer)
		dispatch(metamaskLoaded(provider, signer, usmContract, fumContract))
		return true
	} catch (e) {
		dispatch(metamaskError(e))
		return false
	}
}

export const loadUSM = async (dispatch, provider) => {
	const network = await provider.getNetwork()
	const abi = usm.abi
	const address = usm.address[network.chainId]

	var signer = provider.getSigner()
	const usmContract = new ethers.Contract(address, abi, provider)
	const usmContractWithSigner = usmContract.connect(signer)
	dispatch(usmLoaded(usmContractWithSigner))
}

export const getMonthlyRewards = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.rewardsMonthly(address)
	dispatch(monthlyAmountLoaded(Number(amount)))
}

export const getWeeklyRewards = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.rewardsWeekly(address)
	dispatch(weeklyAmountLoaded(Number(amount)))
}

export const getDailyRewards = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.rewardsDaily(address)
	dispatch(dailyAmountLoaded(Number(amount)))
}

export const fetchTransferableAmount = async (dispatch, Stake) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]

	const amount = await Stake.getUSDAObalance(address)
	dispatch(transferableAmountLoaded(Number(amount)))
}

export const fetchLockAmount = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.getLockAmount(address)
	dispatch(lockedAmountLoaded(Number(amount)))
}

export const fetchAvailableBalance = async (setAvailablebalance) => {
	console.log("Functio mai aya h--------------")
	var myWeb3 = new Web3(window.web3.currentProvider)

	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}
			const accounteth = accounts
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			const abi = Stake.abi
			const address = Stake.address[network.chainId]
			const StakingContract = new ethers.Contract(address, abi, provider)
			const amount = await StakingContract.getUSDAObalance(accounteth[0])
			const AvailableBalance = ethers.utils.formatUnits(amount, 18)
			console.log("AvailableBalance-12434-------------",AvailableBalance)
			setAvailablebalance(AvailableBalance)
		}
	})
}

export const fetchStakeAmountFn = async () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const contract = new ethers.Contract(address, abi, provider)
	const signer = await provider.getSigner()
	const loggedInAddress = await signer.getAddress()
	const chk = await contract.queryFilter('Lock')
	const unchk = await contract.queryFilter('Unlock')
	const claim = await contract.queryFilter('Claim')

	const StakeContract = new ethers.Contract(address, abi, signer)

	return { chk, loggedInAddress, StakeContract, unchk, claim }
}

export const fetchStakedAmount = async (setStakedAmount) => {
	var myWeb3 = new Web3(window.web3 && window.web3.currentProvider)

	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}
			const accounteth = accounts
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			const abi = Stake.abi
			const address = Stake.address[network.chainId]
			const StakingContract = new ethers.Contract(address, abi, provider)
			const amount = await StakingContract.getLockAmount(accounteth[0])

			const StakedAmount = ethers.utils.formatUnits(amount, 18)
			setStakedAmount(StakedAmount)
		}
	})
}

export const fetchStakedRewards = async (setStakedRewards) => {
	var myWeb3 = new Web3(window.web3.currentProvider)

	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			if (typeof accounts !== 'object' || typeof accounts[0] !== 'string') {
				return console.error('No accounts set')
			}
			const accounteth = accounts
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			const abi = Stake.abi
			const address = Stake.address[network.chainId]
			const StakingContract = new ethers.Contract(address, abi, provider)

			const amount = await StakingContract.calculateReward(accounteth[0])
			const rewaredAmount = amount[4]
			const StakedAmount = ethers.utils.formatUnits(rewaredAmount, 18)
			setStakedRewards(StakedAmount)
		}
	})
}

export const ClaimTable = async (
	setClaim_Table,
	setStakedAmount,
	setDisableClaimbtn,
	setLoader
) => {
	let { chk, loggedInAddress, StakeContract, unchk, claim } =
		await fetchStakeAmountFn()
	let data_arr = []
	var totalStakedAmount = 0
	let id = [],
		claim_enableTime
	for (let i = 0; i < chk.length; i++) {
		if (chk[i]) {
			const ofAddress = chk[i].args['holder']
			if (ofAddress == loggedInAddress) {
				var lStakeId = parseInt(chk[i].args['StakeId'])
				const finalData = await StakeContract.calculateReward(lStakeId)
				console.log("finalData-----------",finalData)
				console.log("noOfDays--------------------------",Number(finalData.noOfDays))
				var staketime = moment
					.unix(Number(chk[i].args['_time']))
					.format('DD MMM YYYY')
				var stakeStartTIme = moment
					.unix(Number(chk[i].args['_startTime']))
					.format('DD MMM YYYY')
				var claimedAmount = await StakeContract.getLockAmount(
					chk[i].args['StakeId']
				)
				var claimedSatus = await StakeContract.getLockStatus(
					chk[i].args['StakeId']);

				var value = ethers.utils.formatEther(String(chk[i].args['_value']))
				for (let k = 0; k < claim.length; k++) {
					var claimStakeId = parseInt(claim[k].args['_stakId'])
					if (lStakeId == claimStakeId) {
						claim_enableTime = parseInt(claim[k].args._nextMinute)
					}
				}

				let data = {
					address: chk[i].args['_of'],
					amount: ethers.utils.formatEther(String(finalData.lockAmount)),
					timeperiod: Number(finalData.noOfDays),
					rewardtimeperiod: ethers.utils.formatEther(
						String(finalData.totalclaimedAmount)
					),
					unixdate: Number(chk[i].args['_time']),
					stakingType: chk[i].args['_stakingtype'],
					startTime: stakeStartTIme,
					StakeId: Number(chk[i].args['StakeId']),
					claimed : !claimedSatus,
					// claimed: !!Number(claimedAmount) ? false : true,
					claim_enableTime: claim_enableTime
				}

				var rF = parseFloat(value).toFixed(3)
				totalStakedAmount = parseFloat(totalStakedAmount) + parseFloat(rF)
				for (let j = 0; j < unchk.length; j++) {
					var unStakeId = parseInt(unchk[j].args['_stakId'])
					if (lStakeId == unStakeId) {
						totalStakedAmount = parseFloat(totalStakedAmount) - parseFloat(rF)
					}
				}
				data_arr.push(data)
			}
		}
	}

	setDisableClaimbtn && setDisableClaimbtn(false)
	data_arr.sort(function (a, b) {
		return a.claimed - b.claimed
	})
	setStakedAmount && setStakedAmount(totalStakedAmount)
	setLoader && setLoader(false)
	setClaim_Table(data_arr)
}

export const fetchStaked = async (setStakedAmount) => {
	let { chk, loggedInAddress, unchk } = await fetchStakeAmountFn(),
		totalStakedAmount = 0

	for (let i = 0; i < chk.length; i++) {
		if (chk[i]) {
			const ofAddress = chk[i].args['holder']
			if (ofAddress == loggedInAddress) {
				var value = ethers.utils.formatEther(String(chk[i].args['_value']))
				var rF = parseFloat(value).toFixed(3)
				totalStakedAmount = parseFloat(totalStakedAmount) + parseFloat(rF)
				var lStakeId = parseInt(chk[i].args['StakeId'])
				for (let j = 0; j < unchk.length; j++) {
					var unStakeId = parseInt(unchk[j].args['_stakId'])
					if (lStakeId == unStakeId) {
						totalStakedAmount = parseFloat(totalStakedAmount) - parseFloat(rF)
					}
				}
			}
		}
	}
	setStakedAmount && setStakedAmount(totalStakedAmount)
	return totalStakedAmount
}

export const hasAdminAccess = async (sethasAccess) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const signer = await provider.getSigner()
	const loggedInAddress = await signer.getAddress()
	if (loggedInAddress === '0x9d659FeB48f10A5e41DC291b62f5DDa7da5C8C4B') {
		return sethasAccess(true)
	}
	return sethasAccess(false)
}

export const getTokenBalanceFn = async (setStakeBalance) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const signer = await provider.getSigner()
	const StakeContract = new ethers.Contract(address, abi, provider)
	let stakedAmount

	stakedAmount = await StakeContract.getStakingUSDAOBalance()
	let formatedAmount = ethers.utils.formatEther(stakedAmount, 18)
	setStakeBalance(formatedAmount)
}

export const getBufferRotationFn = async (setBufferRotation) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const signer = await provider.getSigner()
	const StakeContract = new ethers.Contract(address, abi, provider)
	let noOfWeek

	noOfWeek = await StakeContract.getNoOfweek()
	setBufferRotation(Number(noOfWeek))
}

export const setNoBufferFn = async (
	noBufferInput,
	setBufferInputDisable,
	setNoBufferInput
) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const signer = await provider.getSigner()
	const StakeContract = new ethers.Contract(address, abi, signer)
	let setBuffer
	try {
		setBuffer = await StakeContract.setNoOfweek(noBufferInput)
	} catch (e) {
		if (e.code === 4001) {
			return swal('User denied transaction.')
		}
	}
	if (setBuffer) {
		setBufferInputDisable(true)
		swal(`Please wait as your request is being processed.`)
		provider.waitForTransaction(setBuffer.hash).then((result, err) => {
			if (result.status) {
				setNoBufferInput()
				setBufferInputDisable(false)
				swal('Transaction Completed')
			} else {
				swal('Please try again')
			}
		})
	}
}

export const stakeUsdao = async (
	Stake,
	date,
	amount,
	setDisableStakeBtn,
	form,
	autoStaked,
	setClaim_Table,
	setAvailablebalance,
	setStakedAmount,
	stakedAmount,
	availablebalance,
	setData
) => {
	var myWeb3 = new Web3(window.web3.currentProvider)

	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			const weiAmount = ethers.utils.parseEther(amount)
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			const signer = await provider.getSigner()
			const abi = Stake.abi
			const usmAbi = usm.abi
			const address = Stake.address[network.chainId]
			const usmAddress = usm.address[network.chainId]
			const StakeContract = new ethers.Contract(address, abi, signer)
			const UsmContract = new ethers.Contract(usmAddress, usmAbi, signer)
			// const uniqueId = Math.floor(1000000 + Math.random() * 9000000)
			const num = new Date().valueOf()
			const uniqueId = String(num).slice(-7);
			console.log("uniqure id----------",uniqueId)
			let stakedate,
				transfer,
				allowance = 0
			try {
				allowance = await UsmContract.allowance(accounts[0], address)
				allowance = ethers.utils.formatUnits(allowance, 18)
				if (Number(amount) > Number(allowance)) {
					swal(`Please provide Approval before staking your USDAO with us!`)
					const weiAvailableAmount = ethers.utils.parseEther(availablebalance)
					transfer = await UsmContract.approve(address, weiAvailableAmount)
				}
			} catch (e) {
				setDisableStakeBtn(false)
				if (e.code === 4001) {
					return swal('User denied transaction.')
				}
			}
			if (transfer) {
				setDisableStakeBtn(true)
				provider
					.waitForTransaction(transfer.hash)
					.then(async (result, error) => {
						if (result.status) {
							swal(
								`Thank you for providing Approval, please confirm the transaction to complete the Staking process.`
							)

							try {
								stakedate = await StakeContract.lock(
									accounts[0],
									uniqueId,
									weiAmount,
									date,
									autoStaked
								)
							} catch (e) {
								setDisableStakeBtn(false)
								if (e.code === 4001) {
									return swal('User denied transaction.')
								}
							}
							if (stakedate) {
								provider
									.waitForTransaction(stakedate.hash)
									.then((result, error) => {
										if (result.status) {
											setDisableStakeBtn(false)
											ClaimTable(setClaim_Table)
											swal(`Staked Successfully!`).then((val) => {
												setStakedAmount(stakedAmount + Number(amount))
												fetchAvailableBalance(setAvailablebalance)
												form.resetFields()
												setData && setData()
											})
										} else {
											setDisableStakeBtn(false)
											swal(`Staked failed please try again!`)
										}
									})
									.catch((e) => {
										setDisableStakeBtn(false)
										swal(`Staked failed please try again!`)
									})
							} else {
								setDisableStakeBtn(false)
								swal(`Staked failed please try again!`)
							}
						} else {
							setDisableStakeBtn(false)
							swal(`Staked failed please try again!`)
						}
					})
			} else {
				try {
					stakedate = await StakeContract.lock(
						accounts[0],
						uniqueId,
						weiAmount,
						date,
						autoStaked
					)
				} catch (e) {
					setDisableStakeBtn(false)
					if (e.code === 4001) {
						return swal('User denied transaction.')
					}
				}
				if (stakedate) {
					provider
						.waitForTransaction(stakedate.hash)
						.then((result, error) => {
							if (result.status) {
								setDisableStakeBtn(false)
								ClaimTable(setClaim_Table)
								swal(`Staked Successfully!`).then((val) => {
									setStakedAmount(stakedAmount + Number(amount))
									fetchAvailableBalance(setAvailablebalance)
									form.resetFields()
									setData && setData()
								})
							} else {
								setDisableStakeBtn(false)
								swal(`Staked failed please try again!`)
							}
						})
						.catch((e) => {
							setDisableStakeBtn(false)
							swal(`Staked failed please try again!`)
						})
				} else {
					setDisableStakeBtn(false)
					swal(`Staked failed please try again!`)
				}
			}
			// setDisableStakeBtn(false)
			return stakedate
		}
	})
}

export const getNextFetchBalance = async (
	setNextFetchBalane,
	setNextFetchBalaneTime
) => {
	let { chk } = await fetchStakeAmountFn()
	var sevendays_Bal = 0
	var Nexttimestamp = 0
	for (let i = 0; i < chk.length; i++) {
		if (chk[i]) {
			var value = ethers.utils.formatEther(String(chk[i].args['_value']))
			var startUnix = String(chk[i].args['_startTime'])
			if (startUnix > Nexttimestamp) {
				var days = 7 * 24 * 60 * 60
				var fsevenDays = parseInt(startUnix) + parseInt(days)
				Nexttimestamp = Nexttimestamp + fsevenDays
			} else if (startUnix < Nexttimestamp) {
				sevendays_Bal = parseFloat(sevendays_Bal) + parseFloat(value)
			}
			setNextFetchBalane(sevendays_Bal)
			setNextFetchBalaneTime(Nexttimestamp)
			let currentTime = new Date().getTime()
			let fetchBalanceTime1 = Nexttimestamp * 1000
			let fetchBalanceTime = new Date(fetchBalanceTime1).getTime()
			let a1 = new Date(fetchBalanceTime)
			let differenceTime = fetchBalanceTime - currentTime
			let differenceDays = Math.floor(
				Math.abs(differenceTime / (1000 * 3600 * 24))
			)
			setNextFetchBalaneTime(differenceDays + 2)
		}
	}
}

export const getAccumulatedFee = async (setAccumulatedFee) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const signer = await provider.getSigner()
	const StakeContract = new ethers.Contract(address, abi, provider)
	let accumulatedStakingFee

	accumulatedStakingFee = await StakeContract.accumulatedStakingFee()
	let formatedAmount = ethers.utils.formatEther(accumulatedStakingFee, 18)
	setAccumulatedFee(formatedAmount)
}

export const getBufferPool = async (setBufferPool) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const signer = await provider.getSigner()
	const StakeContract = new ethers.Contract(address, abi, provider)
	let bufferPool

	bufferPool = await StakeContract.getBufferPoolBalance()
	let formatedAmount = ethers.utils.formatEther(bufferPool, 18)
	setBufferPool(formatedAmount)
}

export const getUSDAOAdd = async (setUsdaoAddress) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const address = usm.address[network.chainId]
	setUsdaoAddress(address)
}

export const getStakingAdd = async (setStakingAddress) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	setStakingAddress(address)
}

export const getBufferPoolAdd = async (setBufferPoolAdd) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const StakeContract = new ethers.Contract(address, abi, provider)
	let bufferPool

	bufferPool = await StakeContract.bufferPoolContract()
	setBufferPoolAdd(bufferPool)
}

export const getReservePool = async (setReservePool) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const abi = Stake.abi
	const network = await provider.getNetwork()
	const address = Stake.address[network.chainId]
	const signer = await provider.getSigner()
	const StakeContract = new ethers.Contract(address, abi, provider)
	let reservePool

	reservePool = await StakeContract.getReservePool()
	let formatedAmount = ethers.utils.formatEther(reservePool, 18)
	setReservePool(formatedAmount)
}

export const StakeLockAmount = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.getLockAmount(address)
	dispatch(STAKE_AMUONT_LOADED(Number(amount)))
}

export const TVLAmount = async (settvlAmount) => {
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const abi = Stake.abi
	const address = Stake.address[network.chainId]
	const StakingContract = new ethers.Contract(address, abi, provider)
	const tvlamount = await StakingContract.TVL()
	const tvlamountEath = ethers.utils.formatUnits(tvlamount, 18)
	settvlAmount(Number(tvlamountEath))
}

export const StakeLockValidity = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.getLockValidity(address)
	dispatch(
		STAKE_VALIDITY_LOADED(
			moment.unix(Number(amount['endValidity'])).format('MM/DD/YYYY')
		)
	)
}

export const StakeLockReward = async (dispatch, usm, signer) => {
	const address = await signer.getAddress()
	const amount = await usm.calculateReward(address)
	dispatch(stakeLockRewardLoaded(Number(amount[5])))
}

export const claimUsdao = async (
	Stake,
	StakeId,
	setStakedAmount,
	stakedAmount,
	setDisableClaimbtn,
	setAvailablebalance,
	setClaim_Table
) => {
	var myWeb3 = new Web3(window.web3.currentProvider)

	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			const signer = await provider.getSigner()
			const abi = Stake.abi
			const address = Stake.address[network.chainId]
			const StakeContract = new ethers.Contract(address, abi, signer)
			let response, currentTime
			const contract = new ethers.Contract(address, abi, provider)
			try {
				var sevendays_Bal = 0
				const chk = await contract.queryFilter('Lock')
				var timestamp = 0
				for (let i = 0; i < chk.length; i++) {
					if (chk[i]) {
						const id = parseInt(chk[i].args['StakeId'])
						var stakeId = parseInt(chk[i].args['StakeId'])
						var lStakeId = parseInt(chk[i].args['StakeId'])

						var value = ethers.utils.formatEther(String(chk[i].args['_value']))
						var startUnix = String(chk[i].args['_startTime'])
						var days = 7 * 24 * 60 * 60

						var startUnix = String(chk[i].args['_startTime'])
						var fsevenDays = parseInt(startUnix) + parseInt(days)
						if (id == StakeId) {
							var startUnix = String(chk[i].args['_startTime'])
							var days = 7 * 24 * 60 * 60

							var startUnix = String(chk[i].args['_startTime'])
							var fsevenDays = parseInt(startUnix) + parseInt(days)
							timestamp = timestamp + fsevenDays
						}

						if (startUnix <= timestamp) {
							sevendays_Bal = parseFloat(sevendays_Bal) + parseFloat(value)
						}
					}
				}

				timestamp = 0
				const weiAmount = ethers.utils.parseEther(String(sevendays_Bal))
				currentTime = new Date().getTime()
				response = await StakeContract.claim(StakeId)
			} catch (e) {
				console.log(e, 'error in staking !!')
				setDisableClaimbtn(false)
				if (String(e).includes('Insufficient balance')) {
					return swal(
						'Insufficient Balance! please try after sometime. Thank You!'
					).then((res, err) => {
						if (res)
							ClaimTable(setClaim_Table, setStakedAmount, setDisableClaimbtn)
					})
				}
				if (String(e).includes('User already rewarded')) {
					return swal('You have been already awarded for this staked amount!')
				}
				if (e.code === 4001) {
					return swal('User denied transaction.')
				}
			}

			if (response) {
				provider.waitForTransaction(response.hash).then(async (res, err) => {
					if (res.status) {
						swal('Claimed Successfully').then((res, err) => {
							if (res) {
								let totalStakedAmount =
									parseFloat(stakedAmount) - parseFloat(value)
								setStakedAmount && setStakedAmount(totalStakedAmount)
								setAvailablebalance &&
									fetchAvailableBalance(setAvailablebalance)
								ClaimTable(setClaim_Table, setStakedAmount, setDisableClaimbtn)
							}
						})
					} else {
						setDisableClaimbtn(false)
						swal('Please try again')
					}
				})
			}
			return response
		}
	})
}

export const claimEndDate = async (setClaimenable) => {
	var myWeb3 = new Web3(window.web3.currentProvider)

	myWeb3.eth.getAccounts(async (err, accounts) => {
		if (err) {
			console.log(err)
		} else {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const network = await provider.getNetwork()
			const abi = Stake.abi
			const address = Stake.address[network.chainId]
			const StakeContract = new ethers.Contract(address, abi, provider)
			const claimenddate = await StakeContract.getLockEndTime(accounts[0])

			setClaimenable(Number(claimenddate))
		}
	})
}

export const fetchRewardPercent = async (setRewardPercent) => {
	var myWeb3 = new Web3(window.web3.currentProvider)
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	const network = await provider.getNetwork()
	const abi = Stake.abi
	const address = Stake.address[network.chainId]
	const StakeContract = new ethers.Contract(address, abi, provider)
	const rewardPercentage = await StakeContract._reward()
	setRewardPercent(Number(rewardPercentage))
}
