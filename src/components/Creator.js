import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Creator extends Component {
    state = {
        display: false,
    }


    /*DESCRIPTION FROM textOBJECT!!!!!!!!!!*/
    
    
    render() {
        return(
            <>
            <Link to={`/creators/${this.props.id}`}>
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