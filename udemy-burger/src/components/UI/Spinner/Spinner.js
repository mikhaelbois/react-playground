import React from 'react';
import classes from './Spinner.css';

const spinner = (props) => (
    /* https://loading.io/css/ */
    <div className={classes.Spinner} title="Loading">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
);

export default spinner;
