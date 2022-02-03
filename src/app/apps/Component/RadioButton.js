import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
	answerIcon: {
		width: '22px',
		height: '22px',
		background: 'black',
		color: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderRadius: '2px',
		borderColor: 'rgba(217, 226, 241, 0.6)',
		backgroundColor: 'rgb(15, 25, 35)'
	},
	answerFullIcon: {
		position: 'absolute',
		minWidth: '50px',
		left: -20,
		height: '22px',
		background: 'black',
		color: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderRadius: '2px',
		borderColor: 'rgba(217, 226, 241, 0.6)',
		backgroundColor: 'rgb(15, 25, 35)'
	},
	radioButton: {
		marginTop: 10,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'start',
		backgroundColor: 'rgba(217, 226, 241, 0.1)',
		boxShadow: 'rgb(217 226 241 / 60%) 0px 0px 0px 1px inset',
		color: 'rgb(217, 226, 241)',
		maxWidth: '100%',
		minWidth: '150px',
		minHeight: '40px',
		outline: '0px',
		padding: '4px',
		cursor: 'pointer',
		opacity: 1,
		fontWeight: 'unset',
		lineHeight: '28px',
		fontSize: 18
	},
	radioMouseButton: {
		marginTop: 10,
		borderRadius: 4,
		paddingLeft: 30,
		alignItems: 'center',
		justifyContent: 'start',
		backgroundColor: 'rgba(217, 226, 241, 0.1)',
		boxShadow: 'rgb(217 226 241 / 60%) 0px 0px 0px 1px inset',
		color: 'rgb(217, 226, 241)',
		maxWidth: '100%',
		minWidth: '150px',
		minHeight: '40px',
		outline: '0px',
		padding: '4px',
		cursor: 'pointer',
		opacity: 1,
		fontWeight: 'unset',
		lineHeight: '28px',
		fontSize: 18
	},
	radioFullButton: {
		marginTop: 10,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'start',
		backgroundColor: 'rgba(217, 226, 241, 0.1)',
		boxShadow: 'rgb(217 226 241 / 60%) 0px 0px 0px 1px inset',
		color: 'rgb(217, 226, 241)',
		maxWidth: '100%',
		minWidth: '100%',
		minHeight: '40px',
		outline: '0px',
		padding: '4px',
		cursor: 'pointer',
		opacity: 1,
		fontWeight: 'unset',
		lineHeight: '28px',
		fontSize: 18
	},
	radioFullMouseButton: {
		marginTop: 10,
		borderRadius: 4,
		paddingLeft: 30,
		alignItems: 'center',
		justifyContent: 'start',
		backgroundColor: 'rgba(217, 226, 241, 0.1)',
		boxShadow: 'rgb(217 226 241 / 60%) 0px 0px 0px 1px inset',
		color: 'rgb(217, 226, 241)',
		maxWidth: '100%',
		minWidth: '100%',
		minHeight: '40px',
		outline: '0px',
		padding: '4px',
		cursor: 'pointer',
		opacity: 1,
		fontWeight: 'unset',
		lineHeight: '28px',
		fontSize: 18
	}
}))
function RadioButton({ iconText, label, fullWidth, selected, onPress }) {
	const classes = useStyles()
	const [showFull, setShowFull] = React.useState(false)
	return (
		<Chip
			variant='outlined'
			clickable
			avatar={
				<Avatar
					className={
						showFull || selected ? classes.answerFullIcon : classes.answerIcon
					}
					style={{
						backgroundColor: selected ? 'rgb(217, 226, 241)' : 'rgb(15, 25, 35)'
					}}
				>
					<div
						style={{
							borderRadius: 4,
							textAlign: 'center',
							fontSize: 12,
							color: selected ? 'black' : 'white'
						}}
					>
						{showFull || selected ? `Key ${iconText}` : iconText}
					</div>
				</Avatar>
			}
			label={label}
			className={
				fullWidth
					? showFull || selected
						? classes.radioFullMouseButton
						: classes.radioFullButton
					: showFull || selected
					? classes.radioMouseButton
					: classes.radioButton
			}
			style={{
				borderColor: selected ? 'rgb(217, 226, 241)' : 'rgb(15, 25, 35)'
			}}
			onMouseEnter={() => setShowFull(true)}
			onMouseLeave={() => setShowFull(false)}
			onClick={onPress}
		/>
	)
}
export default RadioButton
