import React, {Component} from "react";
import changeUrl from "../../functions/changeUrl";
import fetchData from "../../functions/fetchData";

class SingleCharacter extends Component {
    state = {
        comicsData: [],
    }

    apiKey = '9b9a40427eb372f72b3775e4f456a370';
    data = this.props.location.state.data;

    componentDidMount() {
        // NOT WORKING!!!!!
        // let comicsUrls = this.data.comics.collectionURI;
        // comicsUrls = changeUrl(comicsUrls, 's', 4);
        // comicsUrls = changeUrl(comicsUrls, ':443', 26);
        // comicsUrls += `?ts=1&apikey=${this.apiKey}&hash=97a77a62ca6b19c0c250ad87841df189`;

        // comicsUrls = new Array(comicsUrls);

        // console.log(comicsUrls);

        // comicsUrls.forEach(url => {
        //     const fetch = async () => {
        //         const result = await fetchData(url);
        //         console.log(result);
        //         this.setState(prevState => ({comicsData: [...prevState.comicsData, result]}));
        //     }

        //     fetch();
        // });

        /////////////////////
    }

    render() {
        console.log(this.data);
        const {name, description} = this.data;
        const nameIndex = name.indexOf('(');
        const shortName = name.slice(0, nameIndex);
        const characterImg = this.data.thumbnail.path + '/portrait_incredible.' + this.data.thumbnail.extension;
        return (
            <div className="single-character">
                <h1 className="single-character__name">{name}</h1>
                <p className="single-character__name">{description}</p>
                <img src={characterImg} alt="character" className="single-character__character-img"/>
                <h2  className="single-character__subtitle">Appearances of {shortName}</h2>
                <div className="single-character__comics-list">

                </div>
            </div>
        )
    }
}

export default SingleCharacter;