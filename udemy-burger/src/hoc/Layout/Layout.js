import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

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
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer
                    opened={this.state.drawerOpened}
                    close={this.closeSideDrawerHandler}
                    isAuth={this.props.isAuthenticated}
                    sideClose={this.toggleSideDrawerHandler}
                />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
