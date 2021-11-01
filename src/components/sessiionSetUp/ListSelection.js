import React, {useEffect, useState} from 'react';
import "./SetUp.scss";

import { Grid, Typography, Button } from '@material-ui/core';
import { nameList } from './nameList';
export default function ListSelection(props){
    const [speakerList, setSpeakerList] = useState(nameList);

    useEffect(() => {
        props.newlyArrivedGuests.map((singleGuest) => {
            speakerList.push({
                name: "Guest " + singleGuest.name,
                imageLink: "commonAvatar.png",
                isSelected: true
            });
        });
        setSpeakerList([...speakerList]);
    },[props.newlyArrivedGuests]);

    const speakerSelectAction = (index) => {
        speakerList[index].isSelected = !speakerList[index].isSelected;
        setSpeakerList([...speakerList]);
    }

    return(
        <Grid className="listSelectionContainer" container>
            {
                speakerList.map((singleSpeaker, singleSpeakerIndex) => {
                    console.log("singleSpeaker", singleSpeaker.isSelected);
                    return(
                        <Grid item md={4} lg={4} sm={12} className="outSingleUserBlock">
                            <Grid 
                                className={ "singleUserBlock " + (singleSpeaker.isSelected ? "selectedSingleUserBlock" : "") } 
                                container
                                onClick={ () => { speakerSelectAction(singleSpeakerIndex); } }
                                >
                                <Grid item md={3} lg={3} sm={3}>
                                    <img 
                                        height={50} 
                                        width={50} 
                                        src={ require(`../../assets/${singleSpeaker.imageLink}`).default }
                                    />
                                </Grid>
                                <Grid item md={7} lg={7} sm={3}>
                                    <h2>{ singleSpeaker.name }</h2>
                                </Grid>
                                <Grid item md={2} lg={2} sm={3}>
                                    <h2>{ singleSpeakerIndex + 1 }</h2>
                                </Grid>
                            </Grid>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}  