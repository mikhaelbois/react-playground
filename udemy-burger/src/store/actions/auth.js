import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyBUKIwJjPXyaU37T_fJ6qC4KoiQXwYRcfg';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const authData = { email, password, returnSecureToken: true };

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

        if (!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        }

        dispatch(authStart());

        axios.post(url, authData).then((response) => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            const token = response.data.idToken;
            const userId = response.data.localId;
            const expiresIn = response.data.expiresIn;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout(expiresIn));
        }).catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}
