import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/utility';

const contactData = props => {
    const defaultOrderForm = {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postalcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        value: 'CA',
                        label: 'Canada'
                    },
                    {
                        value: 'US',
                        label: 'United States'
                    }
                ],
                placeholder: 'Country'
            },
            value: '',
            validation: {
                // required: true
            },
            valid: false,
            // touched: false
        }
    };

    const [orderForm, setOrderForm] = useState(defaultOrderForm);
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (const formElementId in orderForm) {
            formData[formElementId] = orderForm[formElementId].value;

            if (!orderForm[formElementId].valid) {
                return;
            }
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBuger(order, props.token);
    }

    const inputChangedHandler = (event, inputId) => {
        const updatedFormElement = updateObject(
            orderForm[inputId], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, orderForm[inputId].validation)
            }
        );


        const updatedOrderForm = updateObject(orderForm, {
            [inputId]: updatedFormElement
        });

        let formIsValid = true;
        for (const inputIdentifier in updatedOrderForm) {
            if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];

    for (const key in orderForm) {
        if (orderForm.hasOwnProperty(key)) {
            const element = orderForm[key];
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

    if (!props.loading) {
        form = (
            <form onSubmit={orderHandler}>
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
                    Finally get your order!
                </Button>
            </form>
        );
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bub.ingredients,
        totalPrice: state.bub.totalPrice,
        loading: state.chk.loading,
        error: state.chk.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBuger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
