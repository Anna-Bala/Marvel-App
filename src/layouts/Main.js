import React from "react";
import { Route, Switch } from "react-router-dom";
import StartPage from "../pages/StartPage";
import ComicsList from "../pages/ComicsList";
import CharactersList from "../pages/CharactersList";
import CreatorsList from "../pages/CreatorsList";
import SeriesList from "../pages/SeriesList";
import EventsList from "../pages/EventsList";
import SingleComic from "../pages/subpages/SingleComic";
import SingleCharacter from "../pages/subpages/SingleCharacter";

const Main = () => {
    return (
        <div className='main'>
            <Switch>
                <Route path='/' component={StartPage} exact />
                <Route path='/comics' component={ComicsList} exact/>
                <Route path='/comics/:id' component={SingleComic} />
                <Route path='/characters' component={CharactersList} exact/>
                <Route path='/characters/:id' component={SingleCharacter} />
                <Route path='/creators' component={CreatorsList} />
                <Route path='/series' component={SeriesList} />
                <Route path='/events' component={EventsList} />

                {/* <Route component={ErrorPage} /> */}
            </Switch>
        </div>
    )
}

export default Main;