import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

export const AddExpensePage  = (props) => {
    return (
        <div>
            <h1>Expense Form</h1>
            <ExpenseForm onSubmit={(expense) => {
                //props.dispatch(addExpense(expense));
                props.addExpense(expense);
                props.history.push('/');
            }} />
        </div>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        addExpense: (expense) => dispatch(addExpense(expense))
    }
};

export default connect(undefined, mapDispatchToProp)(AddExpensePage);