import React, {Component} from "react";
import fetchData from "../functions/fetchData";
import Event from "../components/Event";
import Form from "../components/Form";
import icon from "../img/settings-icon.png";

class EventsList extends Component {
    state = {
        resultsnumber: 0,
        eventsData: [],
        events: null,
    };

    orderBy = "name";
    numberOfResults = 10;
    startsWith = "";

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/events?limit=10&offset=1&ts=1&orderBy=${this.orderBy}&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

    componentDidMount() {
        this.fetch();

          const icon = document.getElementsByClassName('form__icon');
          const text = document.getElementsByClassName('form__search');
          const formPanel = document.getElementsByClassName('form__main');
          const closeIcon = document.getElementsByClassName('form__close');
          icon[0].addEventListener("click", () => {
                formPanel[0].classList.toggle('form__main--open');
                icon[0].classList.toggle('form__icon--closed');
                text[0].classList.toggle('form__search--closed');
          });
            closeIcon[0].addEventListener("click", () => {
            formPanel[0].classList.toggle('form__main--open');
            icon[0].classList.toggle('form__icon--closed');
            text[0].classList.toggle('form__search--closed');
          });
    }

    displayEvents = () => {
        const results = this.state.eventsData;
        const events = results.map(event => {
        const index = event.thumbnail.path.indexOf('image_not_available');
        return <Event id={event.id} title={event.title} description={event.description} img={index === (-1)? event.thumbnail.path : false} extension={event.thumbnail.extension} data={event}/>
        });
        this.setState({
            events,
        })
    }

    fetch = async () => {
        const result = await fetchData(this.url);
        console.log(result.results);
        this.setState({eventsData: result.results, resultsnumber: result.total});
        this.displayEvents();
    }

    changeUrl = (e) => {
        e.preventDefault();
        this.setState({
            events: null
        });

        this.orderBy = document.getElementById('order').value;
        this.startsWith = document.getElementById('letter').value;

        this.url = `https://gateway.marvel.com:443/v1/public/events?limit=10&offset=0&${this.startsWith !== ""? '&nameStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        console.log(this.url);
        this.fetch();
    }

    render() {
        return(
            <div className="events-list">
                <h1 className="events-list__title">List of events</h1>
                <form className="events-list__form form">
                    <h2 className="form__search">Search options:</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form type="events"/>
                        <button className="form__button" onClick={(e) =>this.changeUrl(e)}>Save</button>
                    </div>
                </form>
                <div className="events-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.events}
                </div>
            </div>
        )
    }
}

export default EventsList;