import { useEffect, useState, useRef } from "react";
import { makeStyles, Container, Typography, Button, Grid, Paper } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import pinSVG from "../../pin.svg";
import Rankings from "./Rankings/Rankings";

import { rankAllCountries } from "../../ranking/ranking";
import { getAllCountries } from "../../api";

// const tiles = "http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png";
// const tiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const tiles = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
const tiles = "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=TdXXIQxlwnlyGAu8uAfW";
// const tiles = "https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=TdXXIQxlwnlyGAu8uAfW";
const attr = `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`;

const pinPoint = new Icon({
    iconUrl: pinSVG,
    iconSize: [20, 20],
    popupAnchor: [1, -8],
});

const MapDisplay = ({ search, allCountries, setAllCountries }) => {
    const classes = useStyles();
    const [map, setMap] = useState(null);
    // const mapRef = useRef(null);

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

    useEffect(() => {
        if (!map) return;
        map.setMaxBounds([
            [-90, -388],
            [90, 388],
        ]);
        console.log(map.getBounds());
    }, [map]);

    const handleMapFocus = (coords) => {
        if (!map) return;
        map.flyTo(coords, 3);
        console.log(map.getMarker(coords));
    };

    return (
        <div className={classes.map}>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                className="leaflet-container"
                maxZoom={8}
                minZoom={2}
                whenCreated={(mapInstance) => setMap(mapInstance)}
                easeLinearity={0.5}
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
                                <div className={classes.popupHead}>
                                    <div className={classes.flagImgContainer}>
                                        <img
                                            src={country.countryInfo.flag}
                                            alt={`${country.country} flag`}
                                            className={classes.flagImg}
                                        />
                                    </div>
                                    <Typography
                                        variant="h6"
                                        component="h1"
                                        color="textPrimary"
                                        className={classes.countryTag}
                                    >
                                        {country.country}
                                    </Typography>
                                </div>
                                <div className={classes.popupBody}>
                                    <Grid item className={classes.cases} component={Paper}>
                                        <Typography
                                            variant="body1"
                                            component="h4"
                                            color="textPrimary"
                                            className={classes.bodyTag}
                                        >
                                            Total Cases&nbsp;
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="h4"
                                            color="textPrimary"
                                        >
                                            {country.cases
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Typography>
                                    </Grid>
                                    <Grid item className={classes.deaths} component={Paper}>
                                        <Typography
                                            variant="body1"
                                            component="h4"
                                            color="textPrimary"
                                            className={classes.bodyTag}
                                        >
                                            Deaths&nbsp;
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            component="h4"
                                            color="textPrimary"
                                        >
                                            {country.deaths
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Typography>
                                    </Grid>
                                </div>
                                <div className={classes.popupCTA}>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleOnDisplayData(country.country)}
                                    >
                                        Display Data
                                    </Button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <Container maxWidth="lg" className={classes.container}>
                <Rankings
                    allCountries={allCountries}
                    handleOnDisplayData={handleOnDisplayData}
                    handleMapFocus={handleMapFocus}
                />
            </Container>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    popupHead: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing(1),
    },
    flagImgContainer: {
        width: 40,
        marginRight: theme.spacing(1),
        display: "inherit",
        alignItems: "inherit",
    },
    flagImg: {
        width: "100%",
        height: "auto",
        boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
    },
    popupBody: {
        marginBottom: theme.spacing(1.5),
    },
    cases: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        padding: theme.spacing(0.4, 0.75),
        // boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
    },
    deaths: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
        padding: theme.spacing(0.4, 0.75),
        // boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5,
    },
    bodyTag: {
        marginRight: theme.spacing(2),
    },
    popupCTA: {
        display: "flex",
        justifyContent: "center",
    },
}));

export default MapDisplay;
