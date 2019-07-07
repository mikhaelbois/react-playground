import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actionTypes from './../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput /*value={this.state.counter}*/ value={this.props.ctr} />
                <CounterControl label="Increment" /*clicked={() => this.counterChangedHandler( 'inc' )}*/ clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" /*clicked={() => this.counterChangedHandler( 'dec' )}*/ clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" /*clicked={() => this.counterChangedHandler( 'add', 5 )}*/ clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" /*clicked={() => this.counterChangedHandler( 'sub', 5 )}*/ clicked={this.props.onSubtractCounter}  />

                <hr />

                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // ctr: state.counter, // Single reducer
        // storedResults: state.results // Single reducer
        ctr: state.ctr.counter, // Combined reducers
        storedResults: state.res.results // Combined reducers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: () => dispatch({ type: actionTypes.ADD, value: 5 }),
        onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, value: 5 }),
        onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result }),
        onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);