import React, { Component, Fragment } from 'react';
import classes from './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        drawerOpened: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            drawerOpened: false
        });
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                drawerOpened: !prevState.drawerOpened
            }
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    toggle={this.toggleSideDrawerHandler}
                />
                <SideDrawer
                    opened={this.state.drawerOpened}
                    close={this.closeSideDrawerHandler}
                />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

export default Layout;
