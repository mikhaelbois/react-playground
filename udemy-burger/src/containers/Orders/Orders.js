import React, { Component, Fragment } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then((res) => {
            const fetchOrders = [];

            for (const key in res.data) {
                if (res.data.hasOwnProperty(key)) {
                    const element = res.data[key];
                    fetchOrders.push({
                        ...element,
                        id: key
                    });
                }
            }

            this.setState({ 
                loading: false,
                orders: fetchOrders
            });
        }).catch((error) => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        let orders = (
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        );

        if (this.state.orders) {
            orders = (
                <Fragment>
                    {this.state.orders.map((order) => (
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

export default withErrorHandler(Orders, axios);
