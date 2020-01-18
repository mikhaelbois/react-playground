// import * as actionTypes from '../actions/actions';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initalState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter((result) => { // Returns new array
        return result.id !== action.id
    });

    return updateObject(state, { results: updatedArray });
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({ // concat returns new array unlike push
                    id: new Date(),
                    // value: state.counter // Single reducer
                    value: action.result // Combined reducers
                })
            }
        case actionTypes.DELETE_RESULT: return deleteResult(state, action);
        default: return state;
    }
};

export default reducer;