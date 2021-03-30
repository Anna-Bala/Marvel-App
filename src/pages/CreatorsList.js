import React, {Component} from "react";
import fetchData from "../functions/fetchData";
import Creator from "../components/Creator";
import Form from "../components/FormClass";
import Loader from "../components/Loader";
import icon from "../img/settings-icon.png";

class CreatorsList extends Component {
    state = {
        resultsnumber: 0,
        creatorsData: [],
        creators: null,
        isLoaded: false
    };

    //URL parameters:

    firstNameStartsWith = "";
    middleNameStartsWith = "";
    lastNameStartsWith = "";
    orderBy = "firstName";
    numberOfResults = 10;
    currentPage = 0;
    offset = 0;
    goToPage = null;

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/creators?limit=${this.numberOfResults}&offset=${this.offset}${this.firstNameStartsWith !== ""? '&firstNameStartsWith='+this.firstNameStartsWith : ""}${this.middleNameStartsWith !== ""? '&middleNameStartsWith='+this.middleNameStartsWith : ""}${this.lastNameStartsWith !== ""? '&lastNameStartsWith='+this.lastNameStartsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

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

    displayCreators = () => {
        const results = this.state.creatorsData;
        const scrollElement = document.querySelector('.navigation');
        const creators = results.map(creator => {
        return <Creator id={creator.id} name={creator.fullName} extension={creator.thumbnail.extension} data={creator}/>
        });
        this.setState({
            creators,
            isLoaded: true
        });
        scrollElement.scrollIntoView();
    }

    fetch = async () => {
        let result = null;
        if(this.props.location.state.data !== null)
        {
            const propsUrl = this.url + `&${this.props.location.state.from}=` + this.props.location.state.data;
            result = await fetchData(propsUrl);
        }
        else result = await fetchData(this.url);
        this.setState({creatorsData: result.results, resultsnumber: result.total});
        this.displayCreators();
    }

    changeUrl = (e, where) => {
        e.preventDefault();

        const errorText = document.getElementsByClassName('results-nav__error');
        errorText[0].innerHTML = "";
        let totalPages = (this.state.resultsnumber / this.numberOfResults);
        totalPages = Math.floor(totalPages) +1;
        const whichPage = parseInt(document.getElementById('page').value) -1;
        if(totalPages === 1) {
            errorText[0].innerHTML = `There is only one page`;
        }
        else if(whichPage +1 > totalPages) {
            errorText[0].innerHTML = `There are ${totalPages} pages`;
        } else if (whichPage <= -1){
            errorText[0].innerHTML = `Wrong value`;
        }
        else {
            if(where === "value") this.currentPage = whichPage;
        } 

        this.currentPage = parseInt(this.currentPage);
        

        if(where === "next" && this.currentPage +1 < totalPages) this.currentPage += 1;
        else if(where === "prev" && this.currentPage !== 0) this.currentPage -= 1;
        
        document.querySelector('.results-nav__input').value = null;

        this.orderBy = document.getElementById('order').value;
        this.firstNameStartsWith = document.getElementById('firstNameLetter').value;
        this.middleNameStartsWith = document.getElementById('middleNameLetter').value;
        this.lastNameStartsWith = document.getElementById('lastNameLetter').value;
        this.offset = this.currentPage * this.numberOfResults;
        this.numberOfResults = document.getElementById('options').value;

        let newUrl = `https://gateway.marvel.com:443/v1/public/creators?limit=${this.numberOfResults}&offset=${this.offset}${this.firstNameStartsWith !== ""? '&firstNameStartsWith='+this.firstNameStartsWith : ""}${this.middleNameStartsWith !== ""? '&middleNameStartsWith='+this.middleNameStartsWith : ""}${this.lastNameStartsWith !== ""? '&lastNameStartsWith='+this.lastNameStartsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        
        if(this.props.location.state.data !== null)
        {
            newUrl = `https://gateway.marvel.com:443/v1/public/creators?${this.props.location.state.from}=${this.props.location.state.data}&limit=${this.numberOfResults}&offset=${this.offset}${this.firstNameStartsWith !== ""? '&firstNameStartsWith='+this.firstNameStartsWith : ""}${this.middleNameStartsWith !== ""? '&middleNameStartsWith='+this.middleNameStartsWith : ""}${this.lastNameStartsWith !== ""? '&lastNameStartsWith='+this.lastNameStartsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        }
        
        if(newUrl !== this.url)
        {
            this.setState({
                creators: null,
                isLoaded: false
            });
            this.url = newUrl;
            this.fetch();
        } 
    }

    render() {
        return(
            <div className="creators-list">
                <h1 className="creators-list__title">List of creators</h1>
                <form className="creators-list__form form">
                    <h2 className="form__search">Search options:</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form type="creators"/>
                        <button className="form__button" onClick={(e) =>{this.currentPage = 0; this.changeUrl(e)}}>Save</button>
                    </div>
                </form>
                <div className="creators-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.isLoaded? <>{this.state.creators}</> : <Loader/>}
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

export default CreatorsList;