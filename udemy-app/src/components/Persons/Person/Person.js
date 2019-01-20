import React, { Component } from 'react';

import classes from './Person.css';
import withClass from '../../../hoc/withClass';

// import { AuthContext } from '../../containers/App';
import AuthContext from '../../../containers/auth-context';

class Person extends Component {
    // Prevent the use of <AuthContext.Consumer>
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        // Stores access to element - New way
        this.inputElement = React.createRef();
    }

    componentDidMount() {
        // Focus on the first input element - Old way
        // if (this.props.position === 0) {
        //     this.inputElement.focus();
        // }
        if (this.props.position === 0) {
            this.inputElement.current.focus();
        }
    }

    focusInput() {
        this.inputElement.current.focus();
    }

    render() {
        return (
            <>
                <h3 onClick={this.props.clicked}>I'm {this.props.name} and I wish I was {this.props.age} years old again!</h3>
                    {this.context.isAuth ? <h4>Welcome {this.props.name}</h4> : null}
                {this.props.children}
                <input
                    // Stores access to element - Old way
                    // ref={(element) => {this.inputElement = element}}
                    // Stores access to element - New way
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </>
        );
    }
}

export default withClass(Person, classes.Person);
