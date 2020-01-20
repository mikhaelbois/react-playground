import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initalState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true, error: false });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };

            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                error: false,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAILED:
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