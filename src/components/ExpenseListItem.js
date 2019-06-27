import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = (props) => {
    return (
        <div key={props.expense.id}>
            <Link to={`/edit/${props.expense.id}`}>
            <h3>Description: {props.expense.description}</h3>
            </Link>
            <p>Amount: {props.expense.amount} - Created At: {props.expense.createdAt}</p>
            {/* <li>Notes: {props.expense.note}</li> */}
        </div>
    );
};

export default ExpenseListItem;