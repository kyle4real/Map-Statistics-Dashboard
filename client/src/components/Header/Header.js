import { makeStyles, AppBar, Toolbar, Typography, Container, Button } from "@material-ui/core";
import { LocationOn as LocationOnIcon } from "@material-ui/icons";

import { Link } from "react-router-dom";

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="relative">
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Link to="/" className={classes.link}>
                            <LocationOnIcon className={classes.icon} />
                            <Typography
                                variant="h6"
                                component="h1"
                                noWrap
                                className={classes.logoText}
                            >
                                Covid Stats
                            </Typography>
                        </Link>
                        <Link to="/about" className={classes.link}>
                            <Button
                                variant="body1"
                                component="p"
                                noWrap
                                className={classes.menuLink}
                            >
                                About
                            </Button>
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
        color: "rgba(255, 255, 255, 0.95)",
    },
    logoText: {
        color: "rgba(255, 255, 255, 0.95)",
        textTransform: "uppercase",
    },
    link: {
        textDecoration: "none",
        display: "inherit",
        alignItems: "inherit",
    },
    menuLink: {
        color: "rgba(255, 255, 255, 0.95)",
    },
    toolbar: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        justifyContent: "space-between",
    },
}));

export default Header;
