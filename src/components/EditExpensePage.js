import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';



export const EditExpensePage = (props) => {
    return (
        <div>
            Wana do some change with id {props.match.params.id}
            <ExpenseForm expense={props.expense}
                onSubmit={(expense) => {
                    props.startEditExpense(props.expense.id, expense);
                    props.history.push('/');
                }}
            />
            <button onClick={()=> {
                props.startRemoveExpense({id: props.expense.id});
                props.history.push('/');
            }}>
            Remove
            </button>
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