import React from "react";
import Title from "../Title";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const createData = (id, key, value) => {
    return { id, key, value };
};

const DataTotals = ({
    country,
    cases,
    deaths,
    recovered,
    active,
    casesPerOneMillion,
    deathsPerOneMillion,
}) => {
    const classes = useStyles();

    const rows = [
        createData(0, "Cases", cases),
        createData(1, "Deaths", deaths),
        createData(2, "Recovered", recovered),
        createData(3, "Active Cases", active),
        createData(4, "Cases Per One Million", casesPerOneMillion),
        createData(5, "Deaths Per One Million", deathsPerOneMillion),
    ];

    return (
        <div className={classes.dataTotals}>
            <div>
                <Title>{country} Totals</Title>
            </div>
            <Grid container className={classes.gridContainer}>
                {rows.map((row) => (
                    <Grid item className={classes.gridItem}>
                        <Typography variant="body2">{row.key}</Typography>
                        <Typography variant="body2">
                            {row.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

// row.key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const useStyles = makeStyles((theme) => ({
    dataTotals: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    gridContainer: {
        height: "90%",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    gridItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // flex: 1,
        boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.2)",
        padding: theme.spacing(2, 2),
        borderRadius: 5,
    },
}));

export default DataTotals;
