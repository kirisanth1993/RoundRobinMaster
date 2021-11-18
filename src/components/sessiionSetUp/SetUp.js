import React, {useEffect, useState} from 'react';
import "./SetUp.scss";

import { Grid, Button, TextField, Box } from '@material-ui/core';
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
import Hidden from '@material-ui/core/Hidden';

export default function SetUp(props){
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [newGuestList, setNewGuestList] = useState([]);
    const [timerOptions, setTimerOptions] = useState([]);
    const [roundRobinOptions, setRoundRobinOptions] = useState([]);
    const [selectedTimerObj, setSelectedTimerObj] = useState({});
    const [selectedRoundRobinObj, setSelectedRoundRobinObj] = useState({});
    const [searchKey, setSearchKey] = useState("");
    const [isSpeakerOrderModalOpen, setIsSpeakerOrderModalOpen] = useState(false);
    const [todaysTopic, setTodaysTopic] = useState("");
    const [arrangedList, setArrangedList] = useState([]);
    const [isLaunchPage, setIsLaunchPage] = useState(false);
    
    const [speakerList, setSpeakerList] = useState(cloneDeep(nameList));
    const [filteredSpeakerList, setFilteredSpeakerList] = useState(cloneDeep(nameList));

    useEffect(() => {
        newGuestList.map((singleGuest, singleGuestIndex) => {
            speakerList.push({
                id: speakerList.length + 1,
                name: "Guest " + singleGuest.name,
                imageLink: "guest.png",
                isSelected: true
            });
            filteredSpeakerList.push({
                id: speakerList.length + 1,
                name: "Guest " + singleGuest.name,
                imageLink: "guest1.png",
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
                singlePerson.id !== selectedTimerObj.id && singlePerson.id !== selectedRoundRobinObj.id
            );
        })]);
    });

    useEffect(() => {
        let timerList = nameList.filter((singlePerson) => {
            return(singlePerson.id !== selectedRoundRobinObj.id);
        });
        setTimerOptions([...timerList]);
        searchAction(searchKey);
    },[selectedRoundRobinObj]);

    useEffect(() => {
        let roundRobinMasterList = nameList.filter((singlePerson) => {
            return((singlePerson.id !== selectedTimerObj.id));
        });
        setRoundRobinOptions([...roundRobinMasterList]);
        searchAction(searchKey);
    },[selectedTimerObj]);

    const newGuestEnterAction = (list) => {
        setNewGuestList([...list]);
    }

    const speakerSelectAction = (index, clickedSpeaker) => {
        speakerList.map((singleSpeaker) => {
            if(singleSpeaker.id === clickedSpeaker.id){
                singleSpeaker.isSelected = !singleSpeaker.isSelected;
            }
        });

        setSpeakerList([...speakerList]);
        // setFilteredSpeakerList([...filteredSpeakerList]);
    }

    const orderGenerateAction = (() => {
        let pureSpeakerList = speakerList.filter((singlePerson) => {
            return(singlePerson.isSelected && (singlePerson.id !== selectedTimerObj.id) && (singlePerson.id !== selectedRoundRobinObj.id));
        });
        let randomOrderedList = pureSpeakerList.sort(() => Math.random() - 0.5);
        if(selectedRoundRobinObj.id){
            selectedRoundRobinObj["type"]="RR Master";
            randomOrderedList.unshift(selectedRoundRobinObj);
        }
        if(selectedTimerObj.id){
            selectedTimerObj["type"]="Timer";
            randomOrderedList.push(selectedTimerObj);
        }
        setArrangedList([...randomOrderedList]);   
        setIsSpeakerOrderModalOpen(randomOrderedList.length > 0);     
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
                        <Grid item lg={3} md={3} sm={6} xs={12} className="searchMainContainer">
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
                        <Grid item className="parentAutoComplete" lg={3} md={3} sm={6} xs={12}>
                            <Box className="innerIcon"><PersonIcon height={30} /></Box>
                            <Autocomplete
                                className="autoFillInput"
                                id='searchSelection'
                                name='searchSelection'
                                value={selectedRoundRobinObj}
                                onChange={(event,newValue)=>{
                                    if(!newValue){
                                        setSelectedRoundRobinObj({});
                                    }else{
                                        setSelectedRoundRobinObj({...newValue});
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
                        <Grid item className="parentAutoComplete" lg={3} md={3} sm={6} xs={12}>
                            <Box className="innerIcon"><AccessAlarmIcon height={30} /></Box>
                            <Autocomplete
                                className="autoFillInput"
                                id='searchSelection'
                                name='searchSelection'
                                value={selectedTimerObj}
                                onChange={(event,newValue)=>{
                                    if(!newValue){
                                        setSelectedTimerObj({});
                                    }else{
                                        setSelectedTimerObj({...newValue});
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
                        <Grid item lg={3} md={3} sm={6} xs={12} className="addAndGenerateBtn" container justifyContent="space-around">
                            <Grid item lg={5} md={5} sm={5} xs={5} container justifyContent="center">
                                <Button 
                                    fullWidth 
                                    size="large"
                                    className="cancelBtn" 
                                    variant="contained" 
                                    endIcon={<PersonAddIcon/>} 
                                    onClick={ (e) => { setIsGuestModalOpen(true) } }
                                    >
                                    <Hidden xsDown>Guests</Hidden>
                                </Button>
                            </Grid>
                            <Grid item lg={5} md={5} sm={5} xs={5} container justifyContent="center">
                                <Button 
                                    fullWidth 
                                    size="large"
                                    className="guessAddBtn" 
                                    variant="contained" 
                                    endIcon={<GamesIcon/>} 
                                    onClick={ (e) => { orderGenerateAction() } }
                                    >
                                    <Hidden xsDown>Generate</Hidden>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="listView">
                        <ListSelection
                            speakerList={ filteredSpeakerList }
                            speakerSelectAction={ (index, clickedSpeaker) => { speakerSelectAction(index, clickedSpeaker) } }
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