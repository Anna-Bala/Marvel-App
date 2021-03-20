import React, {Component} from "react";
import fetchData from "../functions/fetchData";
import Comic from "../components/Comic";
import Form from "../components/FormClass";
import icon from "../img/settings-icon.png";

class ComicsList extends Component {
    state = {
        resultsnumber: 0,
        comicData: [],
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
    currentPage = 0;
    offset = 0;
    goToPage = null;
    
    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/comics?limit=${this.numberOfResults}&offset=${this.offset}${this.format !== ""? '&format='+this.format : ""}${this.format}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.digitalIssue !== ""? '&hasDigitalIssue='+this.digitalIssue : ""}${this.issueNumber !== ""? '&issueNumber='+this.issueNumber : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

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

    displayComics = () => {
        const results = this.state.comicData;
        const comics = results.map(comic => {
        const index = comic.thumbnail.path.indexOf('image_not_available');
        return <Comic id={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension} data={comic}/>
        });
        this.setState({
            comics,
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
        this.setState({comicData: result.results, resultsnumber: result.total});
        this.displayComics();
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

        // OFFEST SKIPS COMICS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        console.log("page: " + this.currentPage);

        this.orderBy = document.getElementById('order').value;
        this.format = document.getElementById('format').value;
        this.releaseYear = document.getElementById('releaseyear').value;
        this.digitalIssue = document.getElementById('digitalissue').value;
        this.issueNumber = document.getElementById('issuenumber').value;
        this.startsWith = document.getElementById('letter').value;
        this.offset = this.currentPage * this.numberOfResults;
        this.numberOfResults = document.getElementById('options').value;
        let newUrl = `https://gateway.marvel.com:443/v1/public/comics?limit=${this.numberOfResults}&offset=${this.offset}${this.format !== ""? '&format='+this.format : ""}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.digitalIssue !== ""? '&hasDigitalIssue='+this.digitalIssue : ""}${this.issueNumber !== ""? '&issueNumber='+this.issueNumber : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        if(this.props.location.state.data !== null)
        {
            newUrl = `https://gateway.marvel.com:443/v1/public/comics?${this.props.location.state.from}=${this.props.location.state.data}&limit=${this.numberOfResults}&offset=${this.offset}${this.format !== ""? '&format='+this.format : ""}${this.format}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.digitalIssue !== ""? '&hasDigitalIssue='+this.digitalIssue : ""}${this.issueNumber !== ""? '&issueNumber='+this.issueNumber : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        }
        
        if(newUrl !== this.url)
        {
            this.setState({
                comics: null
            });
            this.url = newUrl;
            console.log(this.url);
            this.fetch();
        } 
    }


    render() {
        return(
            <div className="comics-list">
                <h1 className="comics-list__title">List of comics</h1>
                <form className="comics-list__form form">
                    <h2 className="form__search">Search options:</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form type="comics"/>
                        <button className="form__button" onClick={(e) =>this.changeUrl(e)}>Save</button>
                    </div>
                </form>
                <div className="comics-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.comics}
                </div>
                <div className="results-nav">
                    <hr className="results-nav__line"/>
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

export default ComicsList;