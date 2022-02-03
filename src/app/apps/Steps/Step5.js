import React from 'react'
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../Component/Button'
import RadioButton from '../Component/RadioButton'
import { fadeInUp } from 'react-animations'
import styled, { keyframes } from 'styled-components'

const bounceAnimation = keyframes`${fadeInUp}`

const BouncyDiv = styled.div`
	animation: 1s ${bounceAnimation};
	display: flex;
`

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: 24,
		lineHeight: '32px',
		fontFamily: 'sans serif',
		marginBottom: 30
	},
	questionContainer: {
		color: 'white',
		display: 'flex',
		margin: 'auto'
	}
}))

const Step5 = ({ changeIndex, index, state, changeState }) => {
	const classes = useStyles()
	const findSelected = (value) => {
		return state.find((s) => s.level === index)?.response === value
	}
	return (
		<Box m='auto'>
			<Grid container spacing={3} style={{ width: '100vw' }}>
				<Grid item xs={8} className={classes.questionContainer}>
					<BouncyDiv style={{
						       margin: '0 auto'
							}}>
						<div
							style={{
								display: 'flex',
								fontSize: 20
							}}
						>
							<span style={{ marginTop: 6, color: 'rgb(217, 226, 241)' }}>
								5
							</span>
							<ArrowForwardIcon style={{ marginTop: 8, fontSize: 18 }} />
						</div>
						<div
							style={{
								marginLeft: 15
							}}
						>
							<div className={classes.title}>How can USDAO help you ?</div>
							<div>
								<RadioButton
									iconText='A'
									label='USDAO SDK: Integrate your business with USDAO ecosystem'
									fullWidth={true}
									selected={findSelected('A')}
									onPress={(e) => {
										changeState({
											response: 'A',
											question: 'How can USDAO help you ?',
											level: index,
											metadata: 'USDAO SDK: Integrate your business with USDAO ecosystem'
										})
									}}
								/>
							</div>
							<div>
								<RadioButton
									iconText='B'
									label='Partner with us'
									fullWidth={true}
									selected={findSelected('B')}
									onPress={(e) => {
										changeState({
											response: 'B',
											question: 'How can USDAO help you ?',
											level: index,
											metadata: 'Partner with us'
										})
									}}
								/>
							</div>
							<div>
								<RadioButton
									iconText='C'
									label='Technical support'
									fullWidth={true}
									selected={findSelected('C')}
									onPress={(e) => {
										changeState({
											response: 'C',
											question: 'How can USDAO help you ?',
											level: index,
											metadata: 'Technical support'
										})
									}}
								/>
							</div>
							<div>
								<RadioButton
									iconText='D'
									label='Other'
									fullWidth={true}
									selected={findSelected('D')}
									onPress={(e) => {
										changeState({
											response: 'D',
											question: 'How can USDAO help you ?',
											level: index,
											metadata: 'Other'
										})
									}}
								/>
							</div>
							<div>
								<Button onPress={() => changeIndex(index)} />
							</div>
						</div>
					</BouncyDiv>
				</Grid>
			</Grid>
		</Box>
	)
}

export { Step5 }
