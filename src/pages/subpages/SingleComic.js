import React, {Component} from 'react';
import changeUrl from "../../functions/changeUrl";
import convertDate from "../../functions/convertDate";
import Button from "../../components/Button";

class SingleComic extends Component {
    state = {
        currentFetch: null,
        currentContent: null,
        previousContent: null,
        nextContent: null
    }

    data = this.props.location.state.data;
    charactersResults = [];
    

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

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    fetchError = false;

    fetchCharactersData = (url) =>
    {
       fetch(url)
        .then(response => {
            if(response.ok) return response.json();
            else this.fetchError = true;
        })
        .then(result => this.setState({currentFetch: result.data.results[0]}))
        .catch(error => this.fetchError = error)
    }
    
    componentDidMount() {
       const charactersUrls = this.data.characters.items.map(character => {
            let url = changeUrl(character.resourceURI, 's', 4);
            url = changeUrl(url, ':443', 26);
            return url + `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        });

        charactersUrls.forEach(url => {
           this.fetchCharactersData(url);
        });
    }


    componentDidUpdate() {
        this.charactersResults.push(this.state.currentFetch);

        // CHARACTER MISSING !!!!!!!!!!!!!!!!!!!!!!!!!!1

        this.characters = (
            <div className="single-comic__content">
                <h1 className="single-comic__title">Characters</h1>
                {console.log(this.charactersResults)}
                {this.charactersResults.map(result => {
                    const imgPath = `${result.thumbnail.path}/standard_amazing.${result.thumbnail.extension}`;
                    const titleIndex = result.name.indexOf('(');
                    const name = result.name.slice(0, titleIndex);
                return (
                    <div className="single-comic__character">
                        <h1 className="single-comic__character-name">{titleIndex > -1? name : result.name}</h1>
                        <img className="single-comic__image" src={imgPath} alt="character"/>
                        {/* <Button /> */}
                    </div>
                )
                })}
            </div>
        )
    }

    series = (
        <div className="single-comic__content">
            <h1 className="single-comic__title">Series</h1>
            <h2 className="single-comic__title">{this.data.series.name}</h2>
            {/* DESCRIPTION!!!!!!1 */}
            <Button nameOfClass="button button--brd"/>
        </div>
    )

    otherInfo = (
        <div className="single-comic__content">
            <h1 className="single-comic__title">Other info</h1>
            <p className="single-comic__description">Dates of sales and prices</p>
            <p className="single-comic__description">Print: {this.printDate} (&#36;{this.printPrice})</p>
            <p className="single-comic__description">Digital: {this.digitalDate} (&#36;{this.digitalPrice})</p>

            {/* DESCRIPTION!!!!!!!!!!!!!1 */}
            <Button />
        </div>
    )

    render() {
        const {title, description} = this.data;
        console.log(this.charactersResults);
        console.log(this.data);
        return(
            <div className="single-comic">
                <h1 className="single-comic__title">{title}</h1>
                <p className="single-comic__description">{description}</p>
                {this.series}
            </div>
        )
    }
}

export default SingleComic;