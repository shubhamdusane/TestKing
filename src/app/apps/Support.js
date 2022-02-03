import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from './Component/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import '../../contact.css';
import axios from 'axios';
import { api_endpoint } from './api'


const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: 24,
		lineHeight: '32px',
		fontFamily: 'sans serif',
		marginBottom: 30
	},
	questionContainer: {
		color: 'white',
		display: 'block',
	},
	input: {
		'&::placeholder': {
			textOverflow: 'ellipsis !important',
			color: 'white',
			fontSize: 28
		},
		color: 'white',
		fontSize: 28
	},
    textarea: {
		'&::placeholder': {
			textOverflow: 'ellipsis !important',
			color: 'white',
			fontSize: 28
		},
		color: 'white',
	    fontSize: 28
	},
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

const Support = ({history}) => {
    const classes = useStyles()
	const [ support, setSupport ] = useState({
		email: '',
		msg: ''
	}),
	[response, setresponse] = useState();

	const submitResponse = async () => {
		axios.post(`${api_endpoint}/contact/storeSupport`, support).then((err,data)=>{
			setresponse("success")
		})
		.catch(error => {
			setresponse("error")
		  });
	}

	return (
		<div className='App'>
			<Box
				display='flex'
				width='100%'
				height='100vh'
				position='relative'
				style={{
					overflow: 'hidden'
				}}
				className = 'boxWrap'
			>
			<Box m='auto'>
				<Grid container spacing={3} >
					<Grid item xs={6} className={classes.questionContainer}>
							<div
								style={{
									marginLeft: 15
								}}
							>
								<div className={classes.title}>Email ID</div>
								<div>
									<CssTextField
										id='custom-css-standard-input'
										placeholder='Type your email id...'
										InputProps={{ classes: { input: classes['input'] } }}
										onChange={e => {
											setSupport({
												...support, email: e.target.value
											})
										}}
									/>
								</div>
							</div>
							<div
								style={{
									marginLeft: 15
								}}
							>
								<div className={classes.title}>Messsage</div>
								<div>
									<CssTextField
										id='custom-css-standard-input'
										placeholder='Type your message...'
										variant="outlined"
										multiline
										rows={4}
										InputProps={{ classes: { input: classes['input'] } }}
										onChange={e => {
											setSupport({
												...support, message: e.target.value
											})
										}}
									/>
								</div>
								<div>
									<Button
										title='Submit'
										onPress={submitResponse}
									/>
								</div>
								<div>
									<br/>
									{response === "success" ? <h4 style={{'color':'#fff'}}>Your Response was submitted successfully , Thank You !</h4>
									: response === "error" ? <h4 style={{'color':'#fff'}}>Invalid Input</h4> : ''}
								</div>
							</div>
					</Grid>
				</Grid>
			</Box>
		</Box>
		
		<Box style={{
					position: 'absolute',
					bottom: 20,
					left: 20
				}}>
				<Button
						customClass = 'back-btn'
						onPress={() => history.goBack()}
						title='Back'
					/>
		</Box>
		
		
		</div>
	)
}

export default Support