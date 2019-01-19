import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

// https://www.npmjs.com/package/radium
// import Radium, { StyleRoot } from 'radium';

class App extends Component {
    state = {
        persons: [
            {
                id: 1,
                name:"Bob",
                age:"99"
            },
            {
                id: 2,
                name:"Job",
                age:"19"
            },
            {
                id: 3,
                name:"Mob",
                age:"9"
            }
        ],
        showPersons: false
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
        this.setState({showPersons: !doesShow});
    }

    render() {
        let style = {
            backgroundColor: '#333',
            border: 'none',
            color: '#fff',
            padding: '1em',
            cursor: 'pointer'
            // ':hover': {
            //     backgroundColor: '#000'
            // }
        };
        let persons = null;
        const classes = [];

        if (this.state.persons.length > 2) {
            classes.push('bold');
        };

        if (this.state.showPersons) {
            style = {
                ...style,
                backgroundColor: '#be0fce'
                // ':hover': {
                //     color: '#000'
                // }
            };

            classes.push('colored');

            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return (
                            <Person
                                name={person.name}
                                age={person.age}
                                // click={() => this.deletePersonsHandler(index)}
                                key={person.id}
                                changed={(event) => this.switchNameHandler(event, person.id)} >
                                <h5>My hobbies</h5>
                            </Person>
                        );
                    })}
                </div>
            );
        }

        return (
            // <StyleRoot>
                <div className="App">
                    <header className="App-header">
                        <h1>Udemy App</h1>
                    </header>
                    <p className={classes.join(' ')}>
                        This is a test.
                    </p>
                    <button
                        onClick={this.togglePersonsHandler}
                        style={style} >
                        Switchy time!
                    </button>

                    {persons}
                </div>
            // </StyleRoot>
        );
    }
}

// export default Radium(App);
export default App;
