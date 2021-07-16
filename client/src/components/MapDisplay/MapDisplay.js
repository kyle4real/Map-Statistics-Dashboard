import { useEffect, useState, useRef } from "react";
import { makeStyles, Container, Typography, Button } from "@material-ui/core";
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
    iconSize: [25, 25],
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
    };

    return (
        <div className={classes.map}>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                className="leaflet-container"
                maxZoom={6}
                minZoom={2}
                whenCreated={(mapInstance) => setMap(mapInstance)}
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
