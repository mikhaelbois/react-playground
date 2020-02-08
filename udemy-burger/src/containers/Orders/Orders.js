import React, { useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
    useEffect(() => {
        props.onFetchOrders(
            props.token,
            props.userId
        );
    }, [props.onFetchOrders, props.token, props.userId]);

    let orders = (
        <div style={{ textAlign: 'center' }}>
            <Spinner />
        </div>
    );

    if (props.ordersList) {
        orders = (
            <Fragment>
                {props.ordersList.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                ))}
            </Fragment>
        );
    }

    return (
        <Fragment>
            {orders}
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        ordersList: state.ord.ordersList,
        loading: state.ord.loading,
        error: state.ord.error,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
