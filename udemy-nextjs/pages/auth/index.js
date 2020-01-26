import React from 'react';
import Router from 'next/router';

import User from '../../components/User';

const AuthIndex = () => (
    <div>
        <p>Auth Page</p>
        <User name="Mike" age={21} />
        <button onClick={() => Router.push('/')}>Home</button>
    </div>
);

export default AuthIndex;