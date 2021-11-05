
import React, { useEffect, useState } from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import { Grid, Typography, Button, TextField, Box } from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';
import "./Launch.scss";
import SettingsIcon from '@material-ui/icons/Settings';

const Launch = (props) => {
    const{ personList, topic, backToSetupAction } = props;
    const[speakerList, setSpeakerList] = useState(cloneDeep(personList));
    const[currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
    const[isImgSlider, setIsImgSlider] = useState(false);

    useEffect(() => {
        setSpeakerList(personList.map((singleSpeaker) => {
            return {
                ...singleSpeaker,
                url: require("../../assets/" + singleSpeaker.imageLink).default
            }
        }));
        setTimeout(() => {
            setIsImgSlider(true);
        },500);
    },[personList]);

    return (
        <Grid className="launchContainer">
            <Grid container>
                <Grid container display="flex" justifyContent="center" lg={10} md={10} sm={10}>
                    <h2 className="heading">Topic - {topic}</h2>
                </Grid>
                <Grid item lg={2} md={2} sm={6} display="flex" container justifyContent="flex-end" className="btnWrap">
                    <Button 
                        // fullWidth 
                        size="large"
                        className="setupBtn" 
                        variant="contained" 
                        endIcon={<SettingsIcon/>} 
                        onClick={ () => { backToSetupAction() } }
                        >
                        Back to Setup
                    </Button>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={8} lg={8} sm={8}>
                    {
                        isImgSlider &&
                        <SimpleImageSlider
                            width={600}
                            height={490}
                            images={speakerList}
                            showBullets={true}
                            showNavs={true}
                            navSize={ 80 }
                            loop={ false }
                            startIndex={0}
                            onStartSlide={ (index) => { setCurrentSpeakerIndex(index - 1) } }
                        />
                    }
                    <Grid container display="flex" justifyContent="center" className="currentSpeakerHeading">
                        {
                            speakerList[currentSpeakerIndex] &&
                            <h2 className="speakerName">
                                {speakerList[currentSpeakerIndex].name + (speakerList[currentSpeakerIndex].type ? (" - " + speakerList[currentSpeakerIndex].type) : "")}
                            </h2>
                        }
                    </Grid>
                </Grid>
                <Grid item md={4} lg={4} sm={4}>
                    {
                        speakerList.slice(currentSpeakerIndex, speakerList.length).map((singleSpeaker, singleSpeakerIndex) => (
                            <Grid container className={ (singleSpeakerIndex === 0) ? "currentName" : ""}>
                                <Grid md={2} lg={2} sm={2}>
                                    <h3>{ currentSpeakerIndex + 1 + singleSpeakerIndex }</h3>
                                </Grid>
                                <Grid md={10} lg={10} sm={10}>
                                    <h3>{ singleSpeaker.name + (singleSpeaker.type ? (" - " + singleSpeaker.type) : "") }</h3>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Launch;