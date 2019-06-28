import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => {
    return (
        <div key={props.expense.id}>
            <Link to={`/edit/${props.expense.id}`}>
            <h3>Description: {props.expense.description}</h3>
            </Link>
            <p>
            Amount: {numeral(props.expense.amount/100).format('$0,0.00')} - 
            Created At: {moment(props.expense.createdAt).format('MMMM Do, YYYY')}</p>
            {/* <li>Notes: {props.expense.note}</li> */}
        </div>
    );
};

export default ExpenseListItem;