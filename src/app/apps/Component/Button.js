import React from 'react';
import cn  from 'classnames';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: 20,
        fontFamily: 'inherit',
        fontWeight: 700,
        cursor: 'pointer',
        outline: 'none',
        border: '1px solid transparent',
        margin: '0px',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 12px 0px',
        padding: '6px 14px',
        minHeight: '40px',
        backgroundColor: 'rgb(0, 92, 249)',
        color: 'rgb(255, 255, 255)',
        borderRadius: '4px',
        fontSize: 20
    },
}))

function Custom({ onPress, title, customClass}) {
    const classes = useStyles()
    return (
        <Button
            variant="contained"
            color="primary"
            className={cn(classes.button, customClass)}
            endIcon={title ? <> </> : <CheckIcon />}
            onClick={onPress}
        >
            {title ? title : 'OK'}
        </Button>
    )
}

export default Custom
