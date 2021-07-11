import { useState, useEffect } from "react";
import { makeStyles, Container, Grid, Paper, Button } from "@material-ui/core";
import DataGraph from "./DataGraph/DataGraph";
import DataTotals from "./DataTotals/DataTotals";
import DataHeader from "./DataHeader/DataHeader";

import { ArrowBack as ArrowBackIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useRouter from "use-react-router";
import * as api from "../../api/index";

const DataDisplay = () => {
    const [countryTotals, setCountryTotals] = useState({});
    const [countryHistory, setCountryHistory] = useState([]);

    const classes = useStyles();
    const { location } = useRouter();
    const params = new URLSearchParams(location.search);
    const searchCountry = params.get("country");

    useEffect(() => {
        const getTotals = async () => {
            try {
                const totals = await api.getOneCountry(searchCountry);
                setCountryTotals(totals);
            } catch (error) {
                console.log(error);
            }
        };
        getTotals();
    }, [searchCountry]);

    return (
        <div className={classes.displayData}>
            <Container maxWidth="md">
                <Link to="/" className={classes.backToMapLink}>
                    <Button>
                        <ArrowBackIcon className={classes.backIcon} />
                        &nbsp;Back to Map
                    </Button>
                </Link>
            </Container>
            <Container maxWidth="md" className={classes.displayDataContainer}>
                <Grid container spacing={3}>
                    {/* DATA HEADER */}
                    <Grid item xs={12}>
                        <Paper className={`${classes.paperHeaderHeight}`}>
                            {Object.keys(countryTotals).length !== 0 && (
                                <DataHeader
                                    country={searchCountry}
                                    countryFlag={countryTotals.countryInfo.flag}
                                    updated={countryTotals.updated}
                                />
                            )}
                        </Paper>
                    </Grid>
                    {/* DATA GRAPH */}
                    <Grid item xs={12} md={8}>
                        <Paper className={`${classes.paper} ${classes.paperFixedHeight}`}>
                            <DataGraph />
                        </Paper>
                    </Grid>
                    {/* DATA FIELDS */}
                    <Grid item xs={12} md={4}>
                        <Paper className={`${classes.paper} ${classes.paperFixedHeight}`}>
                            {Object.keys(countryTotals).length !== 0 && (
                                <DataTotals {...countryTotals} />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    displayData: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    displayDataContainer: {
        paddingTop: theme.spacing(4),
    },
    paperHeaderHeight: {
        height: "10vh",
    },
    paperFixedHeight: {
        height: "50vh",
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    backToMapLink: {
        textDecoration: "none",
    },
    backIcon: {
        width: 20,
    },
}));

export default DataDisplay;
