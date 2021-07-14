import React, { useState, useEffect } from "react";
import Title from "../Title";
import { getHistory } from "../../../api/index";
import { Line, Bar } from "react-chartjs-2";

import { makeStyles, Typography, Select, MenuItem, FormControl } from "@material-ui/core";

import parseTheData from "../../../ranking/testing";

const DataGraph = ({ country }) => {
    const classes = useStyles();
    const [daysAmount, setDaysAmount] = useState(10);
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const { timeline: dataObj } = await getHistory(country, daysAmount);
            setGraphData(dataObj);
        };
        getData();
    }, [country, daysAmount]);

    return (
        <>
            <div className={classes.graphHeader}>
                <Title>Data Graph</Title>
                <Typography
                    variant="body2"
                    component="div"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    Last&nbsp;
                    <FormControl className={classes.formControl}>
                        <Select
                            value={daysAmount}
                            onChange={(e) => {
                                setDaysAmount(e.target.value);
                            }}
                            style={{ textAlign: "center" }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={365}>365</MenuItem>
                        </Select>
                    </FormControl>
                    &nbsp;days
                </Typography>
            </div>
            <div className={classes.graphContainer}>
                <Line
                    width={100}
                    height={100}
                    data={{
                        labels:
                            Object.keys(graphData).length !== 0 &&
                            Object.keys(graphData.cases).slice(1),
                        datasets: [
                            {
                                label: "new cases",
                                data:
                                    Object.keys(graphData).length !== 0 &&
                                    parseTheData(graphData.cases),
                                borderColor: "black",
                                fill: false,
                                tension: 0.2,
                            },
                            {
                                label: "deaths",
                                data:
                                    Object.keys(graphData).length !== 0 &&
                                    parseTheData(graphData.deaths),
                                borderColor: "red",
                                fill: false,
                                tension: 0.2,
                            },
                        ],
                    }}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    graphHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    graphContainer: {
        height: "100%",
    },
    formControl: {
        minWidth: 80,
    },
    // lineGraph: {
    //     width: "100%",
    //     height: "100%",
    // },
}));

export default DataGraph;
