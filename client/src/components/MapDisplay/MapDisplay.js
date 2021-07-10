import { useState, useEffect } from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import pinSVG from "../../pin.svg";

import { getAllCountries } from "../../api";

const tiles = "http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png";
const attr = `Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`;

const pinPoint = new Icon({
    iconUrl: pinSVG,
    iconSize: [25, 25],
});

const MapDisplay = () => {
    const classes = useStyles();
    const [allCountries, setAllCountries] = useState([]);
    const [activeCountry, setActiveCountry] = useState(null);

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
                <MapContainer center={[45.4215, -75.6971]} zoom={4} className="leaflet-container">
                    <TileLayer url={tiles} attribution={attr}></TileLayer>
                    {allCountries.map((country) => (
                        <Marker
                            key={country.countryInfo._id || country.country.split(" ")[0]}
                            position={[country.countryInfo.lat, country.countryInfo.long]}
                            icon={pinPoint}
                        >
                            <Popup className={classes.popup}>
                                <Typography variant="h5" color="textPrimary">
                                    Cases: {country.cases}
                                </Typography>
                            </Popup>
                        </Marker>
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
}));

export default MapDisplay;
