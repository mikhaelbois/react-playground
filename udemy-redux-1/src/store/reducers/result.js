import * as actionTypes from '../actions';

const initalState = {
    results: []
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
        case actionTypes.DELETE_RESULT:
            return {
                ...state,
                results: state.results.filter((result) => { // Returns new array
                    return result.id !== action.id
                })
            }
        default:
            return state;
    }
};

export default reducer;