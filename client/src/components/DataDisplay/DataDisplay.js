import { makeStyles, Container, Typography, Grid } from "@material-ui/core";

const DataDisplay = () => {
    const classes = useStyles();
    return <div className={classes.displayData}></div>;
};

const useStyles = makeStyles((theme) => ({
    displayData: {},
}));

export default DataDisplay;
