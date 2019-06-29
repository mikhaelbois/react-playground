import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: null,
        email: null,
        address: {
            street: '',
            postalcode: '',
            country: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                id: 1001,
                name: 'Mike',
                address: {
                    street: '1234 de la rive',
                    postalcode: 'H0H 0H0',
                    country: 'Canada'
                },
                emai: 'john@doe.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
                // purchasing: false
            });
            this.props.history.push('/');
        }).catch(error => {
            this.setState({
                loading: false,
                // purchasing: false
            });
        });
    }

    render() {
        let form = (
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        );

        if (!this.state.loading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="street">Street:</label>
                        <input type="text" name="street" id="street" />
                    </div>
                    <div>
                        <label htmlFor="postalcode">Postal Code:</label>
                        <input type="text" name="postalcode" id="postalcode" />
                    </div>
                    <div>
                        <label htmlFor="country">Country:</label>
                        <input type="text" name="country" id="country" />
                    </div>

                    <Button
                        type="submit"
                        btnClass="Success">
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

export default withErrorHandler(ContactData, axios);
