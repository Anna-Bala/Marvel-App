import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Creator extends Component {
    state = {
        display: false,
    }
    
    render() {
        return(
            <>
            <Link to={{
                    pathname: `/creators/${this.props.id}`, 
                    state: {data: this.props.data}}}>
                <div className="results__creator creator" 
                key={this.props.id}>
                    <h1 className="creator__name">{this.props.name}</h1>
                    
                </div>
                </Link>
            </>
        );
    }
}

export default Creator;