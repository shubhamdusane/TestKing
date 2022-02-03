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
		fontSize: 24,
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
		fontSize: 18,
		fontWeight: 400
	}
}))

const CssTextField = withStyles({
	root: {
		color: 'white',
		fontSize: 20,
		width: '100vh',
		borderBottomColor: 'white',
		'& label': {
			color: 'white',
			fontSize: 20
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: 'white',
			fontSize: 20
		},
		'& label.Mui-focused': {
			color: 'white'
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'white'
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'white'
			},
			'&:hover fieldset': {
				borderColor: 'white'
			},
			'&.Mui-focused fieldset': {
				borderColor: 'white'
			}
		}
	}
})(TextField)

const Step4 = ({ changeIndex, index, state, changeState }) => {
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
							<span style={{ marginTop: 6, color: 'rgb(217, 226, 241)' }}>
								4
							</span>
							<ArrowForwardIcon style={{ marginTop: 8, fontSize: 18 }} />
						</div>
						<div
							style={{
								marginLeft: 15
							}}
						>
							<div className={classes.title}>
								Please provide Contact Details ( Email / Skype / Telegram /
								Discord / Phone) ?*
							</div>
							<div
								style={{
									marginBottom: 20,
									fontWeight: 'unset',
									fontSize: '20px',
									lineHeight: '28px',
									color: 'rgba(255, 255, 255, 0.7)',
									textAlign: 'left'
								}}
							>
								*This question is required. We'll use this to get back to you.
								No spam or unexpected newsletters here.
							</div>
							<div>
								<CssTextField
									id='custom-css-standard-input'
									placeholder='Type your answer here...'
									InputProps={{ classes: { input: classes['input'] } }}
									value={state.find((s) => s.level === index)?.response || ''}
									onChange={(e) => {
										changeState({
											level: index,
											response: e.target.value,
											question:
												'Please provide Contact Details ( Email / Skype / Telegram / Discord / Phone) ?'
										})
									}}
								/>
							</div>
							<div>
								<Button
									onPress={() => {
										if (!state.find((s) => s.level === index)) {
											alert('Please fill the required field !')
											return
										}
										changeIndex(index)
									}}
								/>
							</div>
						</div>
					</BouncyDiv>
				</Grid>
			</Grid>
		</Box>
	)
}

export { Step4 }
