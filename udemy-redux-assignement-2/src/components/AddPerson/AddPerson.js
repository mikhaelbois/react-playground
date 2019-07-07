import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    // Local UI State - Relevant to component only
    state = {
        name: '',
        age: ''
    }

    nameChangeHanlder = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    ageChangeHanlder = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    render () {
        return (
            <div className="AddPerson">
                <input type="text" placeholder="Name" name="name" onChange={this.nameChangeHanlder} value={this.state.name} />
                <input type="number" placeholder="Age" name="age" onChange={this.ageChangeHanlder} value={this.state.age} />
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        );
    }
}

export default AddPerson;