import React, {Component} from "react";
import Comic from "../../components/Comic";
import Series from "../../components/Series";
import Character from "../../components/Character";
import Creator from "../../components/Creator";
import Event from "../../components/Event";
import changeUrl from "../../functions/changeUrl";
import fetchData from "../../functions/fetchData";
import prevContent from "../../functions/prevContent";
import convertDate from "../../functions/convertDate";
import followingContent from "../../functions/followingContent";
import {Link} from 'react-router-dom';
import Button  from '../../components/Button';
import arrow from "../../img/arrow.png";
import Loader from "../../components/Loader";

class SingleEvent extends Component {
    state = {
        comicsData: [],
        seriesData: [],
        charactersData: [],
        creatorsData: [],
        prevEventData: [],
        nextEventData: [],
        comics: null,
        series: null,
        characters : null,
        creators: null,
        currentContent: 0,
        previousContent: null,
        nextContent: 1,
        isLoaded: false
    }

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    data = this.props.location.state.data;
    contentNames = ['comics', 'characters', 'creators', 'series', 'other info'];

    startDate =  convertDate(this.data.start);
    endDate =  convertDate(this.data.end);

    fetch = async (what, url) => {
        const result = await fetchData(url);
        if(what === 'comics') {
            this.setState(prevState => ({comicsData: [...prevState.comicsData, result]}));
            this.displayComics();
        }
        else if(what === 'series') {
            this.setState(prevState => ({seriesData: [...prevState.seriesData, result]}));
            this.displaySeries();
        }
        else if(what === 'characters') {
            this.setState(prevState => ({charactersData: [...prevState.charactersData, result]}));
            this.displayCharacters();
        }
        else if(what === 'creators') {
            this.setState(prevState => ({creatorsData: [...prevState.creatorsData, result]}));
            this.displayCreators();
        }
        else if(what === 'prevEvent') {
            this.setState(prevState => ({prevEventData: [...prevState.prevEventData, result.results[0]]}));
        }
        else if(what === 'nextEvent') {
            this.setState(prevState => ({nextEventData: [...prevState.nextEventData, result.results[0]]}));
        }
    }

    componentDidMount() {
        let comicsUrls = this.data.comics.collectionURI;
        comicsUrls = changeUrl(comicsUrls, 's', 4);
        comicsUrls = changeUrl(comicsUrls, ':443', 26);
        comicsUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=issueNumber&hash=97a77a62ca6b19c0c250ad87841df189`;

        comicsUrls = new Array(comicsUrls);

        comicsUrls.forEach(url => {
            this.fetch("comics", url);
        });

        let seriesUrls = this.data.series.collectionURI;
        seriesUrls = changeUrl(seriesUrls, 's', 4);
        seriesUrls = changeUrl(seriesUrls, ':443', 26);
        seriesUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=title&hash=97a77a62ca6b19c0c250ad87841df189`;

        seriesUrls = new Array(seriesUrls);

        seriesUrls.forEach(url => {
            this.fetch("series", url);
        });

        let charactersUrls = this.data.characters.collectionURI;
        charactersUrls = changeUrl(charactersUrls, 's', 4);
        charactersUrls = changeUrl(charactersUrls, ':443', 26);
        charactersUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=name&hash=97a77a62ca6b19c0c250ad87841df189`;

        charactersUrls = new Array(charactersUrls);

        charactersUrls.forEach(url => {
            this.fetch("characters", url);
        });

        let creatorsUrls = this.data.creators.collectionURI;
        creatorsUrls = changeUrl(creatorsUrls, 's', 4);
        creatorsUrls = changeUrl(creatorsUrls, ':443', 26);
        creatorsUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=firstName&hash=97a77a62ca6b19c0c250ad87841df189`;

        creatorsUrls = new Array(creatorsUrls);

        creatorsUrls.forEach(url => {
            this.fetch("creators", url);
        });

        let prevEventUrl = this.data.previous.resourceURI;
        prevEventUrl = changeUrl(prevEventUrl, 's', 4);
        prevEventUrl = changeUrl(prevEventUrl, ':443', 26);
        prevEventUrl += `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

        this.fetch("prevEvent", prevEventUrl);

        let nextEventUrl = this.data.next.resourceURI;
        nextEventUrl = changeUrl(nextEventUrl, 's', 4);
        nextEventUrl = changeUrl(nextEventUrl, ':443', 26);
        nextEventUrl += `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

        this.fetch("nextEvent", nextEventUrl);

        const scrollElement = document.querySelector('.navigation');
        scrollElement.scrollIntoView();

        this.setState({
            previousContent: this.contentNames.length - 1
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.location.reload();
        }
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
            case 'comics': return this.comics();
            case 'other info': return this.otherInfo(); 
            default: return null;
        }
    }

