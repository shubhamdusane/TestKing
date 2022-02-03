import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Popover } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
	popover: {
		pointerEvents: 'none'
	},
	popoverContent: {
		pointerEvents: 'auto'
	}
}))

const PopOver2 = ({ content, margin = false, children: Children }) => {
	const [openedPopover, setOpenedPopover] = useState(false)
	const popoverAnchor = useRef(null)

	const popoverEnter = ({ currentTarget }) => {
		setOpenedPopover(true)
	}

	const popoverLeave = ({ currentTarget }) => {
		setOpenedPopover(false)
	}

	const classes = useStyles()

	return (
		<>
			<InfoIcon
				ref={popoverAnchor}
				aria-owns='mouse-over-popover'
				aria-haspopup='true'
				onMouseEnter={popoverEnter}
				onMouseLeave={popoverLeave}
				style={{
					cursor: 'pointer',
					marginRight: '6px',
					marginLeft: '6px',
					marginTop: margin && '-10px',
					fontSize: '15px'
				}}
			/>

			<Popover
				id='mouse-over-popover'
				className={classes.popover}
				classes={{
					paper: classes.popoverContent
				}}
				open={openedPopover}
				anchorEl={popoverAnchor.current}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
			>
				<Typography sx={{ p: 2 }} style={{ padding: '10px', fontSize: '12px' }}>
					{content}
				</Typography>
			</Popover>
		</>
	)
}

export { PopOver2 as PopoverComp }
