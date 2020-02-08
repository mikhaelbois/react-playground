import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {
    const cancelPurchaseHandler = () => {
        props.history.goBack();
    }

    const continuePurchaseHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = (
        <Redirect to="/" />
    );

    if (props.ingredients) {
        const purchasedRedirect = props.purchased ? (
            <Redirect to="/" />
        ) : null;

        summary = (
            <Fragment>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancel={cancelPurchaseHandler}
                    continue={continuePurchaseHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.bub.ingredients,
        purchased: state.chk.purchased
    };
};

export default connect(mapStateToProps)(checkout);
