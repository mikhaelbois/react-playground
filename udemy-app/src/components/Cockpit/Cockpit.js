import React from 'react';

import classes from './Cockpit.css';
// import Aux from '../../hoc/Aux';

// import { AuthContext } from '../../containers/App';
import AuthContext from '../../containers/auth-context';

// Functional Components should not change the state of the app / Stateless
// props.ELEMENT
const cockpit = (props) => {
    let btnClass = classes.CockpitButton;

    if (props.showPersons) {
        btnClass += ' ' + classes.colored;
    }

    return (
        // Aux replaces the HTML container needed
        // <Aux>
        //     <header className="App-header">
        //         <h1>Udemy App</h1>
        //     </header>
        //     <p>
        //         This is a test.
        //     </p>
        //     <button className={btnClass} onClick={props.clicked}>
        //         Switchy time!
        //     </button>
        // </Aux>
        // If your project uses React 16.2, you can now use a built -in "Aux" component - a so called fragment.
        // It's actually not called Aux but you simply use <> - an empty JSX tag.
        <>
            <header className="App-header">
                <h1>Udemy App</h1>
            </header>
            <p>
                This is a test.
            </p>
            <button className={btnClass} onClick={props.clicked}>
                Switchy time!
            </button>
            <AuthContext.Consumer>
                {
                    authContext => {
                        return (
                            <button className={btnClass} onClick={authContext.toggleAuth}>
                                {authContext.isAuth ? 'Logout' : 'Log in'}
                            </button>
                        );
                    }
                }
            </AuthContext.Consumer>
        </>
    );
};

// https:\/\/reactjs.org\/docs\/react-api.html#reactmemo
export default React.memo(cockpit);
