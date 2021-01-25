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

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=0&ts=1&orderBy=${this.orderBy}&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

    componentDidMount() {
        // fetch(this.url)
        // .then(response => {
        //     if(response.ok) return response.json();
        //     else this.fetchError = true;
        //   })
        //   .then(result => {this.apiData = result.data; this.manageData()})
        //   .catch(error => this.fetchError = error);



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
        const result = this.state.charactersData;
        const characters = result.map(character => {
        console.log('xd');
        const index = character.thumbnail.path.indexOf('image_not_available');
        return <Character id={character.id} name={character.name} description={character.description} img={index === (-1)? character.thumbnail.path : false} extension={character.thumbnail.extension} data={character}/>
        });
        this.setState({
            characters
        })

        const nameLabel = document.getElementsByClassName('character__name-label');
        const character = document.getElementsByClassName('character');
        character[0].addEventListener("click", () => {
            nameLabel[0].classList.toggle('character__name-label--closed');
            console.log(nameLabel[0]);
          });
    }

    fetch = async () => {
        const result = await fetchData(this.url);
        console.log(result);
        this.setState({charactersData: result.results, resultsnumber: result.total});
        this.displayComics();
    }

    render() {
        return(
            <div className="characters-list">
                <h1 className="characters-list__title">List of characters</h1>
                <form className="characters-list__form form">
                    <h2 className="form__search">Search options:</h2>
                    <img src={icon} alt='settings icon' className="form__icon"/>
                    <div className="form__main">
                        <Form />
                        <button className="form__button" onClick={(e) =>this.changeUrl(e)}>Save</button>
                    </div>
                </form>
                <div className="characters-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.characters}
                </div>
            </div>
        )
    }
}

export default CharactersList;