import React, { useEffect, useState } from 'react'
import {
	readContractFunction,
	writeContractPrivate,
	writeContractFunction,
	getAddress,
	balanceOf,
	balanceOfAddress
} from '../sdk/tradingSdk'
import { ethers } from 'ethers'
import axios from 'axios'
import { api_endpoint } from '../apps/api'
import {
	FacebookShareButton,
	TwitterShareButton,
	FacebookIcon,
	TwitterIcon
} from 'react-share'
import '../../app/App.scss'

export default function App() {
	const questions = [
		{
			questionText:
				'The price of USDAO is volatile like the price of Bitcoin or Ethereum.',
			answerOptions: [
				{ answerText: 'True', isCorrect: false },
				{ answerText: 'False', isCorrect: true }
			]
		},
		{
			questionText: 'USDAO is backed by US dollars in the bank.',
			answerOptions: [
				{ answerText: 'True', isCorrect: false },
				{ answerText: 'False', isCorrect: true }
			]
		},
		{
			questionText:
				'Holders of the ASSET token can propose and vote on changes to be made to the USDAO ecosystem.',
			answerOptions: [
				{ answerText: 'True', isCorrect: false },
				{ answerText: 'False', isCorrect: true }
			]
		},
		{
			questionText: 'There is an unlimited supply of DAOGOV tokens.',
			answerOptions: [
				{ answerText: 'True', isCorrect: false },
				{ answerText: 'False', isCorrect: true }
			]
		},
		{
			questionText:
				'The USDAO Foundation will release SDKs and other tools to help developers build use cases for the USDAO token.',
			answerOptions: [
				{ answerText: 'True', isCorrect: true },
				{ answerText: 'False', isCorrect: false }
			]
		}
	]
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [showScore, setShowScore] = useState(false)
	const [balance, setBalance] = useState(0)
	const [score, setScore] = useState(0),
		[questionHash, setQuestionHash] = useState([]),
		[ansHash, setAnsHash] = useState([]),
		[reward, setreward] = useState([]),
		[showHappy, setShowHappy] = useState(false),
		[isRegistered, setIsRegistered] = useState(false),
		[transactionProcess, setTranProcess] = useState(false),
		[startWait, setStartWait] = useState(false),
		[shareStatus, setShareStatus] = useState(false),
		[privatekeyShow, setPrivateKeyShow] = useState(false),
		[sharedreward, setSharedreward] = useState(false),
		[balanceShowStatus, setBalanceShowStatus] = useState(true)

	const handleAnswerOptionClick = async (isCorrect, question, answer) => {
		const currentQues = question['questionText'],
			currentQuestionHash = ethers.utils.sha256(ethers.utils.id(currentQues)),
			currentAnsHash = ethers.utils.sha256(ethers.utils.id(answer)),
			prizeAmount = ethers.utils.parseEther('20')

		questionHash.push(currentQuestionHash)
		ansHash.push(currentAnsHash)
		reward.push(String(prizeAmount))

		const quizContract = await writeContractPrivate('quiz')
		const nextQuestion = currentQuestion + 1
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion)
		} else {
			setBalanceShowStatus(false)
			setShowScore(true)
			setShowHappy(true)
			setTimeout(() => {
				setShowHappy(false)
			}, 5000)

			quizContract
				.userResponseArray(questionHash, ansHash, reward)
				.then((data) => {
					setTranProcess(false)

					const checkBal = setInterval(() => {
						;(async () => {
							let newBal = await balanceOfAddress(
								'usm',
								localStorage.getItem('userAddress')
							)
							setBalance(
								await balanceOfAddress(
									'usm',
									localStorage.getItem('userAddress')
								)
							)
							if (newBal !== balance) {
								setBalance(newBal)
								setBalanceShowStatus(true)
								clearInterval(checkBal)
							}
						})()
					}, 6000)
				})
				.catch((error) => {
					console.log('error', error)
				})
		}
		if (isCorrect) {
			setScore(score + 1)
		}
	}
	;(async () => {
		if (localStorage.getItem('userAddress')) {
		} else {
			const { address, privateKey } = ethers.Wallet.createRandom()
			localStorage.setItem('userAddress', address)
			localStorage.setItem('userPrivateKey', privateKey)
		}
		const balance = await balanceOfAddress(
			'usm',
			localStorage.getItem('userAddress')
		)
		setBalance(balance)
	})()

	const startQuiz = async () => {
		setStartWait(true)
		const quizContract = await writeContractPrivate('quiz')
		const isReady = await quizContract.isRegistered(
			localStorage.getItem('userAddress')
		)
		isReady
			? setIsRegistered(true)
			: axios
					.post(`${api_endpoint}/quiz/transaction`, {
						address: localStorage.getItem('userAddress'),
						socialShare: false
					})
					.then(function (response) {
						const checkRegister = setInterval(async () => {
							const isReg = await quizContract.isRegistered(
								localStorage.getItem('userAddress')
							)
							if (isReg) {
								setIsRegistered(true)
								clearInterval(checkRegister)
								setStartWait(false)
							}
						}, 5000)
					})
					.catch(function (error) {
						console.log(error)
					})
	}

	if (shareStatus) {
		if (!sharedreward) {
			axios
				.post(`${api_endpoint}/quiz/transaction`, {
					address: localStorage.getItem('userAddress'),
					socialShare: true
				})
				.then(function (response) {
					setSharedreward(true)
					const checkBal = setInterval(() => {
						;(async () => {
							let newBal = await balanceOfAddress(
								'usm',
								localStorage.getItem('userAddress')
							)
							setBalance(
								await balanceOfAddress(
									'usm',
									localStorage.getItem('userAddress')
								)
							)
							if (newBal !== balance) {
								setBalance(newBal)
								clearInterval(checkBal)
							}
						})()
					}, 6000)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	}

	const shareUrl = 'https://www.usdao.io/quiz'
	return (
		<div className='quiz-wrapper'>
			<div className='row'>
				<div className='header-image col-12'>
					<img
						src='/hack.png'
						alt='hackathon image'
						className='img-responsive'
					/>
				</div>
			</div>
			<div className='winner'>
				{showScore && showHappy && <img src='/assets/winner2.gif' />}
			</div>
			<div className='app-quiz'>
				{!isRegistered ? (
					<div className='col-md-12'>
						<div className='main-container btnWrapper text-center'>
							<button
								className='button'
								onClick={() => {
									startQuiz()
								}}
								disabled={startWait}
							>
								START
							</button>
							<br />
							{startWait && (
								<p>
									We are registering you, wait for blockchain confirmation...
								</p>
							)}
						</div>
						{/* <p><a href="https://twitter.com/intent/tweet?text=want%20to%20join%20USDAO%20quiz%20%23USDAO" target="_blank">Twit</a></p> */}
					</div>
				) : showScore ? (
					<div className='score-section'>
						<p>
							You scored {score} out of {questions.length} and win{' '}
							{balanceShowStatus ? balance : 'Waiting for blockchain status...'}{' '}
							USDAO{' '}
						</p>
						<p>Please save following details</p>
						<p>Public Address:</p>
						<p className='address'>
							{' '}
							<span>{localStorage.getItem('userAddress')}</span>{' '}
							<span
								className='copy'
								onClick={() => {
									navigator.clipboard.writeText(
										localStorage.getItem('userAddress')
									)
								}}
							>
								{' '}
								COPY
							</span>
						</p>
						<p>
							Private Key:{' '}
							<span
								className='showHide'
								onClick={() => setPrivateKeyShow(!privatekeyShow)}
							>
								{privatekeyShow ? 'Hide' : 'Show'}
							</span>
						</p>
						{privatekeyShow && (
							<p className='address'>
								{' '}
								<span>{localStorage.getItem('userPrivateKey')}</span>{' '}
								<span
									className='copy'
									onClick={() => {
										navigator.clipboard.writeText(
											localStorage.getItem('userPrivateKey')
										)
									}}
								>
									{' '}
									COPY
								</span>
							</p>
						)}
						<p>Please share on social media and get 100 USDAO</p>
						<div className='socialWrapper'>
							<FacebookShareButton
								url={
									'https://wyomingblockchainstampede.sched.com/event/nF7E/usdao-stabelcoin?iframe=no&w=100%25&sidebar=yes&bg=no'
								}
								onShareWindowClose={() => {
									setShareStatus(true)
								}}
							>
								<FacebookIcon />
							</FacebookShareButton>
							<TwitterShareButton
								url={
									" I'm excited to attend USDAO Stabelcoin at Wyoming Blockchain Stampede 2021 https://sched.co/nF7E @wyohackathon #wyohackathon @sched "
								}
								onShareWindowClose={() => setShareStatus(true)}
							>
								<TwitterIcon />
							</TwitterShareButton>
						</div>
					</div>
				) : (
					<div className='row'>
						<div className='question-section col-12'>
							<div className='question-count'>
								<span>Question {currentQuestion + 1}</span>/{questions.length}
								<span className='balance'>
									USDAO {balance}
									{/* <CountUp end={balance} /> */}
								</span>
							</div>
							<div className='question-text'>
								{questions[currentQuestion].questionText}
							</div>
						</div>
						<div className='answer-section col-12'>
							{questions[currentQuestion].answerOptions.map((answerOption) => (
								<button
									key={answerOption.answerText}
									onClick={() =>
										handleAnswerOptionClick(
											answerOption.isCorrect,
											questions[currentQuestion],
											answerOption.answerText
										)
									}
									disabled={transactionProcess}
								>
									{answerOption.answerText}
								</button>
							))}
						</div>
						<p className='process'>
							{transactionProcess && 'Waiting for Blockchain confirmation..'}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
