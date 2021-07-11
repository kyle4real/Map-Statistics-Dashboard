import Header from "./components/Header/Header";
import DataDisplay from "./components/DataDisplay/DataDisplay";
import MapDisplay from "./components/MapDisplay/MapDisplay";
import Hero from "./components/Hero/Hero";
import useRouter from "use-react-router";

import { Switch, Route } from "react-router-dom";

const App = () => {
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
                        <Hero />
                        <MapDisplay search={search} />
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
