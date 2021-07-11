import { useEffect } from "react";
import { makeStyles, Container, Typography, Button, Grid } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import pinSVG from "../../pin.svg";
import Rankings from "./Rankings/Rankings";

import { rankAllCountries } from "../../ranking/ranking";
import { getAllCountries } from "../../api";

const tiles = "http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png";
const attr = `Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`;

const pinPoint = new Icon({
    iconUrl: pinSVG,
    iconSize: [25, 25],
});

const MapDisplay = ({ search, allCountries, setAllCountries }) => {
    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            const data = await getAllCountries();
            const rankedData = rankAllCountries(data);
            setAllCountries(rankedData);
        };
        getData();
    }, [setAllCountries]);

    const handleOnDisplayData = (country) => {
        if (typeof search === "function") {
            search(country);
        }
    };

    return (
        <div className={classes.map}>
            <Container maxWidth="md">
                <Grid container spacing={4} className={classes.grid}>
                    <Grid item xs={12} md={4} className={classes.gridHeight}>
                        <Rankings allCountries={allCountries} />
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.gridHeight}>
                        <MapContainer center={[0, 0]} zoom={1.2} className="leaflet-container">
                            <TileLayer url={tiles} attribution={attr}></TileLayer>
                            {allCountries.map((country) => (
                                <Marker
                                    key={country.countryInfo._id || country.country.split(" ")[0]}
                                    position={[country.countryInfo.lat, country.countryInfo.long]}
                                    icon={pinPoint}
                                >
                                    <Popup>
                                        <div className={classes.popup}>
                                            <Typography
                                                variant="h6"
                                                component="h1"
                                                color="textPrimary"
                                                className={classes.cases}
                                            >
                                                {country.country}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                component="h2"
                                                color="textPrimary"
                                                className={classes.cases}
                                            >
                                                Cases: {country.cases}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                component="h2"
                                                color="textPrimary"
                                                className={classes.deaths.toLocaleString()}
                                            >
                                                Deaths: {country.deaths}
                                            </Typography>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                onClick={() => handleOnDisplayData(country.country)}
                                            >
                                                Display Data
                                            </Button>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    map: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(8),
    },
    grid: {
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
        },
    },
    gridHeight: {
        maxHeight: "50vh",
        overflow: "auto",
        [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(2),
        },
    },
    popup: {
        paddingBottom: theme.spacing(1),
    },
    cases: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    deaths: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default MapDisplay;
