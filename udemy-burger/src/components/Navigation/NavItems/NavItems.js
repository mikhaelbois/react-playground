import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
    <ul className={classes.NavItems}>
        <NavItem
            url="/"
            exact={true}
        >
            Burger Builder
        </NavItem>
        <NavItem
            url="/checkout"
            // exact={true}
        >
            Checkout
        </NavItem>
        <NavItem
            url="/orders"
            exact={true}
        >
            Orders
        </NavItem>
    </ul>
);

export default navItems;
