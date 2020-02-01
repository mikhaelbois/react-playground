import React from 'react';
// https://reactcommunity.org/react-transition-group/
import { CSSTransition } from 'react-transition-group';

import './Backdrop.css';

const backdrop = (props) => {
    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={200}
            classNames={{
                enterActive: 'BackdropOpen',
                exitActive: 'BackdropClose'
            }}
        >
            <div className="Backdrop"></div>
        </CSSTransition>
    );
};

export default backdrop;