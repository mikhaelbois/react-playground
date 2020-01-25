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
        { props.isAuth ? <NavItem url="/orders" exact={true}>Orders</NavItem> : null }
        {
            props.isAuth
            ?
                <NavItem
                    url="/logout"
                    exact={true}
                >
                    Log Out
                </NavItem>
            :
                <NavItem
                    url="/auth"
                    exact={true}
                >
                    Authenticate
            </NavItem>
        }
    </ul>
);

export default navItems;
