import { makeStyles, Container, Typography, Grid } from "@material-ui/core";

const DataDisplay = () => {
    const classes = useStyles();
    return (
        <div className={classes.hero}>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    Data Display
                </Typography>
                <Typography component="p" variant="h5" align="center" color="textSecondary">
                    Covid-19 data for Los Angelos
                </Typography>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    hero: {
        padding: theme.spacing(8, 0),
    },
}));

export default DataDisplay;
