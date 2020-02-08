import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const [ drawerOpened, setDrawerOpened ] = useState(false);

    const closeSideDrawerHandler = () => {
        setDrawerOpened(false);
    }

    const toggleSideDrawerHandler = () => {
        setDrawerOpened(!drawerOpened);
    }

    return (
        <Fragment>
            <Toolbar
                toggle={toggleSideDrawerHandler}
                isAuth={props.isAuthenticated}
            />
            <SideDrawer
                opened={drawerOpened}
                close={closeSideDrawerHandler}
                isAuth={props.isAuthenticated}
                sideClose={toggleSideDrawerHandler}
            />
            <main className={classes.Layout}>
                {props.children}
            </main>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);
