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
    currentPage = 0;
    offset = 0;
    goToPage = null;

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/events?limit=${this.numberOfResults}&offset=${this.offset}&${this.startsWith !== ""? '&nameStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

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
        console.log(this.props.location.state);
        let result = null;
        if(this.props.location.state.data !== null)
        {
            const propsUrl = this.url + `&${this.props.location.state.from}=` + this.props.location.state.data;
            result = await fetchData(propsUrl);
        }
        else result = await fetchData(this.url);
        console.log(result);
        this.setState({eventsData: result.results, resultsnumber: result.total});
        this.displayEvents();
    }

    changeUrl = (e, where) => {
        e.preventDefault();

        const errorText = document.getElementsByClassName('results-nav__error');
        errorText[0].innerHTML = "";
        let totalPages = this.state.resultsnumber / this.numberOfResults;
        totalPages = Math.floor(totalPages);
        const whichPage = parseInt(document.getElementById('page').value);
        if(whichPage > totalPages) {
            errorText[0].innerHTML = `There are ${totalPages} pages`;
        } else {
            if(where === "value") this.currentPage = whichPage;
        } 

        this.currentPage = parseInt(this.currentPage);

        if(where === "next" && this.currentPage !== totalPages) this.currentPage += 1;
        else if(where === "prev" && this.currentPage !== 0) this.currentPage -= 1;

        this.orderBy = document.getElementById('order').value;
        this.startsWith = document.getElementById('letter').value;
        this.offset = this.currentPage * this.numberOfResults;
        this.numberOfResults = document.getElementById('options').value;

        let newUrl = `https://gateway.marvel.com:443/v1/public/events?limit=${this.numberOfResults}&offset=${this.offset}&${this.startsWith !== ""? '&nameStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
       
        if(this.props.location.state.data !== null)
        {
            newUrl = `https://gateway.marvel.com:443/v1/public/events?${this.props.location.state.from}=${this.props.location.state.data}&limit=${this.numberOfResults}&offset=${this.offset}${this.format !== ""? '&format='+this.format : ""}${this.format}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.digitalIssue !== ""? '&hasDigitalIssue='+this.digitalIssue : ""}${this.issueNumber !== ""? '&issueNumber='+this.issueNumber : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        }

        if(newUrl !== this.url)
        {
            this.setState({
                events: null
            });
            this.url = newUrl;
            this.fetch();
        } 
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
                <div className="results-nav">
                    <label for="page" className="results-nav__label">Choose page:</label>
                    <input type="page" id="page" name="page" className="results-nav__input"/>
                    <button className="results-nav__button results-nav__button--small" onClick={(e) => this.changeUrl(e,"value")}>Go</button>
                    <p className="results-nav__error"></p>
                    <button className="results-nav__button" onClick={(e) => this.changeUrl(e,"prev")}>Previous</button>
                    <button className="results-nav__button"  onClick={(e) => this.changeUrl(e,"next")}>Next</button>
                </div>
            </div>
        )
    }
}

export default EventsList;