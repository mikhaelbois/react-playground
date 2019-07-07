import * as actionTypes from './actions';

const initalState = {
    persons: []
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                persons: state.persons.concat({
                    id: Math.random(), // not really unique but good enough here!
                    name: action.person.name,
                    age: action.person.age
                })
            }
        case actionTypes.DELETE_PERSON:
            return {
                persons: state.persons.filter((person) => {
                    return person.id !== action.id
                })
            }
        default:
            return state;
    }
};

export default reducer;