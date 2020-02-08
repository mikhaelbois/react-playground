import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props => {
    const deefaultControls = {
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    };

    const [controls, setControls] = useState(deefaultControls);
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(true);

    const {
        building,
        authRedirect,
        onSetAuthRedirect,
        onAuth,
        error,
        isAuthenticated,
        loading
    } = props;

    useEffect(() => {
        if (!building && authRedirect !== '/') {
            onSetAuthRedirect();
        }
    }, [building, authRedirect, onSetAuthRedirect]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(
            controls, {
                [controlName]: updateObject(
                    controls[controlName], {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, controls[controlName].validation),
                        touched: true
                    }
                )
            }
        );

        let formIsValid = true;
        for (const inputIdentifier in updatedControls) {
            if (updatedControls.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
        }

        setControls(updatedControls);
        setFormIsValid(formIsValid);
    }

    const authHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (const formElementId in controls) {
            formData[formElementId] = controls[formElementId].value;

            if (!controls[formElementId].valid) {
                return;
            }
        }

        onAuth(formData.email, formData.password, isSignedUp);
    }

    const switchAuthModeHanger = () => {
        setIsSignedUp(!isSignedUp);
    }

    const formElementsArray = [];

    for (const key in controls) {
        if (controls.hasOwnProperty(key)) {
            const element = controls[key];
            formElementsArray.push({
                id: key,
                config: element
            });
        }
    }


    let form = (
        <div style={{ textAlign: 'center' }}>
            <Spinner />
        </div>
    );

    let errorMessage = null;

    if (error) {
        errorMessage = (
            <p style={{ textAlign: 'center', color: 'red' }}>
                Error: {error.message}
            </p>
        );
    }

    let authRedirectBlock = null;

    if (isAuthenticated) {
        authRedirectBlock = <Redirect to={authRedirect} />;
    }

    if (!loading) {
        form = (
            <Fragment>
                {authRedirectBlock}

                {errorMessage}

                <form onSubmit={authHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            id={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => inputChangedHandler(event, formElement.id)}
                        />
                    ))}

                    <Button
                        type="submit"
                        btnClass="Success"
                        disabled={!formIsValid}>
                        {isSignedUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                </form>

                <Button
                    type="button"
                    btnClass="Danger"
                    click={switchAuthModeHanger}>
                    Swith to {isSignedUp ? 'Sign In' : 'Sign Up'}
                </Button>
            </Fragment>
        );
    }


    return (
        <div className={classes.AuthData}>
            {form}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirect: state.auth.authRedirect,
        building: state.bub.building
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(auth, axios));