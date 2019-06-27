import { createStore } from 'redux';
import { get } from 'http';

//createStore to create the store, which take the function as an argument which tells us the current state and we can also pass the default state object if nothing is passed to the state
const store = createStore((state = { count: 0 }, action)=>{
    console.log(action);
    switch (action.type) {
        case 'INCREMENT':
            const increment = action.incrementBy ? action.incrementBy : 1;
            return {
                count: state.count + increment
            }
            break;

        case 'DECREMENT':
            const decrement = action.decrementBy ? action.decrementBy : 1;
            return{
                count: state.count - decrement
            }

        case 'RESET':
            return{
                count: 0
            }

        default:
            return state;
            break;
    }
});
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
store.dispatch({
    type: "INCREMENT"
});

// unsubscribe(); // We can use this to unsubscribe at any point we want

//count: 2
store.dispatch({
    type: "INCREMENT"
});

//RESET
store.dispatch({
    type: "RESET"
});

//Decrement
store.dispatch({
    type: "DECREMENT"
});

// We can also send some data with action object
store.dispatch({
    type: "INCREMENT",
    incrementBy: 10
});

store.dispatch({
    type: "DECREMENT",
    decrementBy: 6
});


