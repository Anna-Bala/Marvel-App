import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Comic from "../../components/Comic";
import changeUrl from "../../functions/changeUrl";
import prevContent from "../../functions/prevContent";
import followingContent from "../../functions/followingContent";
import fetchData from "../../functions/fetchData";
import Button from "../../components/Button";
import arrow from "../../img/arrow.png";

class SingleSeries extends Component {
    state = {
        charactersData: [],
        comicsData: [],
        eventsData: [], 
        currentContent: 0,
        previousContent: null,
        nextContent: 1,
        comics: null,
    }

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    data = this.props.location.state.data;
    contentNames = ['comics', 'characters', 'creators', 'events'];

    componentDidMount() {
        let charactersUrls = this.data.characters.items.map(character => {
            let url = changeUrl(character.resourceURI, 's', 4);
            url = changeUrl(url, ':443', 26);
            return url + `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        });


        let eventsUrls = this.data.events.items.map(event => {
            let url = changeUrl(event.resourceURI, 's', 4);
            url = changeUrl(url, ':443', 26);
            return url + `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        });

        let comicsUrls = this.data.comics.items.map(comic => {
            let url = changeUrl(comic.resourceURI, 's', 4);
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

        comicsUrls.forEach((url, id) => {
            if(id <= 5) {
                const fetch = async () => {
                    const result = await fetchData(url);
                    this.setState(prevState => ({comicsData: [...prevState.comicsData, result.results[0]]}));
                }
                fetch();
            }

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
            case 'comics': return this.comics();
            case 'events': return this.events();
            default: return null;
        }
    }

    characters = () => {
        if(this.state.charactersData.length !== 0) {
            return(
                <div className="single-series__content">
                    {this.state.charactersData.map(result => {
                        const imgPath = `${result.thumbnail.path}/standard_amazing.${result.thumbnail.extension}`;
                        const titleIndex = result.name.indexOf('(');
                        const name = result.name.slice(0, titleIndex);
                    return (

                        <Link to={{
                        pathname: `/characters/${result.id}`, 
                        state: {data: result}}} className="single-series__character">
                                <div className="single-series__character-txtcontainer">
                                    <h1 className="single-series__character-name">
                                    {titleIndex > -1? name : result.name}
                                    </h1>
                                </div>
                                <img className="single-series__image" src={imgPath} alt="character"/>
                        </Link>
                      
                    )
                    })}
                </div>
            )
        } else {
            return(
                <div className="single-series__content">
                    <p className="single-series__description">There are no characters to display</p>
                </div>
            )
        }
    }

    creators = () => {
        if(this.data.creators.items.length !== 0) {
            return(
                <div className="single-series__content">
                    {this.data.creators.items.map(result => {
                        const urlLength = result.resourceURI.length;
                        const id = result.resourceURI.slice(45, urlLength);
                        return (
                        <Link to={{
                        pathname: `/creators/${id}`, 
                        state: {data: result}}} className="single-series__creator">
                                <h1 className="single-series__creator-role">{result.role}</h1>
                                <h1 className="single-series__creator-name">{result.name}</h1>
                        </Link>
                      
                    )
                    })}
                </div>
            )
        } else {
            return(
                <div className="single-series__content">
                    <p className="single-series__description">There are no characters to display</p>
                </div>
            )
        }
    }

    comics = () => {
        if(this.state.comicsData.length !== 0) {
            const results = this.state.comicsData;
            const comics = results.map(comic => {
            const index = comic.thumbnail.path.indexOf('image_not_available');
            return <Comic id={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension} data={comic}/>
            });
            return(
                <>
                    {comics}
                    <hr className="single-series__break"/>
                    {<Link to={{
                    pathname: `/comics`, 
                    state: {data: this.data.id, from: 'series'}}} 
                    className="button button--brd">
                        <Button text="See all comics"/>
                    </Link>}
                </>
            )
        } else {
            return(
                <div className="single-series__content">
                    <p className="single-series__description">There are no comics to display</p>
                </div>
            )
        }
    }

    events = () => {
        if(this.state.eventsData.length !== 0) {
            return(
                <div className="single-series__content single-series__content--border">
                    {this.state.eventsData.map(result => {
                    return (
                        <>
                            <h2 className="single-series__title">{result.title}</h2>
                            <p className="single-series__description">{result.description}</p>
                            <Button nameOfClass="button button--brd"/>
                        </>
                    )
                    })}
                </div>
            )
        } else {
            return(
                <div className="single-series__content">
                    <p className="single-series__description">There are no events to display</p>
                </div>
            )
        }
    }


    render() {
        const {title, description} = this.data;
        return(
            <div className="single-series">
                <h1 className=" single-series__title single-series__title--main">{title}</h1>
                <p className="single-series__description">{description}</p>
                <div className="single-series__panel panel">
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--left" onClick={() => this.manageContent('prev')} />
                    </div>
                    <h1 className="panel__title">{this.contentNames[this.state.currentContent]}</h1>
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--right" onClick={() => this.manageContent('next')} />
                    </div>
                </div>
                <div className="single-series__content--container">
                    {this.displayContent()}
                </div>
            </div>
        )
    }
}

export default SingleSeries;