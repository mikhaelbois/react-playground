import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initalState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true, error: false });
};

const purchaseBurgerSuccess = (state, action) => {
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
};

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false, error: true });
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
        default: return state;
    }
};

export default reducer;