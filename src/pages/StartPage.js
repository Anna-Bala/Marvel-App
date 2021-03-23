import React, {Component} from "react";

class StartPage extends Component {
    render() {
        return(
            <div className="start-page">
                <h1 className="start-page__title">Welcome to <p className="start-page__title--mark">Discover Marvel</p> App!</h1>
                <p className="start-page__description">Here you can browse through information about rich universe of Marvel</p>
                <p className="start-page__description">Every information and ilustration on this website belongs to <a href="https://www.marvel.com/" className="start-page__link">Marvel</a></p>
            </div>
        )
    }
}

export default StartPage;