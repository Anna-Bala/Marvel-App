import closeIcon from "../img/close-icon.png";
// import CharactersList from "../pages/CharactersList";
// import SeriesList from "../pages/SeriesList";
// import EventsList from "../pages/EventsList";
// import CreatorsList from "../pages/CreatorsList";

let charactersIds = [1011334, 1017100, 1009144];
const charactersNames = ['3-D Man', 'A-Bomb (HAS)', 'A.I.M.'];

function search(str) {
	let results = [];
	const val = str.toLowerCase();

	for (let i = 0; i < charactersNames.length; i++) {
		if (charactersNames[i].toLowerCase().indexOf(val) > -1) {
			results.push(charactersNames[i]);
		}
	}

	return results;
}

function searchHandler(e, input, suggestions) {
	const inputVal = e.currentTarget.value;
	let results = [];
	if (inputVal.length > 0) {
		results = search(inputVal);
	}
	showSuggestions(results, inputVal, input, suggestions);
}

function showSuggestions(results, inputVal, input, suggestions) {
    
    suggestions.innerHTML = '';

	if (results.length > 0) {
		for (let i = 0; i < results.length; i++) {
			let item = results[i];
			// Highlights only the first match
			// TODO: highlight all matches
			const match = item.match(new RegExp(inputVal, 'i'));
			item = item.replace(match[0], `<strong>${match[0]}</strong>`);
			suggestions.innerHTML += `<li>${item}</li>`;
		}
		suggestions.classList.add('has-suggestions');
	} else {
		results = [];
		suggestions.innerHTML = '';
		suggestions.classList.remove('has-suggestions');
	}
}

function useSuggestion(e, input, suggestions) {
	input.value = e.target.innerText;
	input.focus();
	suggestions.innerHTML = '';
	suggestions.classList.remove('has-suggestions');
}

const searchCharacters = () => {
    const input = document.querySelector('#character');
    const suggestions = document.querySelector('.form__suggestions-characters');

    input.addEventListener('keyup', searchHandler(input, suggestions));
    suggestions.addEventListener('click', () => useSuggestion(input, suggestions));
}

const letters = (type) => {
    return(
        <select id={type} name={type} className="form__input form__input--small">
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
        {letters("letter")}
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
        <label for="characters" className="form__label">Character:</label>
        <div class="form__search-characters">
	        <input type="text" name="character" id="character" placeholder="Search character" />
	            <div class="form__suggestions-characters">
		            <ul></ul>
	            </div>
        </div>
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
        {letters("letter")}

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
        {letters("letter")}

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
        {letters("letter")}
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
            <option value="name" selected>Name</option>
            <option value="startDate">Initial release date</option>
        </select>
        <label for="results" className="form__label">&#8470; of results on page:</label>
        {options()}
    </>
    );
}

const creatorsList = () => {
    return (
        <>
        <img src={closeIcon} alt='close icon' className="form__close"/>
        <label for="firstNameLetter" className="form__title form__title--small">First name starts with:</label>
        {letters("firstNameLetter")}
        <label for="middleNameLetter" className="form__title form__title--small">Middle name starts with:</label>
        {letters("middleNameLetter")}
        <label for="lastNameLetter" className="form__title form__title--small">Last name starts with:</label>
        {letters("lastNameLetter")}
        <p className="form__title">Search by:</p>
        <label for="title" className="form__label">Comic:</label>
        <input type="text" id="comic" name="comic" className="form__input"/>
        <label for="characters" className="form__label">Series:</label>
        <input type="text" id="series" name="series" className="form__input"/>
        <label for="creators" className="form__label">Event:</label>
        <input type="text" id="event" name="event" className="form__input"/>

        <p className="form__title">Other options:</p>
        <label for="order" className="form__label">Order by:</label>
        <select id="order" name="order" className="form__input">
            <option value="firstName" selected>First name</option>
            <option value="lastName">Last name</option>
            <option value="middleName">Middle name</option>
            <option value="suffix">Suffix</option>
        </select>
        <label for="results" className="form__label">&#8470; of results on page:</label>
        {options()}
    </>
    );
}

const Form = (props) => {
    switch(props.type) {
        case 'comics': return comicsList();
        case 'characters': return charactersList();
        case 'series': return seriesList();
        case 'events': return eventsList();
        case 'creators': return creatorsList();
        default: return null;
    }
}

export default Form;