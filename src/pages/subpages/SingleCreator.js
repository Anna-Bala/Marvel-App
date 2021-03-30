import React, {Component} from "react";
import Comic from "../../components/Comic";
import Series from "../../components/Series";
import Event from "../../components/Event";
import changeUrl from "../../functions/changeUrl";
import fetchData from "../../functions/fetchData";
import prevContent from "../../functions/prevContent";
import followingContent from "../../functions/followingContent";
import {Link} from 'react-router-dom';
import Button  from '../../components/Button';
import arrow from "../../img/arrow.png";

class SingleCreator extends Component {
    state = {
        comicsData: [],
        seriesData: [],
        eventsData: [],
        prevEventData: [],
        nextEventData: [],
        comics: null,
        series: null,
        events: null,
        currentContent: 0,
        previousContent: null,
        nextContent: 1,
    }

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    data = this.props.location.state.data;
    contentNames = ['comics', 'series', 'events'];

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
        else if(what === 'events') {
            this.setState(prevState => ({eventsData: [...prevState.eventsData, result]}));
            this.displayEvents();
        }
    }

    componentDidMount() {
        console.log(this.data);
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


        let  eventsUrls = this.data.events.collectionURI;
        eventsUrls = changeUrl(eventsUrls, 's', 4);
        eventsUrls = changeUrl(eventsUrls, ':443', 26);
        eventsUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=startDate&hash=97a77a62ca6b19c0c250ad87841df189`;

        eventsUrls = new Array(eventsUrls);

        eventsUrls.forEach(url => {
            this.fetch("events", url);
        });

        const scrollElement = document.querySelector('.navigation');
        scrollElement.scrollIntoView();

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
            case 'series': return this.series();
            case 'comics': return this.comics();
            case 'events': return this.events(); 
            default: return null;
        }
    }

    displayComics = () => {
        const results = this.state.comicsData[0].results;
        const comics = results.map(comic => {
        const index = comic.thumbnail.path.indexOf('image_not_available');
        return <Comic id={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension} data={comic}/>;
        });
        this.setState({
            comics,
        })
    }

    displaySeries = () => {
        const results = this.state.seriesData[0].results;
        const series = results.map(series => {
        const index = 1;
        return <Series id={series.id} title={series.title} description={series.description} img={index === (-1)? series.thumbnail.path : false} extension={series.thumbnail.extension} data={series}/>
        });
        this.setState({
            series,
        })
    }

    displayEvents = () => {
        const results = this.state.eventsData[0].results;
        const events = results.map(event => {
        const index = event.thumbnail.path.indexOf('image_not_available');
        return <Event id={event.id} title={event.title} description={event.description} img={index === (-1)? event.thumbnail.path : false} extension={event.thumbnail.extension} data={event}/>
        });
        this.setState({
            events,
        })
    }

    comics = () => (<>
    {this.state.comics}
    <hr className="single-creator__break"/>
    {<Link to={{
         pathname: `/comics`, 
        state: {data: this.data.id, from: 'creators'}}} 
         className="button button--brd">
         <Button text="See all comics"/>
     </Link>}
    </>);

    series = () => (<>
    {this.state.series}
    <hr className="single-creator__break"/>
    {<Link to={{
         pathname: `/series`, 
        state: {data: this.data.id, from: 'creators'}}} 
         className="button button--brd">
         <Button text="See all series"/>
     </Link>}
    </>);

    events = () => (<>
    {this.state.events}
    <hr className="single-creator__break"/>
    {<Link to={{
         pathname: `/events`, 
        state: {data: this.data.id, from: 'creators'}}} 
         className="button button--brd">
         <Button text="See all events"/>
     </Link>}
    </>);

    render() {
        const {fullName} = this.data;
        return(
            <div className="single-creator">
                <h1 className="single-creator__name">{fullName}</h1>
                <div className="single-creator__panel panel">
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--left" onClick={() => this.manageContent('prev')} />
                    </div>
                    <h1 className="panel__title">{this.contentNames[this.state.currentContent]}</h1>
                    <div className="panel__button-container">
                        <img src={arrow} alt="arrow" className="panel__button panel__button--right" onClick={() => this.manageContent('next')} />
                    </div>
                </div>
                {this.displayContent()}
            </div>
        )
    }
}

export default SingleCreator;