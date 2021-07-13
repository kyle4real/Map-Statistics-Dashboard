import React, { useState } from "react";
import Title from "../Title";

import { makeStyles } from "@material-ui/core";

const DataGraph = () => {
    const classes = useStyles();
    return (
        <>
            <Title>Data Graph</Title>
            <div className={classes.dataGraph}></div>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    dataGraph: {
        border: "1px solid black",
        height: "100%",
    },
}));

export default DataGraph;
