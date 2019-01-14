import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            {
                name:"Bob",
                age:"99"
            },
            {
                name:"Job",
                age:"19"
            },
            {
                name:"Mob",
                age:"9"
            }
        ]
    }

    switchNameHandler = (newName) => {
        this.setState({
            persons: [
                {
                    name:newName,
                    age:"1119"
                },
                {
                    name:"Job",
                    age:"19"
                },
                {
                    name:"Mobydick",
                    age:"9"
                }
            ]
        });
    }

    nameChangeHandler = (event) => {
        this.setState({
            persons: [
                {
                    name:"Bob",
                    age:"1119"
                },
                {
                    name: event.target.value,
                    age:"19"
                },
                {
                    name:"Mob",
                    age:"9"
                }
            ]
        });
    }

    render() {
        const style = {
            backgroundColor: '#333',
            border: 'none',
            color: '#fff',
            padding: '1em',
            cursor: 'pointer'
        };

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Udemy App</h1>
                </header>
                <p>
                    This is a test.
                </p>
                <button
                    onClick={() => this.switchNameHandler('Max1')}
                    style={style} >
                    Switchy time!
                </button>
                <Person
                    name={this.state.persons[0].name}
                    age={this.state.persons[0].age}
                    click={this.switchNameHandler.bind(this, 'Max2')} />
                <Person
                    name={this.state.persons[1].name}
                    age={this.state.persons[1].age}
                    change={this.nameChangeHandler} >
                    <h5>My hobbies</h5>
                </Person>
                <Person
                    name={this.state.persons[2].name}
                    age={this.state.persons[2].age}/>
            </div>
        );

        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Udemy App'));
    }
}

export default App;
