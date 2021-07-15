import React, { useState, useEffect } from "react";
import Title from "../Title";
import { getHistory } from "../../../api/index";
import { Line, Bar } from "react-chartjs-2";

import { makeStyles, Typography, MenuItem, FormControl, Slider } from "@material-ui/core";

import parseTheData from "../../../ranking/parseTheData";
import { convertToRange, unconvertRange } from "../../../ranking/convertToRange";

const DataGraph = ({ country }) => {
    const classes = useStyles();
    const [range, setRange] = useState(null);
    const [graphData, setGraphData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const { timeline: dataObj } = await getHistory(country, "all");
            setGraphData(dataObj);
            const len = Object.keys(dataObj.cases).length;
            setRange(convertToRange(len, 1, len));
        };
        getData();
    }, [country]);

    const handleSlider = (e, n) => {
        console.log(n);
        setRange(n);
    };

    // console.log(range);
    // console.log(unconvertRange(Object.keys(graphData.cases).length, 1, range));

    return (
        <>
            <div className={classes.graphHeader}>
                <Title>Data Graph</Title>
                <Typography
                    variant="body2"
                    component="div"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <FormControl className={classes.formControl}>
                        <Slider value={range ? range : 100} onChange={handleSlider} />
                    </FormControl>
                </Typography>
            </div>
            <div className={classes.graphContainer}>
                <Line
                    width={100}
                    height={100}
                    data={{
                        labels:
                            Object.keys(graphData).length !== 0 &&
                            Object.keys(graphData.cases)
                                .slice(1)
                                .slice(
                                    parseInt(
                                        `-${unconvertRange(
                                            Object.keys(graphData.cases).length,
                                            1,
                                            range
                                        )}`
                                    )
                                ),
                        datasets: [
                            {
                                label: "new cases",
                                data:
                                    Object.keys(graphData).length !== 0 &&
                                    parseTheData(graphData.cases).slice(
                                        parseInt(
                                            `-${unconvertRange(
                                                Object.keys(graphData.cases).length,
                                                1,
                                                range
                                            )}`
                                        )
                                    ),
                                borderColor: "black",
                                fill: false,
                                tension: 0.2,
                            },
                            {
                                label: "deaths",
                                data:
                                    Object.keys(graphData).length !== 0 &&
                                    parseTheData(graphData.deaths).slice(
                                        parseInt(
                                            `-${unconvertRange(
                                                Object.keys(graphData.cases).length,
                                                1,
                                                range
                                            )}`
                                        )
                                    ),
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
