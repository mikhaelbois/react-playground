import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        ordersList: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(
            fetchOrdersStart()
        )

        axios.get('/orders.json').then((response) => {
            const fetchedOrders = [];
            const data = response.data;

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    fetchedOrders.push({
                        ...element,
                        id: key
                    });
                }
            }

            dispatch(
                fetchOrdersSuccess(fetchedOrders)
            )
        }).catch((error) => {
            dispatch(
                fetchOrdersFailed(error)
            )
        });
    }
}
