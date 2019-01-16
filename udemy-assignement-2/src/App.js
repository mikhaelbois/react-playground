import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
    state = {
        charArray: ['1']
    }

    updateLengthHandler = (event) => {
        const newCharArray = event.target.value.split('');

        this.setState({
            charArray: newCharArray
        });
    }

    clickCharHandler = (index) => {
        const newCharArray = [...this.state.charArray];
        newCharArray.splice(index, 1);

        this.setState({
            charArray: newCharArray
        });
    }

    render() {
        let charList = this.state.charArray.map((char, index) => {
           return (
               <CharComponent
                key={index}
                char={char}
                clicked={() => this.clickCharHandler(index)} />
           );
        })

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Udemy - Assignment 2</h1>
                </header>

                <div className="validation-form">
                    <input type="text" onChange={(event) => this.updateLengthHandler(event)} value={this.state.charArray.join('')}/>
                    <ValidationComponent length={this.state.charArray.length} />
                </div>

                {charList}

            </div>
        );
    }
}

export default App;
