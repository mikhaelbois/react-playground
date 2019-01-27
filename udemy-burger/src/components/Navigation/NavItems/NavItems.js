import React from 'react';
import classes from './NavItems.css';

import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem
            url="/"
            active
        >
            Burger Builder
        </NavItem>
        <NavItem
            url="/"
        >
            Checkout
        </NavItem>
    </ul>
);

export default navItems;
