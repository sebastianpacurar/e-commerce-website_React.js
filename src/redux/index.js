import {createStore, combineReducers} from "redux";


// actions
export const increment = () => {
    return {
        type: 'INCREMENT',
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT',
    }
}


// reducer
const cartIconReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}


// combine reducers
const allReducers = combineReducers({
    cartIcon: cartIconReducer,
});


//store
export const myStore = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);