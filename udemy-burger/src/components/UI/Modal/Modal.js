import React, { Component, Fragment } from 'react';
import classes from './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    // Updates only if the Modal changes state
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show;
    }

    render() { 
        return (
            <Fragment>
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} remove={this.props.modalClosed} />
            </Fragment>
        );
    }
}

export default Modal;
