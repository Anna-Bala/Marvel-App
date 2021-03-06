import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';

class Series extends Component {
    state = {
        display: false,
    }

    imgPath = this.props.img + '/portrait_incredible.' + this.props.extension;

    styles = {
        withBackground: {backgroundImage: `url(${this.imgPath})`},
        withoutBackground: {backgroundColor: `rgba(255, 255, 255, 0.1)`, height: '30vh'},
    }

    /*DESCRIPTION FROM textOBJECT!!!!!!!!!!*/

    content = {
        
        withCover: (
            <>
                <h1 className="series__title">{this.props.title}</h1>
                <p className="series__description">{this.props.description}</p>
                <Link to={{
                    pathname: `/series/${this.props.id}`, 
                    state: {data: this.props.data}}} 
                    className="button">
                        <Button />
                </Link>
            </>
        ),
        withoutCover: (
            <>
                <h1 className="series__title">{this.props.title}</h1>
                <Link to={`/series/${this.props.id}`} className="button"><Button /></Link>
            </>
        )
    }
    
    changingDisplay = () => {
        this.setState({display: !this.state.display});
        if(this.state.display === false) this.styles.withBackground = {animationName: 'fadeIn'};
        else this.styles.withBackground = {backgroundImage: `url(${this.imgPath})`};
    }
    
    
    render() {
        const {img, id} = this.props;
        const {withBackground, withoutBackground} = this.styles;
        const {withCover, withoutCover} = this.content;
        return(
        <div className="results__series series" 
        key={id}
        style={img === false? withoutBackground : withBackground} 
        onClick={img === false? null : () => this.changingDisplay()}
        >
            {!img? withoutCover : null}
            {this.state.display? withCover : null}
        </div>
        );
    }
}

export default Series;