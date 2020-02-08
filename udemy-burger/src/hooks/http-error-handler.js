import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);

        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, errorObj => {
        setError(errorObj);
    });

    useEffect(() => {
        return () => {
            // Disconnect the interceptors when component is not in use
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [
        error,
        errorConfirmedHandler
    ];
}
