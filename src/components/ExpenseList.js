import React from 'react';
import { connect } from 'react-redux'
import getVisibleExpenses from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';

export const ExpenseList = (props) => {
    return (
        <div>
            {props.expenses.length === 0 ? (
            <p>No Expenses</p>
            ):(
            props.expenses.map(expense => {
                return (<ExpenseListItem key={expense.id} expense={expense} />);
            })
            )}
        </div>
    );
};


//=======================================================================================================
//that is the new part that is resposible for passing the state as a prop ans dispatch function as a prop
//we can use these state and dispatch function to render the stuff or change the stuff we want
//We dont need to pass the state prop from the class component state, we are directly accessing it from 
// redux store -- cool huh!
//=======================================================================================================  

//What we gonna need from the store, state arg containes the entire redux store state
const getState = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    }
}

//Connect return function - what and pass out comp to that fn as an argument
export default connect(getState)(ExpenseList);