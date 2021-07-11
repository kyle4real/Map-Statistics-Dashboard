import Header from "./components/Header/Header";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import Map from "./components/MapDisplay/MapDisplay";
import Hero from "./components/Hero/Hero";

const App = () => {
    return (
        <div>
            <Header />
            <main>
                <Hero />
                <DataDisplay />
                {/* <Map /> */}
            </main>
        </div>
    );
};

export default App;
