import React from 'react';
import { Link } from 'react-router-dom';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <figure className={classes.Logo}>
        <Link to="/">
            <img src={burgerLogo} alt="Udemy React - Burger" title="Udemy React - Burger" />
        </Link>
    </figure>
);

export default logo;
