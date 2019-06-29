import React from 'react';
import getExpensesTotal from '../../selectors/expenses-total';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummay with 1 expense correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={getExpensesTotal([expenses[2]])/100} expensesCount={1}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummay with multiple expenses correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenses={getExpensesTotal(expenses)/100} expensesCount={expenses.length}/>);
    expect(wrapper).toMatchSnapshot();
});