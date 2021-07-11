import { makeStyles, Container, Typography, Button } from "@material-ui/core";
import Title from "../Title";

const lastUpdate = "July 11, 2021, 16:55 GMT";

const DataHeader = ({ country, countryFlag }) => {
    const classes = useStyles();
    console.log(new Date(1626013892968));
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
                    Last updated: {lastUpdate}
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
