import { useEffect, useState } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import Title from "../Title";

import { rankAllCountries } from "../../../ranking/ranking";
import { getAllCountries } from "../../../api";

import moment from "moment";

const DataHeader = ({ country, countryFlag, updated, rank }) => {
    const classes = useStyles();
    const [rankedCountries, setRankedCountries] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await getAllCountries();
            const { rankedObj } = rankAllCountries(data, `cases`);
            setRankedCountries(rankedObj);
        };
        getData();
    }, []);

    return (
        <Grid container className={classes.dataHeader}>
            <Grid item xs={12} md={4} className={classes.countryTag}>
                <div className={classes.flagImgContainer}>
                    <img src={countryFlag} alt={`${country} flag`} className={classes.flagImg} />
                </div>
                <Title>{country}</Title>
            </Grid>
            <Grid item xs={12} md={4} className={classes.lastUpdate}>
                <Typography variant="body2" color="textSecondary">
                    Last updated:&nbsp;
                    {moment(updated).format().slice(0, 10) === moment().format().slice(0, 10) ? (
                        <i>{moment(updated).calendar()}</i>
                    ) : (
                        <i>{moment(updated).format("MMMM Do YYYY, h:mm:ss a")}</i>
                    )}
                </Typography>
            </Grid>
            <Grid item xs={12} md={4} className={classes.ranked}>
                <Title>Ranked #{rankedCountries[country]}</Title>
                <Typography
                    variant="body2"
                    component="p"
                    color="textPrimary"
                    className={classes.footNote}
                >
                    <i>in cases</i>
                </Typography>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    dataHeader: {
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    flagImgContainer: {
        width: 60,
        marginRight: theme.spacing(2),
    },
    flagImg: {
        width: "100%",
        height: "auto",
        boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
    },
    countryTag: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            order: 1,
            maxWidth: "50%",
        },
    },
    lastUpdate: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
            order: 3,
            marginTop: theme.spacing(3),
        },
    },
    ranked: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        [theme.breakpoints.down("sm")]: {
            order: 2,
            maxWidth: "50%",
        },
    },
    footNote: {
        fontSize: "12px",
        position: "absolute",
        bottom: "-10px",
        right: 0,
    },
}));

export default DataHeader;
