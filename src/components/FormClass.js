import React, {Component} from 'react';
import closeIcon from "../img/close-icon.png";

class Form extends Component {
    letters = (type) => {
        return(
            <select id={type} name={type} className="form__input form__input--small">
                <option value="" defaultValue></option>
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
    };

   options = () => {
        return(
            <select id="options" name="options" className="form__input form__input--small">
                <option value="10" defaultValue>10</option>
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
    };

    comicsList = () => {
        return (
            <>
            <h2 className="form__title form__title--big">Search options: </h2>
            <hr className="form__break"/>
            <img src={closeIcon} alt='close icon' className="form__close"/>
            <label htmlFor="letter" className="form__label">Title starts with:</label>
            {this.letters("letter")}
            <hr className="form__break"/>
            <p className="form__title">Filter by:</p>
            <hr className="form__break"/>
            <label htmlFor="format" className="form__label">Format:</label>
            <select id="format" name="format" className="form__input">
                <option value="" defaultValue></option>
                <option value="comic">Comic</option>
                <option value="magazine">Magazine</option>
                <option value="trade paperback">Trade paperback</option>
                <option value="hardcover">Hardcover</option>
                <option value="digest">Digest</option>
                <option value="graphic novel">Graphic novel</option>
                <option value="digital comic">Digital comic</option>
                <option value="infinite comic">Infinite comic</option>
            </select>
            <label htmlFor="releaseyear" className="form__label">Initial release year:</label>
            <input type="text" id="releaseyear" name="releaseyear" className="form__input"/>
            <hr className="form__break"/>
            <label htmlFor="digitalissue" className="form__label">Has digital issue:</label>
            <select id="digitalissue" name="digitalissue" className="form__input">
                <option value="" defaultValue></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
            <label htmlFor="issuenumber" className="form__label">Issue number:</label>
            <input type="text" id="issuenumber" name="issuenumber" className="form__input"/>
 
            <p className="form__title">Other options:</p>
            <hr className="form__break"/>
            <label htmlFor="order" className="form__label">Order by:</label>
            <select id="order" name="order" className="form__input">
                <option value="title" defaultValue>Title</option>
                <option value="onsaleDate">On sale date</option>
                <option value="issueNumber">Issue number</option>
            </select>
            <label htmlFor="results" className="form__label">&#8470; of results on page:</label>
            {this.options()}
            <hr className="form__break"/>
        </>
        );
    }

    charactersList = () => {
        return (
            <>
            <h2 className="form__title form__title--big">Search options: </h2>
            <img src={closeIcon} alt='close icon' className="form__close"/>
            <label htmlFor="letter" className="form__label">Name starts with:</label>
            {this.letters("letter")}
    
            <p className="form__title">Other options:</p>
            <label htmlFor="results" className="form__label">&#8470; of results on page:</label>
            {this.options()}
            <hr className="form__break"/>
        </>
        );
    };

    seriesList = () => {
        return (
            <>
            <h2 className="form__title form__title--big">Search options: </h2>
            <img src={closeIcon} alt='close icon' className="form__close"/>
            <label htmlFor="letter" className="form__label">Name starts with:</label>
            {this.letters("letter")}
    
            <p className="form__title">Filter by:</p>
            <label htmlFor="type" className="form__label">Type:</label>
            <select id="type" name="type" className="form__input">
                <option value="" defaultValue></option>
                <option value="collection">Collection</option>
                <option value="one shot">One shot</option>
                <option value="limited">Limited</option>
                <option value="ongoing">Ongoing</option>
            </select>
    
            <label htmlFor="contains" className="form__label">Has to contain:</label>
            <select id="contains" name="contains" className="form__input">
                <option value="" defaultValue></option>
                <option value="comic">Comic</option>
                <option value="magazine">Magazine</option>
                <option value="trade paperback">Trade paperback</option>
                <option value="hardcover">Hardcover</option>
                <option value="digest">Digest</option>
                <option value="graphic novel">Graphic novel</option>
                <option value="digital comic">Digital comic</option>
                <option value="infinite comic">Infinite comic</option>
            </select>
            <hr className="form__break"/>
            <label htmlFor="releaseyear" className="form__label">Initial release year:</label>
            <input type="text" id="releaseyear" name="releaseyear" className="form__input"/>
    
            <p className="form__title">Other options:</p>
            <label htmlFor="order" className="form__label">Order by:</label>
            <select id="order" name="order" className="form__input">
                <option value="title" defaultValue>Title</option>
                <option value="startYear">Initial release year</option>
            </select>
            <label htmlFor="results" className="form__label">&#8470; of results on page:</label>
            {this.options()}
        </>
        );   
    };

    eventsList = () => {
        return (
            <>
            <h2 className="form__title form__title--big">Search options: </h2>
            <img src={closeIcon} alt='close icon' className="form__close"/>
            <label htmlFor="letter" className="form__label">Name starts with:</label>
            {this.letters("letter")}
    
            <p className="form__title">Other options:</p>
            <label htmlFor="order" className="form__label">Order by:</label>
            <select id="order" name="order" className="form__input">
                <option value="name" defaultValue>Name</option>
                <option value="startDate">Initial release date</option>
            </select>
            <label htmlFor="results" className="form__label">&#8470; of results on page:</label>
            {this.options()}
        </>
        );
    };

    creatorsList = () => {
        return (
            <>
            <h2 className="form__title form__title--big">Search options: </h2>
            <img src={closeIcon} alt='close icon' className="form__close"/>
            <label htmlFor="firstNameLetter" className="form__label">First name starts with:</label>
            {this.letters("firstNameLetter")}
            <hr className="form__break"/>
            <label htmlFor="middleNameLetter" className="form__label">Middle name starts with:</label>
            {this.letters("middleNameLetter")}
            <hr className="form__break"/>
            <label htmlFor="lastNameLetter" className="form__label">Last name starts with:</label>
            {this.letters("lastNameLetter")}
            <p className="form__title">Other options:</p>
            <label htmlFor="order" className="form__label">Order by:</label>
            <select id="order" name="order" className="form__input">
                <option value="firstName" defaultValue>First name</option>
                <option value="lastName">Last name</option>
                <option value="middleName">Middle name</option>
                <option value="suffix">Suffix</option>
            </select>
            <label htmlFor="results" className="form__label">&#8470; of results on page:</label>
            {this.options()}
        </>
        );
    };
 
    render() {
        const {type} = this.props;
            switch(type) {
                case 'comics': return this.comicsList();
                case 'characters': return this.charactersList();
                case 'series': return this.seriesList();
                case 'events': return this.eventsList();
                case 'creators': return this.creatorsList();
                default: return null;
            };
    }
};

export default Form;

