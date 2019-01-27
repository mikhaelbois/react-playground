import React from 'react';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <button
        type="button"
        onClick={props.click}
        title="Menu"
        className={classes.DrawerToggle}>
        <div>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </button>
);

export default drawerToggle;
