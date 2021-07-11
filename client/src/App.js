import Header from "./components/Header/Header";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import Map from "./components/MapDisplay/MapDisplay";
import Hero from "./components/Hero/Hero";

import { Switch, Route, Link } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Header />
            <main>
                <Hero />
                <Switch>
                    <Route exact path="/">
                        <Map />
                    </Route>
                    <Route path="/displaydata">
                        <DataDisplay />
                    </Route>
                </Switch>
            </main>
        </div>
    );
};

export default App;
