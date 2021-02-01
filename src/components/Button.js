import React from 'react';

const Button = (props) => {
    console.log(props.text);
    let content = '';
    if(props.text !== undefined) content = props.text;
    else content = "Learn more...";
    return <button className={props.nameOfClass? props.nameOfClass : "button"}>{content}</button>
}

export default Button;