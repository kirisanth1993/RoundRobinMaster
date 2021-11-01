import React, {useState} from 'react';
import "./SetUp.scss";

import { Grid, Typography, Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GuestAddingModal from './GuestAddingModal';
import ListSelection from './ListSelection';
import { nameList } from './nameList';

export default function SetUp(props){
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [initialTMList, setInitialTMList] = useState(nameList);
    const [newGuestList, setNewGuestList] = useState([]);

    const newGuestEnterAction = (list) => {
        setNewGuestList([...list]);
    }

    return(
        <Grid className="setupContainer">
            {
                isGuestModalOpen &&
                <GuestAddingModal
                    isModalOpen= { isGuestModalOpen }
                    modalCloseAction = { () => { setIsGuestModalOpen(false) } }
                    guestDataCallback= { (list) => { newGuestEnterAction(list) } }
                />
            }
            <Grid container display="flex" justifyContent="flex-end">
                <Button className="guessAddBtn" variant="contained" endIcon={<PersonAddIcon/>} onClick={ (e) => { setIsGuestModalOpen(true) } }>
                    Add Guests
                </Button>
            </Grid>
            <Grid className="listView">
                <ListSelection
                    newlyArrivedGuests={ newGuestList }
                />
            </Grid>
        </Grid>
    );
}  