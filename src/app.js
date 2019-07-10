import React from 'react';
import ReactDOM from 'react-dom';
//react-redux libaray - connect react with redux
//We gonna use <Provider> component once at the root of our application
//"connect" function with every comp. that need to connect to the store
import { Provider, connect} from 'react-redux'
//this is stuff of react-router library
import AppRouter from './routers/AppRouter';
//Stuff only related to redux and that we can do in isolation
import configureStore from './store/configureStore';
import { addExpense, startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
//Styles
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
//firebase
import './firebase/firebase';


//=====================================================================================Store Creation
const store = configureStore();



//==================================================================================Subscribe Funciton
// store.subscribe(()=>{
//     const state = store.getState();
//     const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//     console.log(visibleExpenses); 
// });


// //=====================================================================================Action dispatches
// store.dispatch(addExpense({description: 'Water Bill', amount: 5906, note: 'This is very good note', createdAt: 3}));
// store.dispatch(addExpense({description: 'Gas Bill', note: 'yo buddy notes guy', amount: 947, createdAt: 1}));
// store.dispatch(addExpense({description: 'Rent', note: 'This is new expense', amount: 9407, createdAt: 2}));



//Only one time we need to create the Provider component by passing the store that we need to provide as
//prop
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

//Set Loading message to the screen until we get the data from firebase
ReactDOM.render(<p>Loading...</p> , document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx , document.getElementById('app'));
});

