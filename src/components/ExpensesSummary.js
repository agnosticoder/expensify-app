import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (prop) => {
    return (
        <div className='page-header'>
            <div className='content-container'>
                <h1 className='page-header__title'>
                    Viewing <span>{prop.expensesCount}</span>
                    {prop.expensesCount === 1 ? ' expense ' : ' expenses '}
                    totalling <span>{numeral(prop.expenses).format('$0,0.00')}</span>
                </h1>
                <div className='page-header__actions'>
                    <Link className='button' to='/create'>Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProp = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenses: (getExpensesTotal(visibleExpenses)/100),
        expensesCount: visibleExpenses.length
    }
}

export default connect(mapStateToProp)(ExpensesSummary);