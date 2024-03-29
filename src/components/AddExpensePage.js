import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export const AddExpensePage  = (props) => {
    return (
        <div>
            <div className='page-header'>
                <div className='content-container'>
                    <h1 className='page-header__title'>Add Expense</h1>
                </div>
            </div>
            <div className='content-container'>
            <ExpenseForm onSubmit={(expense) => {
                //props.dispatch(addExpense(expense));
                props.startAddExpense(expense);
                props.history.push('/');
            }} />
            </div>
        </div>
    );
};

const mapDispatchToProp = (dispatch) => {
    return {
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
    }
};

export default connect(undefined, mapDispatchToProp)(AddExpensePage);