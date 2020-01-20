import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = (
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        );

        if (this.props.ordersList) {
            orders = (
                <Fragment>
                    {this.props.ordersList.map((order) => (
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
}

const mapStateToProps = (state) => {
    return {
        ordersList: state.ord.ordersList,
        loading: state.ord.loading,
        error: state.ord.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
