import { makeStyles, Container, Typography, Button } from "@material-ui/core";
import Title from "../Title";

const Hero = ({ country }) => {
    const classes = useStyles();
    return (
        <div className={classes.dataHeader}>
            <Title>Results for {country}</Title>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    dataHeader: {
        height: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
}));

export default Hero;
