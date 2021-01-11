import React, {Component} from "react";
import Comic from "../components/Comic";

class ComicsList extends Component {
    
    state = {
        resultsnumber: 0,
        results: [],
        gowno: null,
    };

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    url = `https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;
    fetchError = false;
    apiData = null;

    componentDidMount() {
        fetch(this.url)
        .then(response => {
            if(response.ok) return response.json();
            else this.fetchError = true;
          })
          .then(result => {this.apiData = result.data; this.manageData()})
          .catch(error => this.fetchError = error)
    }

    // componentDidUpdate() {
    //     console.log(this.state.results);
    //     const results = this.state.results;
    //     this.comics = results.map(comic => <Comic key={comic.id} img={comic.thumbnail.path} title={comic.title} description={comic.description}/>);
    // }

    manageData = () => {
        if(!this.fetchError) {
            const results = this.apiData.results;
            const resultsnumber = this.apiData.total;

            this.setState({
                results,
                resultsnumber,
            })
        }
        this.displayComics();
    }

    displayComics = () => {
        const results = this.state.results;
        console.log(results);
        const comics = results.map(comic => {
        const index = comic.thumbnail.path.indexOf('image_not_available');
        return <Comic key={comic.id} title={comic.title} description={comic.description} img={index === (-1)? comic.thumbnail.path : false} extension={comic.thumbnail.extension}/>
        });
        this.setState({
            comics,
        })
    }

    render() {
        return(
            <div className="comics-list">
                <h1 className="comics-list__title">List of comics</h1>
                <form className="comics-list__form form">
                    <p className="form__title">Title starts with:</p>
                    {/* {letters} */}
                    <p className="form__title">Filter by:</p>
                    <label for="format" className="form__label">Format:</label>
                    <input type="text" id="format" name="format" className="form__input"/>
                    <label for="releaseyear" className="form__label">Initial release year:</label>
                    <input type="text" id="releaseyear" name="releaseyear" className="form__input"/>
                    <label for="digitalissue" className="form__label">Digital issue:</label>
                    <input type="text" id="digitalissue" name="digitalissue" className="form__input"/>
                    <label for="issuenumber" className="form__label">Issue number:</label>
                    <input type="text" id="issuenumber" name="issuenumber" className="form__input"/>

                    <p className="form__title">Search by:</p>
                    <label for="title" className="form__label">Title:</label>
                    <input type="text" id="title" name="title" className="form__input"/>
                    <label for="characters" className="form__label">Characters:</label>
                    <input type="text" id="characters" name="characters" className="form__input"/>
                    <label for="creators" className="form__label">Creators:</label>
                    <input type="text" id="creators" name="creators" className="form__input"/>

                    <p className="form__title">Other options:</p>
                    <label for="order" className="form__label">Order by:</label>
                    <input type="text" id="order" name="order" className="form__input"/>
                    <label for="results" className="form__label">Number of results:</label>
                    <input type="text" id="results" name="results" className="form__input"/>

                    <button className="form__button">Save</button>
                </form>
                <div className="comics-list__results results">
                    <h1 className="results__title">Number of results: {this.state.resultsnumber}</h1>
                    {this.state.comics}
                </div>
            </div>
        )
    }
}

export default ComicsList;