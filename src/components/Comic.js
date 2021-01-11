import React, {Component} from 'react';

class Comic extends Component {
    state = {
        display: false,
    }

    imgPath = this.props.img + '/portrait_incredible.' + this.props.extension;
    
    render() {
        
        console.log(this.state.display);
        return(
        <div className="results__comic comic" key={this.props.key} style={{backgroundImage: `url(${this.imgPath})`}} onClick={() => this.setState({display: !this.state.display})}>
            {this.state.display? (
                <>
                    <h1 className="comic__title">{this.props.title}</h1>
                    <p className="comic__description">{this.props.description}</p>
                </>
            ) : null}
        </div>
        );
    }
}

export default Comic;