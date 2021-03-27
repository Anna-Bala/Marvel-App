import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';
import {decode} from 'html-entities';
import fixText from "../functions/fixText";

class Series extends Component {
    state = {
        display: false,
    }

    imgPath = this.props.img + '/portrait_incredible.' + this.props.extension;

    styles = {
        withBackground: {backgroundImage: `url(${this.imgPath})`},
        withoutBackground: {backgroundColor: `rgba(255, 255, 255, 0.1)`, height: '30vh'},
    }

    description = decode(`${this.props.description}`, {level: 'html5', mode: 'specialChars'});

    content = {
        
        withCover: (
            <>
                <h1 className="series__title">{this.props.title}</h1>
                <p className="series__description">{this.description === 'null'? '' : fixText(this.description, 25, true)}</p>
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
                <Link to={{
                    pathname: `/series/${this.props.id}`, 
                    state: {data: this.props.data}}} 
                    className="button">
                        <Button />
                </Link>
            </>
        )
    }
    
    changingDisplay = (e) => {
        let target = e.target;
        if(e.target.classList[0] === 'results__series') target = e.target;
        this.setState({display: !this.state.display});
        const stateDisplayFalse = {animationName: 'fadeIn', backgroundColor: 'transparent', filter: 'grayscale(0%)'};
        const stateDisplayTrue = {backgroundImage: `url(${this.imgPath})`, animationName: 'fadeOut'};
        if(this.state.display === false) {this.styles.withBackground = stateDisplayFalse; target.classList.remove('series--hover')}
        else {this.styles.withBackground = stateDisplayTrue; target.classList.add('series--hover')}
    }
    
    
    render() {
        const {img, id} = this.props;
        const {withBackground, withoutBackground} = this.styles;
        const {withCover, withoutCover} = this.content;
        let className = 'results__series series'; 
        if(img !== false) className += ' series--hover';
        return(
        <div className={className} 
        key={id}
        style={img === false? withoutBackground : withBackground} 
        onClick={img === false? null : (e) => this.changingDisplay(e)}
        >
            {!img? withoutCover : null}
            {this.state.display? withCover : null}
        </div>
        );
    }
}

export default Series;