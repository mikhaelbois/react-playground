import React from 'react';
import './Person.css';

// https://www.npmjs.com/package/radium
// import Radium from 'radium';

const style = {
//     '@media (min-width: 960px)': {
//         padding: '1.5em',
//         margin: '1.5em auto 0'
//     }
};


const person = (props) => {
    return (
        <div className="Person" onClick={props.click} style={style}>
            <h3>I'm {props.name} and I wish I was {props.age} years old again!</h3>
            {props.children}
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
}

export default person;
