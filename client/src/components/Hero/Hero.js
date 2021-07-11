import { makeStyles, Container, Typography, Button } from "@material-ui/core";
import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

// TEMP
const country = "United States";

const Hero = ({ displayData }) => {
    const classes = useStyles();
    return (
        <div className={classes.hero}>
            <Container maxWidth="md">
                {displayData && (
                    <Link to="/" className={classes.backToMapLink}>
                        <Button>
                            <ArrowBackIcon className={classes.backIcon} />
                            &nbsp;Back to Map
                        </Button>
                    </Link>
                )}
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    Covid-19 Statistics
                </Typography>
                {!displayData && (
                    <Typography component="p" variant="h5" align="center" color="textSecondary">
                        Choose a country. Click 'display data'.
                    </Typography>
                )}
                {displayData && (
                    <Typography component="p" variant="h5" align="center" color="textSecondary">
                        Displaying data for {country}
                    </Typography>
                )}
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    hero: {
        padding: theme.spacing(8, 0),
    },
    backToMapLink: {
        textDecoration: "none",
    },
    backIcon: {
        width: 20,
    },
}));

export default Hero;
