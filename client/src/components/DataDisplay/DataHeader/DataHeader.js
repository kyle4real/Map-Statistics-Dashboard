import { makeStyles, Container, Typography, Button, Box } from "@material-ui/core";
import Title from "../Title";

import moment from "moment";

const DataHeader = ({ country, countryFlag, updated }) => {
    const classes = useStyles();
    console.log(moment(updated).format().slice(0, 10));
    console.log(moment().format().slice(0, 10));
    console.log(moment(updated).format().slice(0, 10) === moment().format().slice(0, 10));
    return (
        <div className={classes.dataHeader}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div className={classes.flagImgContainer}>
                    <img src={countryFlag} alt={`${country} flag`} className={classes.flagImg} />
                </div>
                <Title>{country}</Title>
            </div>
            <div>
                <Typography variant="body2" color="textSecondary">
                    Last updated:&nbsp;
                    {moment(updated).format().slice(0, 10) === moment().format().slice(0, 10) ? (
                        <i>{moment(updated).calendar()}</i>
                    ) : (
                        moment(updated).format("MMMM Do YYYY, h:mm:ss a")
                    )}
                </Typography>
            </div>
        </div>
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
        padding: theme.spacing(2),
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
}));

export default DataHeader;
