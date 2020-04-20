import React from 'react';
import { Dialog } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        width: 'unset',
        maxWidth: 'unset',
        background: 'transparent',
        boxShadow: 'none'
    }
});

export default withStyles(styles)(({
    classes,
    open,
    onClose
}) => {
    return (
        <Dialog classes={{
            paper: classes.paper
        }} fullWidth onClose={onClose} aria-labelledby="simple-dialog-title" open={Boolean(open)}>
            <img width={800} src={require('./distribute-crop.png')} alt="distribution" />
        </Dialog>
    )
});
