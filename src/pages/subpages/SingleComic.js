import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import changeUrl from "../../functions/changeUrl";
import convertDate from "../../functions/convertDate";
import prevContent from "../../functions/prevContent";
import followingContent from "../../functions/followingContent";
import fetchData from "../../functions/fetchData";
import Button from "../../components/Button";
import arrow from "../../img/arrow.png";
import {decode} from 'html-entities';
import fixText from "../../functions/fixText";

class SingleComic extends Component {
    state = {
        charactersData: [],
        seriesData: [],
        eventsData: [], 
        currentContent: 0,
        previousContent: null,
        nextContent: 1,
    }

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    data = this.props.location.state.data;
    contentNames = ['characters', 'creators', 'series', 'events', 'other info'];
    
    printDate = this.data.dates.map(date => {
        if(date.type === "onsaleDate") return convertDate(date.date);
        else return null;
    });

    digitalDate = this.data.dates.map(date => {
        if(date.type === "digitalPurchaseDate") return convertDate(date.date);
        else return null;
    });

    printPrice = this.data.prices.map(price => {
        if(price.type === "printPrice") return price.price;
        else return null;
    });

    digitalPrice = this.data.prices.map(price => {
        if(price.type === "digitalPurchasePrice") return price.price;
        else return null;
    });

