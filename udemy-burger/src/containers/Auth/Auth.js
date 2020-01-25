import React, { Component, Fragment } from 'react';
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

class Auth extends Component {
    state = {
        controls: {
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
        },
        formIsValid: false,
        isSignedUp: true,
        loading: false
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirect();
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(
            this.state.controls, {
                [controlName]: updateObject(
                    this.state.controls[controlName], {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
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

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        });
    }

    authHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (const formElementId in this.state.controls) {
            formData[formElementId] = this.state.controls[formElementId].value;

            if (!this.state.controls[formElementId].valid) {
                return;
            }
        }

        this.props.onAuth(formData.email, formData.password, this.state.isSignedUp);
    }

    switchAuthModeHanger = () => {
        this.setState(prevState => {
            return {
                isSignedUp: !prevState.isSignedUp
            };
        });
    }

    render() {
        const formElementsArray = [];

        for (const key in this.state.controls) {
            if (this.state.controls.hasOwnProperty(key)) {
                const element = this.state.controls[key];
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

        if (this.props.error) {
            errorMessage = (
                <p style={{ textAlign: 'center', color: 'red' }}>
                    Error: {this.props.error.message}
                </p>
            );
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirect} />;
        }

        if (!this.props.loading) {
            form = (
                <Fragment>
                    {authRedirect}

                    {errorMessage}

                    <form onSubmit={this.authHandler}>
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
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}

                        <Button
                            type="submit"
                            btnClass="Success"
                            disabled={!this.state.formIsValid}>
                            {this.state.isSignedUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </form>

                    <Button
                        type="button"
                        btnClass="Danger"
                        click={this.switchAuthModeHanger}>
                        Swith to {this.state.isSignedUp ? 'Sign In' : 'Sign Up'}
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));