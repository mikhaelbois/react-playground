import React from 'react';
import classes from './Logo.css';

import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <figure className={classes.Logo}>
        <img src={burgerLogo} alt="Udemy React - Burger" title="Udemy React - Burger" />
    </figure>
);

export default logo;
