import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
    ordersList: null,
    loading: false,
    error: false
};

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true, error: false });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { ordersList: action.ordersList, loading: false, error: false });
}

const fetchOrderFailed = (state, action) => {
    return updateObject(state, { loading: false, error: true });
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrderFailed(state, action);
        default: return state;
    }
};

export default reducer;