import closeIcon from "../img/close-icon.png";
import fetchData from "../functions/fetchData";
import CharactersList from "../pages/CharactersList";
import SeriesList from "../pages/SeriesList";
import EventsList from "../pages/EventsList";

let charactersNames = [];
let charactersIds = [];

let offset = 0;
let apiKey = '9b9a40427eb372f72b3775e4f456a370';
let url = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=100&offset=${offset}&ts=1&apikey=${apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;   

// const fetch = async (url, what) => {
//     const result = await fetchData(url);
//     if(what === 'characters') {
//         result.results.forEach(single => {
//                 charactersNames.push(single.name);
//                 charactersIds.push(single.id);
//         });
//         console.log(offset);
//         offset += 100;
//         url = `https://gateway.marvel.com:443/v1/public/characters?orderBy=name&limit=100&offset=${offset}&ts=1&apikey=${apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;    
//     }
// }

// const generateCharactersUrls = () => {
//     for(let i=0; i<14; i++) {
//         fetch(url, 'characters');
//         console.log(i);
//     }
// }

const letters = () => {
    return(
        <select id="letter" name="letter" className="form__input form__input--small">
            <option value="" selected></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">N</option>
            <option value="O">O</option>
            <option value="P">P</option>
            <option value="Q">Q</option>
            <option value="R">R</option>
            <option value="S">S</option>
            <option value="T">T</option>
            <option value="U">U</option>
            <option value="V">V</option>
            <option value="W">W</option>
            <option value="X">X</option>
            <option value="Y">Y</option>
            <option value="Z">Z</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>
    );
}

const options = () => {
    return(
        <select id="options" name="options" className="form__input form__input--small">
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
        </select>
    );
}

const comicsList = () => {
    return (
        <>
        <img src={closeIcon} alt='close icon' className="form__close"/>
        <label for="letter" className="form__title form__title--small">Title starts with:</label>
        {letters()}
        <p className="form__title">Filter by:</p>
        <label for="format" className="form__label">Format:</label>
        <select id="format" name="format" className="form__input">
            <option value="" selected></option>
            <option value="comic">Comic</option>
            <option value="magazine">Magazine</option>
            <option value="trade paperback">Trade paperback</option>
            <option value="hardcover">Hardcover</option>
            <option value="digest">Digest</option>
            <option value="graphic novel">Graphic novel</option>
            <option value="digital comic">Digital comic</option>
            <option value="infinite comic">Infinite comic</option>
        </select>
        <label for="releaseyear" className="form__label">Initial release year:</label>
        <input type="text" id="releaseyear" name="releaseyear" className="form__input"/>
        <label for="digitalissue" className="form__label">Has digital issue:</label>
        <select id="digitalissue" name="digitalissue" className="form__input">
            <option value="" selected></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
        </select>
        <label for="issuenumber" className="form__label">Issue number:</label>
        <input type="text" id="issuenumber" name="issuenumber" className="form__input"/>

        <p className="form__title">Search by:</p>
        <label for="title" className="form__label">Title:</label>
        <input type="text" id="title" name="title" className="form__input"/>
        <label for="characters" className="form__label">Character:</label>
        <input type="text" id="characters" name="characters" className="form__input"/>
        <label for="creators" className="form__label">Creator:</label>
        <input type="text" id="creators" name="creators" className="form__input"/>

        <p className="form__title">Other options:</p>
        <label for="order" className="form__label">Order by:</label>
        <select id="order" name="order" className="form__input">
            <option value="title" selected>Title</option>
            <option value="onsaleDate">On sale date</option>
            <option value="issueNumber">Issue number</option>
        </select>
        <label for="results" className="form__label">&#8470; of results on page:</label>
        {options()}
    </>
    );
}

const charactersList = () => {
    return (
        <>
        <img src={closeIcon} alt='close icon' className="form__close"/>
        <label for="letter" className="form__title form__title--small">Title starts with:</label>
        {letters()}

        <p className="form__title">Search by:</p>
        <label for="comic" className="form__label">Comic:</label>
        <input type="text" id="comic" name="comic" className="form__input"/>
        <label for="story" className="form__label">Story:</label>
        <input type="text" id="story" name="story" className="form__input"/>
        <label for="event" className="form__label">Event:</label>
        <input type="text" id="event" name="event" className="form__input"/>

        <p className="form__title">Other options:</p>
        <label for="results" className="form__label">&#8470; of results on page:</label>
        {options()}
    </>
    );
    
}

const seriesList = () => {
    return (
        <>
        <img src={closeIcon} alt='close icon' className="form__close"/>
        <label for="letter" className="form__title form__title--small">Name starts with:</label>
        {letters()}

        <p className="form__title">Filter by:</p>
        <label for="type" className="form__label">Type:</label>
        <select id="type" name="type" className="form__input">
            <option value="" selected></option>
            <option value="collection">Collection</option>
            <option value="one shot">One shot</option>
            <option value="limited">Limited</option>
            <option value="ongoing">Ongoing</option>
        </select>

        <label for="contains" className="form__label">Has to contain:</label>
        <select id="contains" name="contains" className="form__input">
            <option value="" selected></option>
            <option value="comic">Comic</option>
            <option value="magazine">Magazine</option>
            <option value="trade paperback">Trade paperback</option>
            <option value="hardcover">Hardcover</option>
            <option value="digest">Digest</option>
            <option value="graphic novel">Graphic novel</option>
            <option value="digital comic">Digital comic</option>
            <option value="infinite comic">Infinite comic</option>
        </select>
        <label for="releaseyear" className="form__label">Initial release year:</label>
        <input type="text" id="releaseyear" name="releaseyear" className="form__input"/>

        <p className="form__title">Search by:</p>
        <label for="comic" className="form__label">Comic:</label>
        <input type="text" id="comic" name="comic" className="form__input"/>
        <label for="character" className="form__label">Character:</label>
        <input type="text" id="character" name="character" className="form__input"/>
        <label for="event" className="form__label">Event:</label>
        <input type="text" id="event" name="event" className="form__input"/>

        <p className="form__title">Other options:</p>
        <label for="order" className="form__label">Order by:</label>
        <select id="order" name="order" className="form__input">
            <option value="title" selected>Title</option>
            <option value="startYear">Initial release year</option>
        </select>
        <label for="results" className="form__label">&#8470; of results on page:</label>
        {options()}
    </>
    );   
}

const eventsList = () => {
    return (
        <>
        <img src={closeIcon} alt='close icon' className="form__close"/>
        <label for="letter" className="form__title form__title--small">Name starts with:</label>
        {letters()}
        <p className="form__title">Search by:</p>
        <label for="title" className="form__label">Title:</label>
        <input type="text" id="title" name="title" className="form__input"/>
        <label for="characters" className="form__label">Character:</label>
        <input type="text" id="characters" name="characters" className="form__input"/>
        <label for="creators" className="form__label">Creator:</label>
        <input type="text" id="creators" name="creators" className="form__input"/>

        <p className="form__title">Other options:</p>
        <label for="order" className="form__label">Order by:</label>
        <select id="order" name="order" className="form__input">
            <option value="" selected></option>
            <option value="name">Name</option>
            <option value="startDate">Initial release date</option>
        </select>
        <label for="results" className="form__label">&#8470; of results on page:</label>
        <input type="text" id="results" name="results" className="form__input"/>

    </>
    );
}

const Form = (props) => {
    switch(props.type) {
        case 'comics': return comicsList();
        case 'characters': return charactersList();
        case 'series': return seriesList();
        case 'events': return eventsList();
        default: return null;
    }
}

export default Form;