    displayComics = () => {
        const results = this.state.comicsData[0].results;
        const comics = results.map(comic => {
        const index = comic.thumbnail.path.indexOf('image_not_available');
        return <Comic id={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension} data={comic} key={comic.id}/>;
        });
        this.setState({
            comics,
            isLoaded: true
        })
    }

    displaySeries = () => {
        const results = this.state.seriesData[0].results;
        const series = results.map(series => {
        const index = 1;
        return <Series id={series.id} title={series.title} description={series.description} img={index === (-1)? series.thumbnail.path : false} extension={series.thumbnail.extension} data={series} key={series.id}/>
        });
        this.setState({
            series,
        })
    }

    displayCharacters = () => {
        const results = this.state.charactersData[0].results;
        const characters = results.map(character => {
        const index = character.thumbnail.path.indexOf('image_not_available');
        return <Character id={character.id} name={character.name} description={character.description} img={index === (-1)? character.thumbnail.path : false} extension={character.thumbnail.extension} data={character} key={character.id}/>
        });
        this.setState({
            characters,
        })
    }

    displayCreators = () => {
        const results = this.state.creatorsData[0].results;
        const creators = results.map(creator => {
        const index = creator.thumbnail.path.indexOf('image_not_available');
        return <Creator id={creator.id} name={creator.fullName} img={index === (-1)? creator.thumbnail.path : false} extension={creator.thumbnail.extension} data={creator} key={creator.id}/>;
        });
        this.setState({
            creators,
        })
    }

    comics = () => (<>
    {this.state.comics}
    <hr className="single-event__break"/>
    {<Link to={{
         pathname: `/comics`, 
        state: {data: this.data.id, from: 'events'}}} 
         className="button button--brd">
         <Button text="See all comics"/>
     </Link>}
    </>);

    characters = () => (<>
    {this.state.characters}
    <hr className="single-event__break"/>
    {<Link to={{
         pathname: `/characters`, 
        state: {data: this.data.id, from: 'events'}}} 
         className="button button--brd">
         <Button text="See all characters"/>
     </Link>}
    </>);

    creators = () => (<>
    {this.state.creators}
    <hr className="single-event__break"/>
    {<Link to={{
         pathname: `/creators`, 
         state: {data: this.data.id, from: 'events'}}} 
         className="button button--brd">
         <Button text="See all creators"/>
     </Link>}
    </>);

    series = () => (<>
    {this.state.series}
    <hr className="single-event__break"/>
    {<Link to={{
         pathname: `/series`, 
        state: {data: this.data.id, from: 'events'}}} 
         className="button button--brd">
         <Button text="See all series"/>
     </Link>}
    </>);
    
    otherInfo = () => {
    const {id: nextID, title: nextTitle, description: nextDescription, thumbnail: nextThumbnail} = this.state.nextEventData[0];
    const {id: prevID, title: prevTitle, description: prevDescription, thumbnail: prevThumbnail} = this.state.prevEventData[0];
    const index = this.state.nextEventData[0].thumbnail.path.indexOf('image_not_available');
    const followingEvent = <Event id={nextID} title={nextTitle} description={nextDescription} img={index === (-1)? nextThumbnail.path : false} extension={nextThumbnail.extension} data={this.state.nextEventData[0]} key={nextID}/>;
    const previousEvent = <Event id={prevID} title={prevTitle} description={prevDescription} img={index === (-1)? prevThumbnail.path : false} extension={prevThumbnail.extension} data={this.state.prevEventData[0]} key={prevID}/>;
    
    return (
     <div className="single-event__other">
        <div className="single-event__dates">
            <h2 className="single-event__title">Publication dates</h2>
            <p className="single-event__info">First issue: {this.startDate}</p>
            <p className="single-event__info">Last issue: {this.endDate}</p>
         </div>
         <div className="single-event__other--margin">
            <h2 className="single-event__title">Explore other events</h2>
            <p className="single-event__title--sub">Following event</p>
                {followingEvent}
            <p className="single-event__title--sub">Previous event</p>
                {previousEvent}
         </div>
    </div>
        )
    }

    render() {
        const {title, description} = this.data;
        return(
            <div className="single-event">
                <h1 className=" single-event__title single-event__title--main">{title}</h1>
                <p className="single-event__description">{description}</p>
                <div className="single-event__panel panel">
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--left" onClick={() => this.manageContent('prev')} />
                    </div>
                    <h1 className="panel__title">{this.contentNames[this.state.currentContent]}</h1>
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--right" onClick={() => this.manageContent('next')} />
                    </div>
                </div>
                {this.state.isLoaded? <>{this.displayContent()}</> : <Loader/>}
            </div>
        )
    }
}

export default SingleEvent;