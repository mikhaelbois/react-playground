import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkoutAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga } from './checkout';
import { fetchOrdersSaga } from './orders';

export function* watchAuth() {
    // Watch for call and then execute
    yield all([
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    // takeEvery Call action every time
    yield takeEvery(actionTypes.FETCH_INGREDIENTS_INIT, initIngredientsSaga);
}

export function* watchCheckout() {
    // takeLatest Cancel previous call before starting a new one
    yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}

export function* watchAll() {
    yield all([
        watchAuth(),
        watchBurgerBuilder(),
        watchCheckout(),
        watchOrders()
    ]);
}


