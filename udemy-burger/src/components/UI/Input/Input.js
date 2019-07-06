import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} id={props.id} value={props.value} onChange={props.changed} />

            break;
        case ('textarea'):
            inputElement = (
                <textarea {...props.elementConfig} className={inputClasses.join(' ')} id={props.id} onChange={props.changed}>
                    {props.value}
                </textarea>
            )

            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} id={props.id} onChange={props.changed}>
                    <option value=''>
                        ---Select an option---
                    </option>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )

            break;
        default:
            inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} id={props.id} value={props.value} onChange={props.changed} />
            break;
    }

    return (
        <div className={classes.Input}>
            <label htmlFor={props.id}>{props.elementConfig.placeholder}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;