    componentDidMount() {
        let charactersUrls = this.data.characters.items.map(character => {
            let url = changeUrl(character.resourceURI, 's', 4);
            url = changeUrl(url, ':443', 26);
            return url + `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        });


        let seriesUrl = changeUrl(this.data.series.resourceURI, 's', 4);
        seriesUrl = changeUrl(seriesUrl, ':443', 26);
        seriesUrl += `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

        seriesUrl = new Array(seriesUrl);

        let eventsUrls = this.data.events.items.map(event => {
            let url = changeUrl(event.resourceURI, 's', 4);
            url = changeUrl(url, ':443', 26);
            return url + `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        });

        charactersUrls.forEach(url => {
            const fetch = async () => {
                const result = await fetchData(url);
                this.setState(prevState => ({charactersData: [...prevState.charactersData, result.results[0]]}));
            }
            fetch();

        });


        seriesUrl.forEach(url => {
            const fetch = async () => {
                const result = await fetchData(url);
                this.setState(prevState => ({seriesData: [...prevState.seriesData, result.results[0]]}));
            }

            fetch();
        });

        eventsUrls.forEach(url => {
            const fetch = async () => {
                const result = await fetchData(url);
                this.setState(prevState => ({eventsData: [...prevState.eventsData, result.results[0]]}));
            }

            fetch();
        });


        this.setState({
            previousContent: this.contentNames.length - 1
        });
    }

    manageContent = (where) => {
        const {currentContent, previousContent, nextContent} = this.state;
            const state = (where === 'next'? followingContent(currentContent, nextContent, this.contentNames.length - 1) : prevContent(currentContent, previousContent, this.contentNames.length - 1));
            this.setState({
                 currentContent: state.currentContent,
                 previousContent: state.previousContent,
                 nextContent: state.nextContent
            })
    }

    displayContent = () => {
        const current = this.state.currentContent;
        const name = this.contentNames[current];

        switch(name) {
            case 'characters': return this.characters();
            case 'creators': return this.creators();
            case 'series': return this.series();
            case 'events': return this.events();
            case 'other info': return this.otherInfo; 
            default: return null;
        }
    }

    characters = () => {
        if(this.state.charactersData.length !== 0) {
            return(
                <div className="single-comic__content">
                    {this.state.charactersData.map(result => {
                        const imgPath = `${result.thumbnail.path}/standard_amazing.${result.thumbnail.extension}`;
                        const titleIndex = result.name.indexOf('(');
                        const name = result.name.slice(0, titleIndex) + "\n" + result.name.slice(titleIndex);
                    return (

                        <Link to={{
                        pathname: `/characters/${result.id}`, 
                        state: {data: result}}} className="single-comic__character">
                                <div className="single-comic__character-txtcontainer">
                                    <h1 className="single-comic__character-name">
                                    {titleIndex > -1? name : result.name}
                                    </h1>
                                </div>
                                <img className="single-comic__image" src={imgPath} alt="character"/>
                        </Link>
                      
                    )
                    })}
                </div>
            )
        } else {
            return(
                <div className="single-comic__content">
                    <p className="single-comic__description single-comic__description--info">There are no characters to display</p>
                </div>
            )
        }
    }

    creators = () => {
        if(this.data.creators.items.length !== 0) {
            return(
                <div className="single-comic__content">
                    {this.data.creators.items.map(result => {
                        const urlLength = result.resourceURI.length;
                        const id = result.resourceURI.slice(45, urlLength);
                        return (
                        <Link to={{
                        pathname: `/creators/${id}`, 
                        state: {data: result}}} className="single-comic__creator">
                                <h1 className="single-comic__creator-role"><p className="single-comic__creator-text">{result.role}</p></h1>
                                <h1 className="single-comic__creator-name"><p className="single-comic__creator-text">{result.name}</p></h1>
                        </Link>
                      
                    )
                    })}
                </div>
            )
        } else {
            return(
                <div className="single-comic__content">
                    <p className="single-comic__description single-comic__description--info">There are no creators to display</p>
                </div>
            )
        }
    }

    series = () => {
        if(this.state.seriesData.length !== 0) {
            return(
                <div className="single-comic__content single-comic__content--border">
                    <h2 className="single-comic__title single-comic__title--small single-comic__title--color">{this.data.series.name}</h2>
                    <Link to={{
                        pathname: `/series/${this.state.seriesData[0].id}`, 
                        state: {data: this.state.seriesData[0]}}}
                        className="button">
                            <Button/>
                    </Link>
                </div>
            )
        } else {
            return(
                <div className="single-comic__content">
                    <p className="single-comic__description single-comic__description--info">There are no series to display</p>
                </div>
            )
        }
    }

    events = () => {
        if(this.state.eventsData.length !== 0) {
            return(
                <div className="single-comic__content single-comic__content--border">
                    {this.state.eventsData.map(result => {
                    return (
                        <>
                            <h2 className="single-comic__title">{result.title}</h2>
                            <p className="single-comic__description">{result.description}</p>
                            <Button nameOfClass="button button--brd"/>
                        </>
                    )
                    })}
                </div>
            )
        } else {
            return(
                <div className="single-comic__content">
                    <p className="single-comic__description single-comic__description--info">There are no events to display</p>
                </div>
            )
        }
    }

    otherInfo = (
        <div className="single-comic__content">
            <p className="single-comic__title single-comic__title--small">Dates of sales and prices</p>
            {this.printPrice[0] !== null? <p className="single-comic__description single-comic__description--border">Print:<br/>{this.printDate}, (&#36;{this.printPrice})</p> : null}
            {this.digitalPrice[0] !== null? <p className="single-comic__description single-comic__description--border">Digital:<br/>{this.digitalDate}, (&#36;{this.digitalPrice})</p> : null}
        </div>
    )

    render() {
        const {title} = this.data;
        let description = decode(`${this.data.description}`, {level: 'html5', mode: 'specialChars'});
        description = fixText(description, 0, false);

        return(
            <div className="single-comic">
                <h1 className=" single-comic__title single-comic__title--main">{title}</h1>
                <p className="single-comic__description">{description}</p>
                <div className="single-comic__panel panel">
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--left" onClick={() => this.manageContent('prev')} />
                    </div>
                    <h1 className="panel__title">{this.contentNames[this.state.currentContent]}</h1>
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--right" onClick={() => this.manageContent('next')} />
                    </div>
                </div>
                <div className="single-comic__content--container">
                    {this.displayContent()}
                </div>
            </div>
        )
    }
}

export default SingleComic;