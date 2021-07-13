import React, { useEffect } from "react";
import Title from "../Title";
import { getHistory } from "../../../api/index";
import { Line } from "react-chartjs-2";

import { makeStyles } from "@material-ui/core";

const DataGraph = ({ country }) => {
    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            const data = await getHistory(country);
        };
        getData();
    }, []);

    return (
        <>
            <Title>Data Graph</Title>
            <div className={classes.graphContainer}>
                <Line
                    width={100}
                    height={100}
                    data={{
                        labels: ["Jan", "Feb", "March", "April"],
                        datasets: [
                            {
                                label: "# of votes",
                                data: [12, 19, 3, 5, 2, 3],
                                borderColor: "red",
                                fill: true,
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
    graphContainer: {
        height: "100%",
    },
    // lineGraph: {
    //     width: "100%",
    //     height: "100%",
    // },
}));

export default DataGraph;
