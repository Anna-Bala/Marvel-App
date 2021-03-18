import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';

class Character extends Component {
    state = {
        display: false,
    }

    imgPath = this.props.img + '/portrait_incredible.' + this.props.extension;

    styles = {
        withBackground: {backgroundImage: `url(${this.imgPath})`},
        withoutBackground: {backgroundColor: `rgba(255, 255, 255, 0.05)`, height: '30vh', cursor: 'default'},
    }

    content = {
        withCover: (
            <>
            <h1 className="character__name">{this.props.name}</h1>
                <p className="character__description">{this.props.description}</p>
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
        console.log(e);
        const nameLabel = e.target.childNodes[0];
        let isDiv = true;
        e.target.classList.forEach(item => {
            if(item === 'button') isDiv = false;
        });

        console.log(isDiv);
        if(this.state.display === false && isDiv) {
            this.styles.withBackground = {animationName: 'fadeIn', backgroundColor: 'transparent', filter: 'grayscale(0%)'}
            nameLabel.style.display = 'none';
        }
        else if (isDiv)  {
            this.styles.withBackground = {backgroundImage: `url(${this.imgPath})`, animationName: 'fadeOut'}
            nameLabel.style.display = 'block';
        };
    }
    
    
    render() {
        const {img, id} = this.props;
        const {withBackground, withoutBackground} = this.styles;
        const {withCover, withoutCover} = this.content;
        console.log(this.props.data);
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