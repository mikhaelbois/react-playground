import { useReducer, useCallback } from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
};

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                identifier: action.identifier
            };
        case 'RESPOND':
            return {
                ...httpState,
                loading: false,
                data: action.data,
                extra: action.extra
            };
        case 'ERROR':
            return {
                loading: false,
                error: action.error
            };
        case 'CLEAR':
            return initialState;
        default:
            throw new Error('You can\'t be here!');
    }
}

const useHttp = () => {
    const [http, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => {
        dispatchHttp({ type: 'CLEAR' });
    }, []);

    const sendRequest = useCallback((url, method, body, extra, identifier) => {
        dispatchHttp({
            type: 'SEND',
            identifier: identifier
        });

        fetch(url, {
            method: method,
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            dispatchHttp({
                type: 'RESPOND',
                data: responseData,
                extra
            });
        }).catch(error => {
            dispatchHttp({
                type: 'ERROR',
                error: error.message
            });
        });
    }, []);

    return {
        isLoading: http.loading,
        error: http.error,
        data: http.data,
        sendRequest: sendRequest,
        extra: http.extra,
        identifier: http.identifier,
        clear: clear
    };
}

export default useHttp;
