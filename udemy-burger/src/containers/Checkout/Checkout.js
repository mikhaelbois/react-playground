import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        orderName: null
    }

    cancelPurchaseHandler = () => {
        this.props.history.goBack();
    }

    continuePurchaseHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = (
            <Redirect to="/" />
        );

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;

            summary = (
                <Fragment>
                    {purchasedRedirect}
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
                {summary}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.bub.ingredients,
        purchased: state.chk.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
