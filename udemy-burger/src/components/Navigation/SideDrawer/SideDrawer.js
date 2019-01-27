import React, { Fragment } from 'react';
import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let assignedClasses = [classes.SideDrawer, props.opened ? classes.Open : classes.Close];

    return (
        <Fragment>
            <div className={assignedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems
                    />
                </nav>
            </div>
            <Backdrop addClass="Drawer" show={props.opened} remove={props.close} />
        </Fragment>
    );
};

export default sideDrawer;
