import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

import AuthContext from './auth-context';
// export const AuthContext = React.createContext({
//     isAuth: false,
//     toggleAuth: () => {

//     }
// });

// Class Components can change the state of the app / Stateful
// this.props.ELEMENT
class App extends Component {
    constructor(props) {
        // Called first
        super(props);
    }

    componentWillMount() {
        // Called second
        // Called when the component may be receiving new props.
        // React may call this even if props have not changed, so be sure to compare new and existing props if you only want to handle changes.
    }

    componentDidMount() {
        // Called fourth
        // Called immediately after a component is mounted.Setting state here will trigger re-rendering.
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Update - Called second
        // Called to determine whether the change in props and state should trigger a re-render.
        // Stops process if no change is found.
        return nextState.persons !== this.state.persons ||
            nextState.showPersons !== this.state.showPersons ||
            nextState.isAuth !== this.state.isAuth;
    }

    state = {
        persons: [
            {
                id: 1,
                // name:"Bob",
                age:99
            },
            {
                id: 2,
                name:"Job",
                age:19
            },
            {
                id: 3,
                name:"Mob",
                age:9
            }
        ],
        showPersons: false,
        toggleClicked: 0,
        isAuth: false
    }

    switchNameHandler = (event, id) => {
        // Find the person's index
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        // Copy the person
        const thisPerson = {
            ...this.state.persons[personIndex]
        }

        // Update the person's name
        thisPerson.name = event.target.value;

        // Sets the new persons array
        const newPersons = [...this.state.persons];
        newPersons[personIndex] = thisPerson;
        this.setState({persons: newPersons});
    }

    deletePersonsHandler = (personIndex) => {
        // const newPersons = this.state.persons.slice();
        const newPersons = [...this.state.persons];
        newPersons.splice(personIndex,1);
        this.setState({persons: newPersons});

    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState((prevState, props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    }

    toggleAuth = () => {
        this.setState((prevState) => {
            return {
                isAuth: !prevState.isAuth
            }
        });
    }

    render() {
        // Called third
        let persons = null;

        if (this.state.showPersons) {
            persons = 
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonsHandler}
                    changed={this.switchNameHandler}
                />
            ;
        }

        return (
            <div>
                <AuthContext.Provider
                    value={
                        {
                            isAuth: this.state.isAuth,
                            toggleAuth: this.toggleAuth
                        }
                    }
                >
                    <Cockpit
                        showPersons={this.state.showPersons}
                        persons={this.state.persons}
                        clicked={this.togglePersonsHandler}
                    />
                    {persons}
                </AuthContext.Provider>
            </div>
        );
    }
}

export default withClass(App, classes.App);
