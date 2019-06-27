import { createStore } from 'redux';

//Action generators - functions that return action object
//We moved the logic above instead inside the creatStore function
const incrementCount = ({incrementBy = 1} = {}) => {
    return {
        type: 'INCREMENT',
        incrementBy: incrementBy
    }
};

const decrementCount = ({decrementBy = 1} = {}) => {
    return{
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
};

const setCount = ({count}) => {
    return{
        type: 'SET',
        count: count
    }
};

const resetCount = () => {
    return{
        type: 'RESET'
    }
};

//createStore to create the store, which take the function(Reducer) as an argument which tells us the current state and we can also pass the default state object if nothing is passed to the state and it also take second argument which catch the action object sent by the dispatch function

//REDUCER
//1. Reducers are pure functions
//2. Never change state or action
const countReducer= (state = { count: 0 }, action)=>{
    console.log(action);
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
            break;

        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            }

        case 'SET':
            return{
                count: action.count
            }

        case 'RESET':
            return{
                count: 0
            }

        default:
            return state;
            break;
    }
};

const store = createStore(countReducer);
//store.subscribe(()=> {}) -- passed function run every time store changes
const unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});


//getState function help us to get the current state of the store
// console.log(store.getState());

//Action -- help us to change the redux store
//Its an object that get sent to the store
//This object describe the type of action we want to take e.g increment, decrement, reset

//Increment -- include both action inside the dispatch call
//dipatch allow us to send off action objec to the store
//dispatch fucntion trigger the createStore function
//Action object is passed as the second argument of the createStore function
//count: 1
store.dispatch(incrementCount({incrementBy: 24}));//I have changed this with action generator function passed in the dispatch function


// unsubscribe(); // We can use this to unsubscribe at any point we want

//count: 2
store.dispatch(incrementCount({incrementBy: 50})); 

//RESET
store.dispatch(resetCount());

//SET
store.dispatch(setCount({count: 34}));
store.dispatch(setCount({count: 35}));

//Decrement
store.dispatch(decrementCount());

// We can also send some data with action object
store.dispatch(incrementCount({incrementBy: 10}));

store.dispatch(decrementCount({decrementBy: 6}));


