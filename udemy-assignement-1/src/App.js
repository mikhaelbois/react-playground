import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
    state = {
        users: [
            {
                userName:"User 1",
                age:"99"
            },
            {
                userName:"User 2",
                age:"19"
            },
            {
                userName:"User 3",
                age:"9"
            }
        ]
    }

    updateStateHandler = (event) => {
        this.setState({
            users: [
                {
                    userName:event.target.value
                },
                {
                    userName:"User 2"
                },
                {
                    userName:"User 3"
                }
            ]
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Udemy - Assignment 1</h1>
                </header>

                <UserInput updateName={this.updateStateHandler} userName={this.state.users[0].userName} />
                <UserOutput userName={this.state.users[0].userName} />
                <UserOutput userName={this.state.users[1].userName} />
                <UserOutput userName={this.state.users[2].userName} />
            </div>
        );
    }
}

export default App;
