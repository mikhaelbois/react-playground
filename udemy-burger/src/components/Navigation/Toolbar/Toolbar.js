import React from 'react';
import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;
