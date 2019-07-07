// Node JS test file
const redux = require('redux');
const createStore = redux.createStore;
const initalState = {
    counter: 0
};

// Reducer
// Multiple reducers will be merged into a single one
const rootReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'INC_COUNTER':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'ADD_COUNTER':
            return {
                ...state,
                counter: state.counter + action.value
            }
        default:
            return state;
    }
};

// Store
const store = createStore(rootReducer);

console.log(store.getState());

// Subscription -- Triggered whenever the state is updated
store.subscribe(() => {
    console.log(['Subscription'], store.getState());
});

// Dispatching Action
store.dispatch({
    type: 'INC_COUNTER' // Uppercase is convention
});
store.dispatch({
    type: 'ADD_COUNTER',
    value: 10
});
console.log(store.getState());
