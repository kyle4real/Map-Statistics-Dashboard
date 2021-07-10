import { useState, useEffect } from "react";
import { makeStyles, Container } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

import { getAllCountries } from "../../api";

const MapDisplay = () => {
    const classes = useStyles();
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await getAllCountries();
            setAllCountries(data);
        };
        getData();
    }, []);

    return (
        <div className={classes.map}>
            <Container maxWidth="md">
                <MapContainer
                    center={[45.4215, -75.6971]}
                    zoom={4}
                    className={classes.leafletContainer}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    ></TileLayer>
                    {allCountries.map((country) => (
                        <Marker
                            key={country.countryInfo._id || country.country.split(" ")[0]}
                            position={[country.countryInfo.lat, country.countryInfo.long]}
                        />
                    ))}
                </MapContainer>
            </Container>
            ;
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    map: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    leafletContainer: {
        width: "100%",
        height: "50vh",
    },
}));

export default MapDisplay;
