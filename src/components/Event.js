import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';
import {decode} from 'html-entities';
import cutText from "../functions/cutText";

class Event extends Component {   
    state = {
        display: false,
    }

    imgPath = this.props.img + '/standard_fantastic.' + this.props.extension;

    styles = {
        withBackground: {backgroundImage: `url(${this.imgPath})`},
        withoutBackground: {backgroundColor: `rgba(255, 255, 255, 0.1)`, height: '30vh'},
    }

    currentData = this.props.data;

    description = decode(`${this.props.description}`, {level: 'html5', mode: 'specialChars'});

    content = {
        withCover: (
            <>
                <h1 className="event__title">{this.props.title}</h1>
                <p className="event__description">{this.description === 'null'? '' : cutText(this.description, 25)}</p>
                <Link to={{
                    pathname: `/events/${this.props.id}`, 
                    state: {data: this.props.data}}} 
                    className="button">
                        <Button />
                </Link>
            </>
        ),
        withoutCover: (
            <>
                <h1 className="event__title">{this.props.title}</h1>
                <Link to={`/events/${this.props.id}`} className="button"><Button /></Link>
            </>
        )
    }
    
    changingDisplay = () => {
        this.setState({display: !this.state.display});
        if(this.state.display === false) this.styles.withBackground = {animationName: 'fadeIn', backgroundColor: 'transparent', filter: 'grayscale(0%)'};
        else this.styles.withBackground = {backgroundImage: `url(${this.imgPath})`, animationName: 'fadeOut'};
    }

    render() {
        const {img, id} = this.props;
        const {withBackground, withoutBackground} = this.styles;
        const {withCover, withoutCover} = this.content;
        return(
        <div className="results__event event" 
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

export default Event;