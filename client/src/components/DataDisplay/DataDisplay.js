import { makeStyles, Container, Typography, Grid, Paper } from "@material-ui/core";
import DataGraph from "./DataGraph/DataGraph";
import DataTotals from "./DataTotals/DataTotals";
import useRouter from "use-react-router";

const DataDisplay = () => {
    const classes = useStyles();
    const { location } = useRouter();
    const params = new URLSearchParams(location.search);
    const searchCountry = params.get("country");

    return (
        <div className={classes.displayData}>
            <Container maxWidth="md">
                <Grid container spacing={3}>
                    {/* GRAPH */}
                    <Grid item xs={12} md={8}>
                        <Paper className={`${classes.paper} ${classes.paperFixedHeight}`}>
                            <DataGraph />
                        </Paper>
                    </Grid>
                    {/* DATA FIELDS */}
                    <Grid item xs={12} md={4}>
                        <Paper className={`${classes.paper} ${classes.paperFixedHeight}`}>
                            <DataTotals />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    displayData: {},
    paperFixedHeight: {
        height: "50vh",
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
}));

export default DataDisplay;
