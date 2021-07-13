import { useEffect, useState } from "react";
import { makeStyles, Container, Typography, Button, Grid } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import pinSVG from "../../pin.svg";
import Rankings from "./Rankings/Rankings";
// import map from "leaflet";

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
    const [map, setMap] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await getAllCountries();
            const { sorted } = rankAllCountries(data, `cases`);
            setAllCountries(sorted);
        };
        getData();
    }, [setAllCountries]);

    const handleOnDisplayData = (country) => {
        if (typeof search === "function") {
            search(country);
        }
    };

    const handleMapFocus = (coords) => {
        map.flyTo(coords, 3);
    };

    return (
        <div className={classes.map}>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                className="leaflet-container"
                maxZoom={8}
                minZoom={2}
                whenCreated={setMap}
            >
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
                                    Cases:{" "}
                                    {country.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    component="h2"
                                    color="textPrimary"
                                    className={classes.deaths}
                                >
                                    Deaths:{" "}
                                    {country.deaths
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            <Container maxWidth="lg">
                <Grid container spacing={0} className={classes.grid}>
                    <Grid item xs={12} md={6} className={classes.rankingsFilters}></Grid>
                    <Grid item xs={12} md={6} className={classes.rankings}>
                        <Rankings
                            allCountries={allCountries}
                            handleOnDisplayData={handleOnDisplayData}
                            handleMapFocus={handleMapFocus}
                        />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    grid: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column-reverse",
        },
    },
    // rankings: {
    //     maxHeight: "30vh",
    // },
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
