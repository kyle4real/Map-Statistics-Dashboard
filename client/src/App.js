import Header from "./components/Header/Header";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import Map from "./components/MapDisplay/MapDisplay";
import Hero from "./components/Hero/Hero";

import { Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route exact path="/">
                        <Hero />
                        <Map />
                    </Route>
                    <Route path="/displaydata">
                        <Hero displayData />
                        <DataDisplay />
                    </Route>
                </Switch>
            </main>
        </div>
    );
};

export default App;
