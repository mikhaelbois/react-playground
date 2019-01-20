import React from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    toggleAuth: () => {}
});

export default AuthContext;