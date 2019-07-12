import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';



export const EditExpensePage = (props) => {
    return (
        <div>
        <div className='page-header'>
            <div className='content-container'>
            <h1 className='page-header__title'>Edit Expense</h1>
            </div>
        </div>
        <div className='content-container'>
            <ExpenseForm expense={props.expense}
                onSubmit={(expense) => {
                    props.startEditExpense(props.expense.id, expense);
                    props.history.push('/');
                }}
            />
            <button className='button button--secondary' onClick={()=> {
                props.startRemoveExpense({id: props.expense.id});
                props.history.push('/');
            }}>
            Remove Expense
            </button>
         </div>
        </div>
    );
};

const getState = (state,props) => {
    return{
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    }
};

const matchDispatchToProp = (dispatch) => {
    return {
        startEditExpense: (id,expense) => dispatch(startEditExpense(id, expense)),
        startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
    }
};

export default connect(getState, matchDispatchToProp)(EditExpensePage);