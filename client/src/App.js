import Header from "./components/Header/Header";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import Map from "./components/MapDisplay/MapDisplay";

const App = () => {
    return (
        <div>
            <Header />
            <main>
                <DataDisplay />
                <Map />
            </main>
        </div>
    );
};

export default App;
