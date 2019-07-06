import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

//==========================
//We can use BeforeEach() method provided by the jest to don't repeat the code again and again
//==========================

test('should render AddExpensePage correctly', () => {
    const startAddExpenseSpy = jest.fn();
    const historySpy = { push: jest.fn()};
    const wrapper = shallow(<AddExpensePage startAddExpense={startAddExpenseSpy} history={historySpy}/>);

    expect(wrapper).toMatchSnapshot();

});
test('should handle onSubmit', () => {
    const startAddExpenseSpy = jest.fn();
    const historySpy = { push: jest.fn()};
    const wrapper = shallow(<AddExpensePage startAddExpense={startAddExpenseSpy} history={historySpy}/>);

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(startAddExpenseSpy).toHaveBeenCalledWith(expenses[1]);
    expect(historySpy.push).toHaveBeenCalledWith('/');
});