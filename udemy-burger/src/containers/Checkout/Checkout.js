import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    state = {
        orderName: null,
        ingredients: null,
        price: 0,
        error: false
    }

    componentWillMount() {
        // if (this.props.match.params.name && this.state.orderName !== this.props.match.params.orderName) {
        //     this.setState({
        //         orderName: this.props.match.params.name
        //     }, () => {
        //         axios.get(`/orders/${this.state.orderName}.json`).then(response => {
        //             this.setState({
        //                 ingredients: response.data.ingredients
        //             });
        //         });
        //     });
        // }

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    cancelPurchaseHandler = () => {
        this.props.history.goBack();
    }

    continuePurchaseHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let burger = (
            <p style={{ textAlign: 'center' }}>
                Error while fetching the ingredients!
            </p>
        );

        if (!this.state.error) {
            burger = (
                <div style={{ textAlign: 'center' }}>
                    <Spinner />
                </div>
            );
        }

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.state.ingredients}
                        cancel={this.cancelPurchaseHandler}
                        continue={this.continuePurchaseHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                    />
                </Fragment>
            );
        }

        return (
            <Fragment>
                {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(Checkout, axios);
