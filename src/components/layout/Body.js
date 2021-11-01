import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SetUp from "../sessiionSetUp/SetUp";

export default function Body(props){
    return(
        <Grid className="body-container">
            <Router>
                <Switch>
                    <Route path="/" exact component={SetUp}/>
                </Switch>
            </Router>
        </Grid>
    );
}  