import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

const items = [
    {name: 'start', path: '/', exact: true},
    {name: 'comics', path: '/comics'},
    {name: 'characters', path: '/characters'},
    {name: 'creators', path: '/creators'},
    {name: 'series', path: '/series'},
    {name: 'events', path: '/events'},
];

class Navigation extends Component {

    componentDidMount() {
        const icon = document.getElementsByClassName('navigation__icon');
        const navPanel = document.getElementsByClassName('navigation__list');
        const mainContent = document.getElementsByClassName('main');
        icon[0].addEventListener("click", () => {
            icon[0].classList.toggle('navigation__icon--open');
            navPanel[0].classList.toggle('navigation__list--open');
            const mainMarginTop = window.getComputedStyle(mainContent[0]).getPropertyValue('margin-top');
            if(mainMarginTop === '60px') mainContent[0].style.marginTop = '5px';
            else if (mainMarginTop === '5px') mainContent[0].style.marginTop = '60px';
        });
    }

    nav = items.map(item => (
        <li key={item.name} className="navigation__item">
            <NavLink to={item.path} exact={item.exact ? item.exact : false} className="navigation__link">{item.name}</NavLink>
        </li>
    ))
    render() {
        return (
            <div className="navigation">
                <div className="navigation__icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className="navigation__list">
                    {this.nav}
                </ul>
            </div>
        )
    }
}

export default Navigation;