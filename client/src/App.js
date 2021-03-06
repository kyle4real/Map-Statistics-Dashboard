import React, { useState } from "react";
import Header from "./components/Header/Header";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import MapDisplay from "./components/MapDisplay/MapDisplay";
import useRouter from "use-react-router";

import { Switch, Route } from "react-router-dom";

const App = () => {
    const [allCountries, setAllCountries] = useState([]);

    const { history } = useRouter();

    const search = (country) => {
        const urlEncodedCountry = encodeURI(country);
        history.push(`/displaydata?country=${urlEncodedCountry}`);
    };

    return (
        <div>
            <Header />
            <main>
                <Switch>
                    <Route exact path="/">
                        {/* <Hero /> */}
                        <MapDisplay
                            search={search}
                            allCountries={allCountries}
                            setAllCountries={setAllCountries}
                        />
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
