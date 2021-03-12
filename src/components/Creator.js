import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Button  from './Button';

class Creator extends Component {
    state = {
        display: false,
    }


    /*DESCRIPTION FROM textOBJECT!!!!!!!!!!*/
    
    
    render() {
        return(
            <>
                <div className="results__creator creator" 
                key={this.props.id}>
                    <h1 className="creator__name">{this.props.name}</h1>
                    <Link to={`/creators/${this.props.id}`} className="button"><Button /></Link>
                </div>
            </>
        );
    }
}

export default Creator;