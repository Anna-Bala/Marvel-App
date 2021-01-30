import React, {Component} from "react";
import fetchData from "../functions/fetchData";
import Series from "../components/Series";
import Form from "../components/Form";
import icon from "../img/settings-icon.png";

class SeriesList extends Component {
    state = {
        resultsnumber: 0,
        seriesData: [],
        series: null,
    };

     //URL parameters:

     orderBy = "title";
     numberOfResults = 10;
     startsWith = "";
     type = "";
     contains = "";
     releaseYear = "";
     currentPage = 0;
     offset = 0;
     goToPage = null;


    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/series?limit=${this.numberOfResults}&offset=${this.offset}&${this.type !== ""? '&seriesType='+this.type : ""}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.contains !== ""? '&contains='+this.contains : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

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

    displaySeries = () => {
        const results = this.state.seriesData;
        const series = results.map(series => {
        const index = series.thumbnail.path.indexOf('image_not_available');
        return <Series id={series.id} title={series.title} description={series.description} img={index === (-1)? series.thumbnail.path : false} extension={series.thumbnail.extension} data={series}/>
        });
        this.setState({
            series,
        })
    }

    fetch = async () => {
        const result = await fetchData(this.url);
        console.log(result.results);
        this.setState({seriesData: result.results, resultsnumber: result.total});
        this.displaySeries();
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
        this.type = document.getElementById('type').value;
        this.releaseYear = document.getElementById('releaseyear').value;
        this.contains = document.getElementById('contains').value;
        this.startsWith = document.getElementById('letter').value;
        this.offset = this.currentPage * this.numberOfResults;
        this.numberOfResults = document.getElementById('options').value;

        const newUrl = `https://gateway.marvel.com:443/v1/public/series?limit=${this.numberOfResults}&offset=${this.offset}&${this.type !== ""? '&seriesType='+this.type : ""}${this.releaseYear !== ""? '&startYear='+this.releaseYear : ""}${this.contains !== ""? '&contains='+this.contains : ""}${this.startsWith !== ""? '&titleStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        
        if(newUrl !== this.url)
        {
            this.setState({
                series: null
            });
            this.url = newUrl;
            this.fetch();
        } 
    }

    render() {
        return(
            <div className="series-list">
                <h1 className="series-list__title">List of series</h1>
                <form className="series-list__form form">
                    <h2 className="form__search">Search options:</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form type="series"/>
                        <button className="form__button" onClick={(e) =>this.changeUrl(e)}>Save</button>
                    </div>
                </form>
                <div className="series-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.series}
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

export default SeriesList;