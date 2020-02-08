import React, { Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        // const [error, setError] = useState(null);

        // const reqInterceptor = axios.interceptors.request.use(req => {
        //     setError(null);

        //     return req;
        // });

        // const resInterceptor = axios.interceptors.response.use(res => res, errorObj => {
        //     setError(errorObj);
        // });

        // useEffect(() => {
        //     return () => {
        //         // Disconnect the interceptors when component is not in use
        //         axios.interceptors.request.eject(reqInterceptor);
        //         axios.interceptors.response.eject(resInterceptor);
        //     }
        // }, [reqInterceptor, resInterceptor]);

        // const closeModalHandler = () => {
        //     setError(null);
        // }

        const [error, closeModalHandler] = useHttpErrorHandler(axios);

        return (
            <Fragment>
                <Modal
                    show={error}
                    modalClosed={closeModalHandler}>
                    <h1>Ooops! Something went wrong!</h1>
                    <p>{error ? error.message : null}</p>
                </Modal>

                <WrappedComponent
                    {...props}
                />
            </Fragment>
        );
    }
}

export default withErrorHandler;
