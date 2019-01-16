import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person" onClick={props.click}>
            <h3>I'm {props.name} and I wish I was {props.age} years old again!</h3>
            {props.children}
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
}

export default person;
