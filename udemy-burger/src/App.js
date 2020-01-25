import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheckState();
    }

    render() {
        const loading = (
            <div style={{ textAlign: 'center' }}>
                <Spinner />
            </div>
        );

        let routes = (
            <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Suspense fallback={loading}>
                    <Route path="/auth" component={Auth} />
                </Suspense>
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Suspense fallback={loading}>
                        <Route path="/orders" component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/logout" component={Logout} />
                    </Suspense>
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));