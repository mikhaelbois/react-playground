import React from 'react';
import classes from './Person.css';

const person = (props) => {

    throw new Error('Ooops, something went wrong!');

    return (
        <div className={classes.Person} onClick={props.click}>
            <h3>I'm {props.name} and I wish I was {props.age} years old again!</h3>
            {props.children}
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
}

export default person;
