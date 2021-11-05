import React from 'react';
import "./Layout.scss";

import { Grid, Typography } from '@material-ui/core';
import logo from "../../assets/tmLogo.png"; 

export default function Header(props){
    return(
        <Grid>
            <Grid container display="flex" className="logoAndName">
                <img className="logo-image" height={80} src={logo}/>
                <Typography >CIPM TOASTMASTERS CLUB</Typography>
            </Grid>
        </Grid>
        
    );
}  