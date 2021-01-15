import React, {Component} from 'react';
import changeUrl from "../../functions/changeUrl";
import convertDate from "../../functions/convertDate";
import Button from "../../components/Button";

class SingleComic extends Component {
    state = {
        currentContent: null,
        previousContent: null,
        nextContent: null
    }

    data = this.props.location.state.data;

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

    charactersResults = [];

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    fetchError = false;

    
    componentDidMount() {
       const charactersUrls = this.data.characters.items.map(character => {
            let url = changeUrl(character.resourceURI, 's', 4);
            url = changeUrl(url, ':443', 26);
            return url + `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
        });

      const charactersData = (url) => fetch(url)
        .then(response => {
            if(response.ok) return response.json();
            else this.fetchError = true;
          })
          .then(result => result.data.results)
          .catch(error => this.fetchError = error)

        this.charactersResults = charactersUrls.map(url => {
           const singleCharacterData =  charactersData(url);
        //    console.log(singleCharacterData);
        });
    }

    characters = (
        <div className="single-comic__content">
            <h1 className="single-comic__title">Characters</h1>
            {this.data.characters.items.map(character => {
                return (
                    <div className="single-comic__character">
                        {/* IMAGEEEEE!!!!!! */}
                        <h1 className="single-comic__character-name">{character.name}</h1>
                        <Button />
                    </div>
                )
            })}
        </div>
    )

    series = (
        <div className="single-comic__content">
            <h1 className="single-comic__title">Series</h1>
            <h2 className="single-comic__series-name">{this.data.series.name}</h2>
            {/* DESCRIPTION!!!!!!!!!!!!!1 */}
            <Button/>
        </div>
    )

    otherInfo = (
        <div className="single-comic__content">
            <h1 className="single-comic__title">Other info</h1>
            <p className="single-comic__description">Dates of sales and prices</p>
            <p className="single-comic__description">Print: {this.printDate} (&#36;{this.printPrice})</p>
            <p className="single-comic__description">Digital: {this.digitalDate} (&#36;{this.digitalPrice})</p>

            {/* DESCRIPTION!!!!!!!!!!!!!1 */}
            <Button/>
        </div>
    )

    render() {
        console.log(this.data);
        const {title, description} = this.data;
        return(
            <div className="single-comic">
                <h1 className="single-comic__title">{title}</h1>
                <p className="single-comic__description">{description}</p>
                {this.otherInfo}
            </div>
        )
    }
}

export default SingleComic;