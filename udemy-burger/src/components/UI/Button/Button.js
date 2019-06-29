import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
        type={props.type || 'button'}
        onClick={props.click}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnClass]].join(' ')}>
        {props.children}
    </button>
);

export default button;
