import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ordersReducer from './store/reducers/orders';
import checkoutReducer from './store/reducers/checkout';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';
// /Redux

// Redux Saga
import createSagaMiddleware from 'redux-saga';
import { watchAll } from './store/sagas';
// /Redux Saga

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
    ord: ordersReducer,
    chk: checkoutReducer,
    bub: burgerBuilderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

// Redux DevTools without middleware
// const store = createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// Redux DevTools with middleware
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAll);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
