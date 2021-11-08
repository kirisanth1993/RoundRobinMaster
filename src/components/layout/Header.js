import React from 'react';
import "./Layout.scss";

import { Grid, Typography, Hidden } from '@material-ui/core';
import logo from "../../assets/tmLogo.png"; 

export default function Header(props){
    return(
        <Grid className="headerContainer">
            <Grid container display="flex" className="logoAndName">
                <img className="logo-image" height={70} src={logo}/>
                <Hidden xsDown><Typography >CIPM TOASTMASTERS CLUB</Typography></Hidden>
            </Grid>
        </Grid>
        
    );
}  