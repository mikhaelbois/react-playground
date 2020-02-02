import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());

    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;

    try {
        const response = yield axios.get(`/orders.json${queryParams}`);
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

        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFailed(error));
    }
}
