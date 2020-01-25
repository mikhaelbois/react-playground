import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (const formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;

            if (!this.state.orderForm[formElementId].valid) {
                return;
            }
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBuger(order, this.props.token);
    }

    inputChangedHandler = (event, inputId) => {
        const updatedFormElement = updateObject(
            this.state.orderForm[inputId], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.orderForm[inputId].validation)
            }
        );


        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputId]: updatedFormElement
        });

        let formIsValid = true;
        for (const inputIdentifier in updatedOrderForm) {
            if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            }
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    render() {
        const formElementsArray = [];

        for (const key in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(key)) {
                const element = this.state.orderForm[key];
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

        if (!this.props.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
