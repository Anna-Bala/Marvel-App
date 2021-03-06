import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';

class Creator extends Component {
    state = {
        display: false,
    }

    imgPath = this.props.img + '/standard_fantastic.' + this.props.extension;
    styles = {
        withBackground: {backgroundImage: `url(${this.imgPath})`},
        withoutBackground: {backgroundColor: `rgba(255, 255, 255, 0.1)`},
    }


    /*DESCRIPTION FROM textOBJECT!!!!!!!!!!*/

    content = {
        withCover: (
            <>
                <Link to={{
                pathname: `/creators/${this.props.id}`, 
                state: {data: this.props.data}}} 
                className="results__creator creator creator--link"
                style={this.props.img === false? this.styles.withoutBackground : this.styles.withBackground}
                key={this.props.id}>

                    <h1 className="creator__name-label">{this.props.name}</h1>
                </Link>     
            </>
        ),
        withoutCover: (
            <>
                <div className="results__creator creator creator--nocover" 
                key={this.props.id}
                style={this.props.img === false? this.styles.withoutBackground : this.styles.withBackground}>
                    <h1 className="creator__name">{this.props.name}</h1>
                    <Link to={`/creators/${this.props.id}`} className="button"><Button /></Link>
                </div>
            </>
        )
    }
    
    // changingDisplay = () => {
    //     this.setState({display: !this.state.display});
    //     if(this.state.display === false) this.styles.withBackground = {animationName: 'fadeIn'};
    //     else this.styles.withBackground = {backgroundImage: `url(${this.imgPath})`};
    // }
    
    
    render() {
        const {img} = this.props;
        const {withCover, withoutCover} = this.content;
        // return(
        // <div className="results__creator creator" 
        // key={id}
        // style={img === false? withoutBackground : withBackground} 
        // >
        //     {!img? withoutCover : <h1 className="creator__name-label">{this.props.name}</h1>}
        //     {this.state.display? withCover : null}
        // </div>
        // );

        return(
            <>
                {!img? withoutCover : withCover}
            </>
        );
    }
}

export default Creator;