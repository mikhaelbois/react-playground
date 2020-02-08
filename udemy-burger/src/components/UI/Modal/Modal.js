import React, { Fragment } from 'react';
import classes from './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
    // Updates only if the Modal changes state || Classe based
    // shouldComponentUpdate(nextProps) {
    //     return nextProps.show !== props.show || nextProps.children !== props.children;
    // }

    return (
        <Fragment>
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                {props.children}
            </div>
            <Backdrop show={props.show} remove={props.modalClosed} />
        </Fragment>
    );
}

// Rerenders the component if props changes
export default React.memo(modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children
});
