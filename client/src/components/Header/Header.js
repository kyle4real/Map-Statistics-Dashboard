import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import { LocationOn as LocationOnIcon } from "@material-ui/icons";

const Header = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <LocationOnIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Statistics Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export default Header;
