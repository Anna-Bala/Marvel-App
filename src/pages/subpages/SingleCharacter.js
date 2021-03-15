import React, {Component} from "react";
import Comic from "../../components/Comic";
import Series from "../../components/Series";
import Event from "../../components/Event";
import changeUrl from "../../functions/changeUrl";
import fetchData from "../../functions/fetchData";
import {Link} from 'react-router-dom';
import Button  from '../../components/Button';

class SingleCharacter extends Component {
    state = {
        comicsData: [],
        seriesData: [],
        eventsData: [],
        comics: null,
        series: null,
        events : null,
    }

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    data = this.props.location.state.data;

    fetch = async (what, url) => {

        const result = await fetchData(url);
        console.log(result);
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
        let comicsUrls = this.data.comics.collectionURI;
        comicsUrls = changeUrl(comicsUrls, 's', 4);
        comicsUrls = changeUrl(comicsUrls, ':443', 26);
        comicsUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=issueNumber&hash=97a77a62ca6b19c0c250ad87841df189`;

        comicsUrls = new Array(comicsUrls);

        console.log(comicsUrls);

        comicsUrls.forEach(url => {
            this.fetch("comics", url);
        });

        let seriesUrls = this.data.series.collectionURI;
        seriesUrls = changeUrl(seriesUrls, 's', 4);
        seriesUrls = changeUrl(seriesUrls, ':443', 26);
        seriesUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=title&hash=97a77a62ca6b19c0c250ad87841df189`;

        seriesUrls = new Array(seriesUrls);

        console.log(seriesUrls);

        seriesUrls.forEach(url => {
            this.fetch("series", url);
        });

        let eventsUrls = this.data.events.collectionURI;
        eventsUrls = changeUrl(eventsUrls, 's', 4);
        eventsUrls = changeUrl(eventsUrls, ':443', 26);
        eventsUrls += `?ts=1&apikey=${this.apiKey}&limit=6&orderBy=name&hash=97a77a62ca6b19c0c250ad87841df189`;

        eventsUrls = new Array(eventsUrls);

        console.log(eventsUrls);

        eventsUrls.forEach(url => {
            this.fetch("events", url);
        });
    }

    displayComics = () => {
        const results = this.state.comicsData[0].results;
        console.log(results);
        const comics = results.map(comic => {
        const index = comic.thumbnail.path.indexOf('image_not_available');
        return <Comic id={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension} data={comic}/>
        });
        this.setState({
            comics,
        })
    }

    displaySeries = () => {
        const results = this.state.seriesData[0].results;
        console.log(results);
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
        console.log(results);
        const events = results.map(event => {
        const index = event.thumbnail.path.indexOf('image_not_available');
        return <Event id={event.id} title={event.title} description={event.description} img={index === (-1)? event.thumbnail.path : false} extension={event.thumbnail.extension} data={event}/>
        });
        this.setState({
            events,
        })
    }

    render() {
        const {name, description, comics, series, events} = this.data;
        console.log(this.props.location.state.data);
        const nameIndex = name.indexOf('(');
        let shortName = '';
        if(nameIndex > -1) shortName = name.slice(0, nameIndex);
        else shortName = name;
        const characterImg = this.data.thumbnail.path + '/portrait_incredible.' + this.data.thumbnail.extension;
        return (
            <div className="single-character">
                <h1 className="single-character__name">{name}</h1>
                <p className="single-character__description">{description}</p>
                <img src={characterImg} alt="character" className="single-character__character-img"/>
                <h2  className="single-character__title">Appearances of {shortName}</h2>
                <div className="single-character__comics">
                <h2  className="single-character__subtitle">Comics</h2>
                    {comics.items.length === 0? <p className="single-character__description">There are no appearances of this character in comics</p> : <>
                     {this.state.comics}
                     <Link to={{
                    pathname: `/comics`, 
                    state: {data: this.data.id, from: 'characters'}}} 
                    className="button">
                        <Button text="See all comics"/>
                    </Link>
                    </>
                    }
                </div>
                <div className="single-character__series">
                <h2  className="single-character__subtitle">Series</h2>
                    {series.items.length === 0? <p className="single-character__description">There are no appearances of this character in series</p> : <>
                     {this.state.series}
                     <Link to={{
                    pathname: `/series`, 
                    state: {data: this.data.id}}} 
                    className="button">
                        <Button text="See all series"/>
                    </Link>
                    </>
                    }
                </div>
                <div className="single-character__events">
                <h2  className="single-character__subtitle">Events</h2>
                    {events.items.length === 0? <p className="single-character__description">There are no appearances of this character in events</p> : <>
                     {this.state.events}
                     {<Link to={{
                        pathname: `/events`, 
                        state: {data: this.data.id, from: 'characters'}}} 
                        className="button">
                        <Button text="See all events"/>
                    </Link>}
                    </>
                    }
                </div>
            </div>
        )
    }
}

export default SingleCharacter;