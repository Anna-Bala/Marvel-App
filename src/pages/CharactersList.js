import React, {Component} from "react";
import fetchData from "../functions/fetchData";
import Character from "../components/Character";
import Form from "../components/Form";
import icon from "../img/settings-icon.png";

class CharactersList extends Component {
    state = {
        resultsnumber: 0,
        charactersData: [],
        characters: null,
    }


    orderBy = "name";
    startsWith = "";
    currentPage = 0;
    offset = 0;
    goToPage = null;
    numberOfResults = 10;

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/characters?limit=${this.numberOfResults}&offset=${this.offset}${this.startsWith !== ""? '&nameStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
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

    displayCharacters = () => {
        const result = this.state.charactersData;
        const characters = result.map(character => {
        const index = character.thumbnail.path.indexOf('image_not_available');
        return <Character id={character.id} name={character.name} description={character.description} img={index === (-1)? character.thumbnail.path : false} extension={character.thumbnail.extension} data={character}/>
        });
        this.setState({
            characters
        })

        const nameLabel = [].slice.call(document.getElementsByClassName('character__name-label'));
        const charactersDivs = [].slice.call(document.getElementsByClassName('character'));
        for(let i = 0; i < charactersDivs.length; i++)
        {
            if((charactersDivs[i].innerText).indexOf('Learn more...') > -1) charactersDivs.splice(i, 1);
        }
        

        charactersDivs.forEach((div, id)=> {
            div.addEventListener("click", () => {
                nameLabel[id].classList.toggle('character__name-label--closed');
            });
        })
    }

    fetch = async () => {
        const result = await fetchData(this.url);
        this.setState({charactersData: result.results, resultsnumber: result.total});
        this.displayCharacters();
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

        this.startsWith = document.getElementById('letter').value;
        this.offset = this.currentPage * this.numberOfResults;
        this.numberOfResults = document.getElementById('options').value;
        const newUrl = `https://gateway.marvel.com:443/v1/public/characters?limit=${this.numberOfResults}&offset=${this.offset}${this.startsWith !== ""? '&nameStartsWith='+this.startsWith : ""}&orderBy=${this.orderBy}&ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        console.log(newUrl);
        if(newUrl !== this.url)
        {
            this.setState({
                characters: null
            });
            this.url = newUrl;
            this.fetch();
        } 
    }

    render() {
        return(
            <div className="characters-list">
                <h1 className="characters-list__title">List of characters</h1>
                <form className="characters-list__form form">
                    <h2 className="form__search">Search options:</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form type="characters"/>
                        <button className="form__button" onClick={(e) =>this.changeUrl(e)}>Save</button>
                    </div>
                </form>
                <div className="characters-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.characters}
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

export default CharactersList;