import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Checkout extends Component {
    state = {
        orderName: null,
        error: false
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

        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancel={this.cancelPurchaseHandler}
                        continue={this.continuePurchaseHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    };
};

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios));
