import React, {useEffect, useState} from 'react';
import "./SetUp.scss";

import { Grid, Typography, Button, TextField, Box } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GuestAddingModal from './GuestAddingModal';
import ListSelection from './ListSelection';
import { nameList } from './nameList';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import cloneDeep from 'lodash/cloneDeep';
import SpeakerOrdering from './SpeakerOrdering';
import GamesIcon from '@material-ui/icons/Games';
import Launch from '../launch/Launch';

export default function SetUp(props){
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [newGuestList, setNewGuestList] = useState([]);
    const [selectedTimer, setSelectedTimer] = useState();
    const [selectedTimerObj, setSelectedTimerObj] = useState();
    const [timerOptions, setTimerOptions] = useState([]);
    const [selectedRoundRobin, setSelectedRoundRobin] = useState();
    const [selectedRoundRobinObj, setSelectedRoundRobinObj] = useState();
    const [roundRobinOptions, setRoundRobinOptions] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [isSpeakerOrderModalOpen, setIsSpeakerOrderModalOpen] = useState(false);
    const [todaysTopic, setTodaysTopic] = useState("");
    const [arrangedList, setArrangedList] = useState([]);
    const [isLaunchPage, setIsLaunchPage] = useState(false);
    
    const [speakerList, setSpeakerList] = useState(cloneDeep(nameList));
    const [filteredSpeakerList, setFilteredSpeakerList] = useState(cloneDeep(nameList));

    useEffect(() => {
        newGuestList.map((singleGuest) => {
            speakerList.push({
                name: "Guest " + singleGuest.name,
                imageLink: "guest1.jpg",
                isSelected: true
            });
            filteredSpeakerList.push({
                name: "Guest " + singleGuest.name,
                imageLink: "guest1.jpg",
                isSelected: true
            });
        });
        setSpeakerList([...speakerList]);
        setFilteredSpeakerList([...filteredSpeakerList]);
        searchAction(searchKey);
    },[newGuestList]);

    const searchAction = ((searchValue) => {
        setSearchKey(searchValue);
        setFilteredSpeakerList([...speakerList.filter((singlePerson) => {
            return(
                singlePerson.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                singlePerson.name !== selectedTimer && singlePerson.name !== selectedRoundRobin
            );
        })]);
    });

    useEffect(() => {
        let timerList = nameList.filter((singlePerson) => {
            return(singlePerson.name !== selectedRoundRobin);
        });
        setTimerOptions([...timerList]);
        searchAction(searchKey);
    },[selectedRoundRobin]);

    useEffect(() => {
        let timerList = nameList.filter((singlePerson) => {
            return((singlePerson.name !== selectedTimer));
        });
        setRoundRobinOptions([...timerList]);
        searchAction(searchKey);
    },[selectedTimer]);

    const newGuestEnterAction = (list) => {
        setNewGuestList([...list]);
    }

    const speakerSelectAction = (index) => {
        speakerList[index].isSelected = !speakerList[index].isSelected;
        filteredSpeakerList[index].isSelected = speakerList[index].isSelected;
        setSpeakerList([...speakerList]);
        setFilteredSpeakerList([...filteredSpeakerList]);
    }

    const orderGenerateAction = (() => {
        let pureSpeakerList = speakerList.filter((singlePerson) => {
            return(singlePerson.isSelected && singlePerson.name !== selectedTimer && singlePerson.name !== selectedRoundRobin);
        });
        let randomOrderedList = pureSpeakerList.sort(() => Math.random() - 0.5);
        if(selectedRoundRobin){
            selectedRoundRobinObj["type"]="RR Master";
            randomOrderedList.unshift(selectedRoundRobinObj);
        }
        if(selectedTimer){
            selectedTimerObj["type"]="Timer";
            randomOrderedList.push(selectedTimerObj);
        }
        setArrangedList([...randomOrderedList]);   
        setIsSpeakerOrderModalOpen(true);     
    })

    const launchAction = () => {
        setIsSpeakerOrderModalOpen(false);
        setIsLaunchPage(true);
    }

    return(
        <>
            {
                !isLaunchPage &&
                <Grid className="setupContainer">
                    {
                        isGuestModalOpen &&
                        <GuestAddingModal
                            isModalOpen= { isGuestModalOpen }
                            modalCloseAction = { () => { setIsGuestModalOpen(false) } }
                            guestDataCallback= { (list) => { newGuestEnterAction(list) } }
                        />
                    }
                    {
                        isSpeakerOrderModalOpen &&
                        <SpeakerOrdering
                            isModalOpen= { isSpeakerOrderModalOpen }
                            modalCloseAction = { () => { setIsSpeakerOrderModalOpen(false) } }
                            orderedList={ arrangedList }
                            reOrderCallback= { () => { orderGenerateAction() } }
                            topic={ todaysTopic }
                            topicChangeAction={ (topic) => {setTodaysTopic(topic)} }
                            launchCallback={ () => { launchAction(); } }
                        />
                    }
                    <Grid container display="flex" justifyContent="space-between">
                        <Grid item lg={3} md={3} sm={6} className="searchMainContainer">
                            <Box className="searchIcon"><SearchIcon height={30} /></Box>
                            <TextField 
                                className="searchInput"
                                fullWidth
                                value={ searchKey }
                                onChange={ (e) => { searchAction(e.target.value); } }
                                id="outlined-basic" 
                                label="Search TM" 
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item className="parentAutoComplete" lg={3} md={3} sm={6}>
                            <Box className="innerIcon"><AccessAlarmIcon height={30} /></Box>
                            <Autocomplete
                                className="autoFillInput"
                                id='searchSelection'
                                name='searchSelection'
                                value={selectedTimer}
                                onChange={(event,newValue)=>{
                                    if(!newValue){
                                        setSelectedTimer(null);
                                        setSelectedTimerObj(null);
                                    }else{
                                        setSelectedTimer(newValue.name);
                                        setSelectedTimerObj(newValue);
                                    }
                                }}
                                options={timerOptions}
                                getOptionLabel={(option)=>option["name"]?option["name"]:""}
                                getOptionDisabled={(option)=>option.isDisabled?true:false}
                                getOptionSelected={async (option,value)=>option && value && option.id===value.id }
                                margin={"none"}
                                placeholder={ "Timer" }
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="none"
                                        variant="outlined"
                                        placeholder={ "Timer" }
                                    />
                                )}
                                // loading={isClinicsLoading}
                            />
                        </Grid>
                        <Grid item className="parentAutoComplete" lg={3} md={3} sm={6}>
                            <Box className="innerIcon"><PersonIcon height={30} /></Box>
                            <Autocomplete
                                className="autoFillInput"
                                id='searchSelection'
                                name='searchSelection'
                                value={selectedRoundRobin}
                                onChange={(event,newValue)=>{
                                    if(!newValue){
                                        setSelectedRoundRobin(null);
                                        setSelectedRoundRobinObj(null);
                                    }else{
                                        setSelectedRoundRobin(newValue.name);
                                        setSelectedRoundRobinObj(newValue);
                                    }
                                }}
                                options={roundRobinOptions}
                                getOptionLabel={(option)=>option["name"]?option["name"]:""}
                                getOptionDisabled={(option)=>option.isDisabled?true:false}
                                getOptionSelected={async (option,value)=>option && value && option.id===value.id }
                                margin={"none"}
                                placeholder={ "Round Robin Master" }
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="none"
                                        variant="outlined"
                                        placeholder={ "Round Robin Master" }
                                    />
                                )}
                                // loading={isClinicsLoading}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={6} container>
                            <Grid item lg={6} md={6} sm={6} container justifyContent="flex-end">
                                <Button 
                                    // fullWidth 
                                    size="large"
                                    className="cancelBtn" 
                                    variant="contained" 
                                    endIcon={<PersonAddIcon/>} 
                                    onClick={ (e) => { setIsGuestModalOpen(true) } }
                                    >
                                    Add Guests
                                </Button>
                            </Grid>
                            <Grid item lg={5} md={5} sm={6} container>
                                <Button 
                                    // fullWidth 
                                    size="large"
                                    className="guessAddBtn" 
                                    variant="contained" 
                                    endIcon={<GamesIcon/>} 
                                    onClick={ (e) => { orderGenerateAction() } }
                                    >
                                    Generate
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="listView">
                        <ListSelection
                            speakerList={ filteredSpeakerList }
                            speakerSelectAction={ (index) => { speakerSelectAction(index) } }
                        />
                    </Grid>
                </Grid>
            }
            {
                isLaunchPage && (arrangedList.length > 0) &&
                <Launch
                    personList={ arrangedList }
                    topic={ todaysTopic }
                    backToSetupAction= { () => { setIsLaunchPage(false) } }
                />
            }
        </>
    );
}  