import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';
import {decode} from 'html-entities';
import fixText from "../functions/fixText";

class Character extends Component {
    state = {
        display: false,
    }

    imgPath = this.props.img + '/portrait_incredible.' + this.props.extension;

    styles = {
        withBackground: {backgroundImage: `url(${this.imgPath})`},
        withoutBackground: {backgroundColor: `rgba(255, 255, 255, 0.05)`, height: '30vh', cursor: 'default'},
    }

    description = decode(`${this.props.description}`, {level: 'html5', mode: 'specialChars'});
    
    content = {
        withCover: (
            <>
            <h1 className="character__name">{this.props.name}</h1>
                <p className="character__description">{this.description === 'null'? '' : fixText(this.description, 25, true)}</p>
                <Link to={{
                    pathname: `/characters/${this.props.id}`, 
                    state: {data: this.props.data}}} 
                    className="button">
                        <Button />
                </Link>
            </>
        ),
        withoutCover: (
            <>
                <h1 className="character__name">{this.props.name}</h1>
                <Link to={{
                    pathname: `/characters/${this.props.id}`, 
                    state: {data: this.props.data}}} 
                    className="button">
                        <Button />
                </Link>
            </>
        )
    }
    
    changingDisplay = (e) => {
        this.setState({display: !this.state.display});
        let target = e.target;
        if(e.target.classList[0] === 'results__character') target = e.target;
        const nameLabel = e.target.childNodes[0];
        let isDiv = true;
        e.target.classList.forEach(item => {
            if(item === 'button') isDiv = false;
        });

        const stateDisplayFalse = {animationName: 'fadeIn', backgroundColor: 'transparent', filter: 'grayscale(0%)'};
        const stateDisplayTrue = {backgroundImage: `url(${this.imgPath})`, animationName: 'fadeOut'};

        if(this.state.display === false && isDiv) {
            this.styles.withBackground = stateDisplayFalse;
            nameLabel.style.display = 'none';
            target.classList.remove('character--hover');
        }
        else if (isDiv)  {
            this.styles.withBackground = stateDisplayTrue;
            nameLabel.style.display = 'block';
            target.classList.add('character--hover');
        };
    }
    
    
    render() {
        const {img, id} = this.props;
        const {withBackground, withoutBackground} = this.styles;
        const {withCover, withoutCover} = this.content;
        let className = "results__character character";
        if(img !== false) className += ' character--hover';
        return(
        <div className={className}
        key={id}
        style={img === false? withoutBackground : withBackground} 
        onClick={img === false? null : (e) => this.changingDisplay(e)}
        >
            {!img? withoutCover : <h1 className="character__name-label">{this.props.name}</h1>}
            {this.state.display? withCover : null}
        </div>
        );
    }
}

export default Character;