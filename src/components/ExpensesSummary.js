import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = (prop) => {
    return (
        <div>
        <h1>
            Viewing {prop.expensesCount} 
            {prop.expensesCount === 1 ? ' expense ' : ' expenses '}
            totalling {numeral(prop.expenses).format('$0,0.00')}
        </h1>
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