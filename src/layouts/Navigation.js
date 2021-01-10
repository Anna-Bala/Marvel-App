import React from 'react';
import { NavLink } from "react-router-dom";

const items = [
    {name: 'start', path: '/', exact: true},
    {name: 'comics', path: '/comics'},
    {name: 'characters', path: '/characters'},
    {name: 'creators', path: '/creators'},
    {name: 'series', path: '/series'},
    {name: 'events', path: '/events'},
]

const Navigation = () => {
    const nav = items.map(item => (
        <li key={item.name} className="navigation__item">
            <NavLink to={item.path} exact={item.exact ? item.exact : false} className="navigation__link">{item.name}</NavLink>
        </li>
    ))
    return (
        <div className="navigation">
            <ul className="navigation__list">
                {nav}
            </ul>
        </div>
    )
}

export default Navigation;