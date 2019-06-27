import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';



export const EditExpensePage = (props) => {
    return (
        <div>
            Wana do some change with id {props.match.params.id}
            <ExpenseForm expense={props.expense}
                onSubmit={(expense) => {
                    props.editExpense(props.expense.id, expense);
                    props.history.push('/');
                }}
            />
            <button onClick={()=> {
                props.removeExpense({id: props.expense.id});
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

const matchDispatchToProp = (dispatch, ownPorps) => {
    return {
        editExpense: (id,expense) => dispatch(editExpense(id, expense)),
        removeExpense: (data) => dispatch(removeExpense(data))
    }
};

export default connect(getState, matchDispatchToProp)(EditExpensePage);