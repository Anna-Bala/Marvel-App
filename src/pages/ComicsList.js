import React, {Component} from "react";
import Comic from "../components/Comic";
import Form from "../components/Form";
import icon from "../img/settings-icon.png";

class ComicsList extends Component {
    
    state = {
        resultsnumber: 0,
        results: [],
        comics: null,
    };

    //URL parameters:

    orderBy = "title";
    numberOfResults = 10;
    startsWith = "";
    format = "";
    releaseYear = "";
    digitalIssue = "";
    issueNumber = "";
    title = "";
    characters = "";
    creators = "";




    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/comics?limit=10&offset=0&ts=1&orderBy=${this.orderBy}&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
    fetchError = false;
    apiData = null;

    componentDidMount() {
        fetch(this.url)
        .then(response => {
            if(response.ok) return response.json();
            else this.fetchError = true;
          })
          .then(result => {this.apiData = result.data; this.manageData()})
          .catch(error => this.fetchError = error);

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

    changeUrl = (e) => {
        e.preventDefault();
        this.setState({
            comics: null
        });

        console.log(document.getElementById('order').value);
        this.orderBy = document.getElementById('order').value;
        this.format = document.getElementById('format').value;
        this.releaseYear = document.getElementById('releaseyear').value;
        this.digitalIssue = document.getElementById('digitalissue').value;
        this.issueNumber = document.getElementById('issuenumber').value;
        this.startsWith = document.getElementById('letter').value;
        this.url = `https://gateway.marvel.com:443/v1/public/comics?limit=10&offset=0&${this.format !== ""? '&format='+this.format : ""}${this.format}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.digitalIssue !== ""? '&hasDigitalIssue='+this.digitalIssue : ""}${this.issueNumber !== ""? '&issueNumber='+this.issueNumber : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        console.log(this.url);
        fetch(this.url)
        .then(response => {
            if(response.ok) return response.json();
            else this.fetchError = true;
          })
          .then(result => {this.apiData = result.data; this.manageData()})
          .catch(error => this.fetchError = error);
    }

    manageData = () => {
        if(!this.fetchError) {
            const results = this.apiData.results;
            const resultsnumber = this.apiData.total;

            this.setState({
                results,
                resultsnumber,
            })
        }
        this.displayComics();
    }

    displayComics = () => {
        const results = this.state.results;
        const comics = results.map(comic => {
        const index = comic.thumbnail.path.indexOf('image_not_available');
        return <Comic id={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension} data={comic}/>
        });
        this.setState({
            comics,
        })
    }

    render() {
        console.log(this.state.results);
        console.log(this.state.comics);
        return(
            <div className="comics-list">
                <h1 className="comics-list__title">List of comics</h1>
                <form className="comics-list__form form">
                    <h2 className="form__search">Search options</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form />
                        <button className="form__button" onClick={(e) =>this.changeUrl(e)}>Save</button>
                    </div>
                </form>
                <div className="comics-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.comics}
                </div>
            </div>
        )
    }
}

export default ComicsList;