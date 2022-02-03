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

const Step1 = ({ changeIndex, index, state, changeState }) => {
	const classes = useStyles()
	return (
		<Box m='auto'>
			<Grid container spacing={3}>
				<Grid item xs={8} className={classes.questionContainer}>
					<BouncyDiv>
						<div
							style={{
								display: 'flex',
								fontSize: 20
							}}
						>
							<span style={{ marginTop: 6, color: 'rgb(217, 226, 241)' }}>
								1
							</span>
							<ArrowForwardIcon style={{ marginTop: 8, fontSize: 18 }} />
						</div>
						<div
							style={{
								marginLeft: 15
							}}
						>
							<div className={classes.title}>
								Are you willing to scale up your solutions based with USDAO
								stable coin and make your business global ?
							</div>
							<div>
								<RadioButton
									iconText='Y'
									label='Yes'
									onPress={(e) => {
										changeState({
											level: index,
											question:
												'Are you willing to scale up your solutions based with USDAO stable coin and make your business global ?',
											response: 'Y'
										})
									}}
									selected={
										state.find((s) => s.level === index)?.response === 'Y'
									}
								/>
							</div>
							<div>
								<RadioButton
									iconText='N'
									label='No'
									onPress={(e) => {
										changeState({
											level: index,
											question:
												'Are you willing to scale up your solutions based with USDAO stable coin and make your business global ?',
											response: 'N'
										})
									}}
									selected={
										state.find((s) => s.level === index)?.response === 'N'
									}
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

export { Step1 }
