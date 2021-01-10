import React from "react";
import { Route, Switch } from "react-router-dom";
import StartPage from "../pages/StartPage";
import ComicsList from "../pages/ComicsList";
import CharactersList from "../pages/CharactersList";
import CreatorsList from "../pages/CreatorsList";
import SeriesList from "../pages/SeriesList";
import EventsList from "../pages/EventsList";

const Main = () => {
    return (
        <>
            <Switch>
                <Route path='/' component={StartPage} exact />
                <Route path='/comics' component={ComicsList} />
                <Route path='/characters' component={CharactersList} />
                <Route path='/creators' component={CreatorsList} />
                <Route path='/series' component={SeriesList} />
                <Route path='/events' component={EventsList} />

                {/* <Route component={ErrorPage} /> */}
            </Switch>
        </>
    )
}

export default Main;