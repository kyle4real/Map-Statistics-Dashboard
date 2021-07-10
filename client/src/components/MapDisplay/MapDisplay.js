import { makeStyles, Container } from "@material-ui/core";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay = () => {
    const classes = useStyles();
    return (
        <div className={classes.map}>
            <Container maxWidth="md">
                <MapContainer center={[0, 0]} zoom={4} className={classes.leafletContainer}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    ></TileLayer>
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
