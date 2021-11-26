import React, {useEffect, useState} from 'react';
import "./SetUp.scss";

import { Grid } from '@material-ui/core';

export default function ListSelection(props){
    return(
        <Grid className="listSelectionContainer" container>
            {
                props.speakerList.map((singleSpeaker, singleSpeakerIndex) => {
                    return(
                        <Grid item md={4} lg={4} sm={12} xs={12} className="outSingleUserBlock" container>
                            <Grid 
                                className={ "singleUserBlock " + (singleSpeaker.isSelected ? "selectedSingleUserBlock" : "") } 
                                container
                                onClick={ () => { props.speakerSelectAction(singleSpeakerIndex, singleSpeaker); } }
                                >
                                <Grid item md={3} lg={3} sm={3}>
                                    <img 
                                        className="singleListImage"
                                        height={50} 
                                        width={50} 
                                        src={ require(`../../assets/${singleSpeaker.imageLink}`).default }
                                    />
                                </Grid>
                                <Grid item md={9} lg={9} sm={9}>
                                    <h2>{ singleSpeaker.name }</h2>
                                </Grid>
                                {/* <Grid item md={2} lg={2} sm={3}>
                                    <h2>{ singleSpeakerIndex + 1 }</h2>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}  