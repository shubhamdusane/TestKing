import React from 'react'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'

const PopoverComp = ({ content, margin = false }) => {
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		console.log('fires event')
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined
	return (
		<>
			<InfoIcon
				aria-describedby={id}
				variant='contained'
				// onClick={handleClick}
				onMouseEnter={handleClick}
				onMouseLeave={handleClose}
				fontSize={'small'}
				style={{
					cursor: 'pointer',
					marginRight: '6px',
					marginLeft: '6px',
					marginTop: margin && '-10px'
				}}
			/>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<Typography sx={{ p: 2 }} style={{ padding: '10px' }}>
					{content}
				</Typography>
			</Popover>
		</>
	)
}

export { PopoverComp }
