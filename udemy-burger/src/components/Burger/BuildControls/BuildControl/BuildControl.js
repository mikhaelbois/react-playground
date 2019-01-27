import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button
                type="button"
                className={classes.Less}
                onClick={props.less}
                disabled={props.disabled}>
                Less
            </button>
            <button
                type="button"
                className={classes.More}
                onClick={props.more}>
                More
            </button>
        </div>
    );
};

export default buildControl;
