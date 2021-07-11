import { makeStyles, Container, Typography, Button } from "@material-ui/core";
import Title from "../Title";

import moment from "moment";

const DataHeader = ({ country, countryFlag, updated }) => {
    const classes = useStyles();
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
                    Last updated: {moment(updated).format("MMMM Do YYYY, h:mm:ss a")}
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
        width: 50,
        marginRight: theme.spacing(2),
    },
    flagImg: {
        width: "100%",
        height: "auto",
    },
}));

export default DataHeader;
