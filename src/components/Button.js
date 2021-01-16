import React from 'react';

const Button = (props) => {
    return <button className={props.nameOfClass? props.nameOfClass : "button"}>Learn more...</button>
}

export default Button;