import { makeStyles, Container, Typography, Grid, Paper } from "@material-ui/core";

const DataDisplay = () => {
    const classes = useStyles();
    return (
        <div className={classes.displayData}>
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    {/* GRAPH */}
                    <Grid item xs={12} md={8}>
                        <Paper></Paper>
                    </Grid>
                    {/* DATA FIELDS */}
                    <Grid item xs={12} md={4}></Grid>
                </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    displayData: {},
}));

export default DataDisplay;
