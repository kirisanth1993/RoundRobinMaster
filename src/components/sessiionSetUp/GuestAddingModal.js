import React, { useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Typography, Hidden  } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

export default function GuestAddingModal(props){
    const { isModalOpen, modalCloseAction, guestDataCallback } = props;

    const [ newGuestList, setNewGuestList ] = useState([{
        name: "",
        isError: false   
    }]);

    const guestAddAction = (e, index) => {
        let canAdd = true;
        newGuestList.map((singleGuest) => {
            if(!singleGuest.name){
                singleGuest.isError = true;
                canAdd = false;
            }
        });

        if(canAdd){
            newGuestList.push({
                name: "",
                isError: false
            });
        }
        setNewGuestList([...newGuestList]);
    };

    const guestDeleteAction = (e, index)  => {
        newGuestList.splice(index,1);
        setNewGuestList([...newGuestList]);
    };

    const nameChangeAction = (e, index)  => {
        newGuestList[index].name = e.target.value;
        newGuestList[index].isError = false;
        setNewGuestList([...newGuestList]);
    };

    const saveGuestAction = () => {
        let canSave = true;
        newGuestList.map((singleGuest) => {
            if(!singleGuest.name){
                singleGuest.isError = true;
                canSave = false;
            }
        });

        if(canSave){
            guestDataCallback(newGuestList);
            modalCloseAction();
        }
        setNewGuestList([...newGuestList]);
    };

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
                Add Today's Guests Here
                <CancelIcon 
                    className="cancelIcon" 
                    fontSize="large"
                    onClick={ () => { modalCloseAction(false); } }
                />
            </DialogTitle>
            <DialogContent className="modalContext">
                <DialogContentText id="alert-dialog-description">
                    {
                        newGuestList.map((singleGuest, singleGuestIndex) => { 
                            return(
                                <Grid container className="singleFieldBlock" fullWidth>
                                    <Hidden xsDown>
                                        <Grid item lg={1} md={1} sm={1} xs={1}>
                                            <h3>{ singleGuestIndex + 1 }</h3>
                                        </Grid>
                                    </Hidden>
                                    <Grid item lg={8} md={8} sm={8} xs={8}>
                                    <TextField 
                                        fullWidth
                                        id="outlined-basic" 
                                        size="small"
                                        label={"Guest " + (singleGuestIndex+1)} 
                                        className="nameTextBox"
                                        variant="outlined"
                                        error={ singleGuest.isError }
                                        value={ singleGuest.name }
                                        onChange={ (e) => { !(/^ *$/.test(e.target.value)) && nameChangeAction(e, singleGuestIndex) } }
                                    />
                                    </Grid>
                                    <Grid item lg={3} md={3} sm={3} xs={4}>
                                        <Grid item>
                                        {
                                            newGuestList.length > 1 &&
                                            <DeleteIcon
                                                fontSize="large"
                                                className="actionIcon"
                                                onClick={ (e) => { guestDeleteAction(e, singleGuestIndex) } }
                                            />
                                        }
                                        {
                                            (singleGuestIndex === (newGuestList.length - 1)) &&
                                            <AddCircleOutlineIcon
                                                fontSize="large"
                                                className="actionIcon"
                                                onClick={ (e) => { guestAddAction(e, singleGuestIndex) } }
                                            />
                                        }
                                        </Grid>
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
                    className="guessAddBtn" 
                    size="large"
                    onClick={ () => { saveGuestAction(); } }
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
        
    );
}  