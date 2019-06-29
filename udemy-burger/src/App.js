import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Layout>
                    <Switch>
                        {/*
                        <Route
                            path="/checkout/:name"
                            exact
                            component={Checkout}
                        />
                        */}

                        <Route
                            path="/orders"
                            component={Orders}
                        />

                        <Route
                            path="/checkout"
                            component={Checkout}
                        />

                        <Route
                            path="/"
                            exact
                            component={BurgerBuilder}
                        />

                        <Route render={() => <h1>404 - Page Not Found</h1>} />
                    </Switch>
                </Layout>
            </Fragment>
        );
    }
}

export default App;
