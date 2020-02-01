import React from 'react';
// https://reactcommunity.org/react-transition-group/
import { CSSTransition } from 'react-transition-group';

import './Modal.css';

const animationTiming = {
    enter: 200,
    exit: 400
};

const modal = (props) => {
    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={animationTiming}
            // classNames="fade-slide"
            classNames={{
                enter: '',
                enterActive: 'ModalOpen',
                exit: '',
                exitActive: 'ModalClose',
                appear: '',
                appearActive: ''
            }}
        >
            <div className="Modal">
                <h1>A Modal</h1>
                <button className="Button" onClick={props.close}>Dismiss</button>
            </div>
        </CSSTransition>
    );
}

export default modal;