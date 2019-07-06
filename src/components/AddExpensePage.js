import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export const AddExpensePage  = (props) => {
    return (
        <div>
            <h1>Expense Form</h1>
            <ExpenseForm onSubmit={(expense) => {
                //props.dispatch(addExpense(expense));
                props.startAddExpense(expense);
                props.history.push('/');
            }} />
        </div>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
    }
};

export default connect(undefined, mapDispatchToProp)(AddExpensePage);