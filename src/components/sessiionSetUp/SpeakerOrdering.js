import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Typography  } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';

export default function SpeakerOrdering(props){
    const { 
        isModalOpen, 
        modalCloseAction, 
        orderedList,
        reOrderCallback,
        topic,
        topicChangeAction,
        launchCallback
    } = props;

    return(
        <Dialog
            className="modalMainContainer"
            open={ isModalOpen }
            // onClose={ () => { modalCloseAction(); } }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" className="modalHeader">
                Speaker Order
                <CancelIcon 
                    className="cancelIcon" 
                    fontSize="large"
                    onClick={ () => { modalCloseAction(false); } }
                />
            </DialogTitle>
            <DialogContent className="modalContext">
                <DialogContentText id="alert-dialog-description">
                    <TextField 
                        className="topicField"
                        fullWidth
                        size="small"
                        value={ topic }
                        onChange={ (e) => { topicChangeAction(e.target.value); } }
                        id="outlined-basic" 
                        label="Enter Today's Topic" 
                        variant="outlined"
                    />
                    {
                        orderedList.map((singleSpeaker, singleSpeakerIndex) => { 
                            return(
                                <Grid container className="singleSpeakerBlock" fullWidth>
                                    <Grid item lg={1} md={1} sm={1} xs={1}>
                                        <h3>{ singleSpeakerIndex + 1 }</h3>
                                    </Grid>
                                    <Grid item lg={10} md={10} sm={10} xs={10}>
                                        <h3>{ singleSpeaker.name + (singleSpeaker.type ? (" - " + singleSpeaker.type) : "") }</h3>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    className="cancelBtn" 
                    size="large"
                    onClick={ () => { reOrderCallback(); } }
                    endIcon={<ReplayIcon/>} 

                >
                    ReOrder
                </Button>
                <Button 
                    variant="contained" 
                    className="guessAddBtn launchBtn" 
                    size="large"
                    onClick={ () => { launchCallback(); } }
                    endIcon={<PlayArrowIcon/>} 
                >
                    Launch
                </Button>
            </DialogActions>
        </Dialog>
        
    );
}  