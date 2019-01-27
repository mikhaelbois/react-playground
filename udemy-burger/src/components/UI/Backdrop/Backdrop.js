import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => {
    let assignedClasses = [classes.Backdrop, classes[props.addClass]];

    return (
        props.show ? <div className={assignedClasses.join(' ')} style={{opacity: props.show ? '1' : '0'}} onClick={props.remove}></div> : null
    )
};

export default backdrop;
