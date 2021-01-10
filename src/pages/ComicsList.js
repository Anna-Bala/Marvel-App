import React, {Component} from "react";

class ComicsList extends Component {
    state = [

    ]

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
            </div>
        )
    }
}

export default ComicsList;