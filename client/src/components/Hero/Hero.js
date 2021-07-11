import { makeStyles, Container, Typography } from "@material-ui/core";

const Hero = () => {
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
                    Covid-19 Statistics
                </Typography>
                <Typography component="p" variant="h5" align="center" color="textSecondary">
                    Choose a country. Click 'display data'.
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

export default Hero;
