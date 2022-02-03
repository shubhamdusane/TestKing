import React from 'react'
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Button from '../Component/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { fadeInUp } from 'react-animations'
import styled, { keyframes } from 'styled-components'

const bounceAnimation = keyframes`${fadeInUp}`

const BouncyDiv = styled.div`
	animation: 1s ${bounceAnimation};
	display: flex;
`

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: 30,
		lineHeight: '32px',
		fontFamily: 'sans serif',
		marginBottom: 30
	},
	questionContainer: {
		color: 'white',
		display: 'flex',
		margin: 'auto'
	},
	input: {
		'&::placeholder': {
			textOverflow: 'ellipsis !important',
			color: 'white',
			fontSize: 28
		},
		color: 'white',
		fontSize: 28
	}
}))

const Step7 = ({ state, changeState, index }) => {
	const classes = useStyles()
	return (
		<Box m='auto' style={{ width: '100%' }}>
			<Grid container spacing={3}>
				<Grid item xs={6} className={classes.questionContainer}>
					<BouncyDiv>
						<div
							style={{
								display: 'flex',
								fontSize: 20
							}}
						>
							<span
								style={{ marginTop: 6, color: 'rgb(217, 226, 241)' }}
							></span>
							{/* <ArrowForwardIcon style={{ marginTop: 8, fontSize: 18 }} /> */}
						</div>
						<div
							style={{
								marginLeft: 15
							}}
						>
							<div className={classes.title}>
								Your Response was submitted successfully , Thank You !
							</div>
							<div></div>
							<div></div>
						</div>
					</BouncyDiv>
				</Grid>
			</Grid>
		</Box>
	)
}

export { Step7 }
