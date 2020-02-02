import { put, delay, call } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

const API_KEY = 'AIzaSyBUKIwJjPXyaU37T_fJ6qC4KoiQXwYRcfg';

// Not really a function but a generator
export function* logoutSaga(action) {
    // yield = wait for it to finish until next step
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'userId');
    yield call([localStorage, 'removeItem'], 'expirationDate');

    yield put(actions.logoutSucceed());
}

export function* checkoutAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    if (!action.isSignUp) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }

    try {
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        const token = response.data.idToken;
        const userId = response.data.localId;
        const expiresIn = response.data.expiresIn;

        yield localStorage.setItem('token', token);
        yield localStorage.setItem('userId', userId);
        yield localStorage.setItem('expirationDate', expirationDate);

        yield put(actions.authSuccess(token, userId));
        yield put(actions.checkAuthTimeout(expiresIn));

    } catch (error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');

    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');

            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
