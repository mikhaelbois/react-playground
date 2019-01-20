import React, { PureComponent } from 'react';
// https://reactjs.org/docs/typechecking-with-proptypes.html
import PropTypes from 'prop-types';

import Person from './Person/Person';

// PureComponent - Uses own version of shouldComponentUpdate found in Component | SHOULD RARELY BE USED
class Persons extends PureComponent {
    constructor(props) {
        super(props);

        // Stores access to element - New way
        this.lastPersonRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        // Update - Called first
        // Called when the component may be receiving new props.
        // React may call this even if props have not changed, so be sure to compare new and existing props if you only want to handle changes.
    }

    // shouldComponentUpdate(nextProps, nextState) {
        // Update - Called second
        // Called to determine whether the change in props and state should trigger a re-render.
    // }
    // Commented because of React's PureComponent

    // componentWillUpdate(nextProps, nextState) {
        // Update - Called third
        // Called immediately before rendering when new props or state is received.Not called for the initial render.
    // }

    // static getDerivedStateFromProps(nextState, prevState) {
    //     // Use this instead of componentWillUpdate
    //     return prevState;
    // }

    // Runs before React applies the result of render to the document, and returns an object to be given to componentDidUpdate.
    // Useful for saving things such as scroll position before render causes changes to it.
    // getSnapshotBeforeUpdate() {

    // }

    componentDidUpdate() {
        // Update - Called fourth - After render()
        // Called immediately after updating occurs.Not called for the initial render.
    }

    componentDidMount() {
        this.lastPersonRef.current.focusInput();
    }

    render() {
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    name={person.name}
                    age={person.age}
                    clicked={() => this.props.clicked(index)}
                    ref={this.lastPersonRef}
                    key={person.id}
                    position={index}
                    changed={(event) => this.props.changed(event, person.id)} >
                    <h5>My hobbies</h5>
                </Person>
            );
        });
    }
}

// Uses Prop-Types package to assign a type to values
Person.propTypes = {
    clicked: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

// Specifies the default values for props:
Person.defaultProps = {
    name: 'Stranger'
};

export default Persons;
