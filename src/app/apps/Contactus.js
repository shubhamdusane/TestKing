import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Step1, Step2, Step3, Step4, Step5, Step6, Step7 } from './Steps'
import '../../contact.css'
import axios from 'axios'
import { api_endpoint } from './api'

const Contactus = ({history}) => {

	const [index, setIndex] = useState(1)
	const [level, setLevel] = useState([])

	const changeIndex = (i) => {
		setIndex(i + 1)
	}

	const changeState = (value) => {
		let state = level.findIndex((l) => l.level === value.level)
		if (state > -1) {
			level[state] = value
			setLevel([...level])
		} else {
			setLevel([...level, value])
		}
	}

	const submitResponse = async () => {
		const { data } = await axios.post(`${api_endpoint}/contact/storeResponse`, {levels: level})
	}

	const returnStep = (index) => {
		switch (index) {
			case 1:
				return (
					<Step1
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						index={index}
					/>
				)
			case 2:
				return (
					<Step2
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						index={index}
					/>
				)
			case 3:
				return (
					<Step3
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						index={index}
					/>
				)
			case 4:
				return (
					<Step4
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						index={index}
					/>
				)
			case 5:
				return (
					<Step5
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						index={index}
					/>
				)
			case 6:
				return (
					<Step6
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						submitResponse={submitResponse}
						index={index}
					/>
				)
			case 7:
				return (
					<Step7
						state={level}
						changeState={changeState}
						changeIndex={changeIndex}
						index={index}
					/>
				)
			default:
				return <Step1 changeIndex={changeIndex} index={index} />
		}
	}

	return (
		<div className='App'>
			<Box>
				<LinearProgress variant='determinate' value={10} />
			</Box>
			<Box
				display='flex'
				width='100%'
				height='100vh'
				style={{
					overflow: 'hidden'
				}}
			>
				{returnStep(index)}
			</Box>
			<Box
				style={{
					position: 'absolute',
					bottom: 20,
					right: 20
				}}
			>
				{index !== 7 && (
					<ButtonGroup disableElevation variant='contained' color='primary'>
						<Button
							style={{
								backgroundColor: 'rgb(0, 92, 249)',
								boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 12px 0px'
							}}
							onClick={() => {
								if (index > 1) {
									setIndex(index - 1)
								}
							}}
						>
							<KeyboardArrowUpIcon />
						</Button>
						<Button
							style={{
								backgroundColor: 'rgb(0, 92, 249)',
								boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 12px 0px'
							}}
							onClick={() => {
								if (index < 6) {
									setIndex(index + 1)
								}
							}}
						>
							<KeyboardArrowDownIcon />
						</Button>
					</ButtonGroup>
				)}
				
				
			</Box>
			<Box style={{
					position: 'absolute',
					bottom: 20,
					left: 20
				}}>
					<Button
							style={{
								backgroundColor: 'rgb(0, 92, 249)',
								boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 12px 0px',
								color: '#fff'
							}}
							onClick={() => history.goBack()}
						>
							Back
					</Button>
			</Box>
			
		</div>
	)
}

export default Contactus
