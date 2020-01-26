import React from 'react';
import Router from 'next/router';

const Error = ({ statusCode }) => {
    return (
        <div>
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
            <button onClick={() => Router.push('/')}>Home</button>
        </div>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

    return { statusCode };
};

export default Error;