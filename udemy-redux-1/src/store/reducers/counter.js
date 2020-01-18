// import * as actionTypes from '../actions/actions';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initalState = {
    counter: 0
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        // case actionTypes.INCREMENT:
        //     return {
        //         ...state,
        //         counter: state.counter + 1
        //     }
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return updateObject(state, {
                counter: state.counter + action.value
            })
        case actionTypes.SUBTRACT:
            return updateObject(state, { counter: state.counter - action.value })
        default:
            return state;
    }
};

export default reducer;