import * as actionTypes from '../actions/actionTypes';

const initalState = {
    ordersList: null,
    loading: false,
    error: false
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                ordersList: action.ordersList,
                loading: false,
                error: false
            }
        case actionTypes.FETCH_ORDERS_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;