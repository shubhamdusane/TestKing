import React from 'react'
import { Box } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from './Component/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import '../../contact.css';


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

	return (
		<h2>Whitepapper</h2>
    )
}

export default Support