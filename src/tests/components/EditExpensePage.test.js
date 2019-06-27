import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
import { wrap } from 'module';

test('should render EditExpensePage correctly', () => {
    const matchSpy = { params : {
        id: 'This is some id'
    }}
    const wrapper = shallow(<EditExpensePage match={matchSpy} />);
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    const matchSpy = { params : {
        id: 'This is some id'
    }};
    const expenseSpy = {
        id: 'oh god'
    };

    const editExpenseSpy = jest.fn();

    const historySpy = { push: jest.fn()};

    const wrapper = shallow(
    <EditExpensePage 
    match={matchSpy} 
    expense={expenseSpy} 
    editExpense={editExpenseSpy} 
    history={historySpy} />);

    wrapper.find("ExpenseForm").prop('onSubmit')(expenses[1]);
    expect(editExpenseSpy).toHaveBeenCalledWith('oh god', expenses[1]);
    expect(historySpy.push).toHaveBeenCalledWith('/');
});


test('should handle removeExpense', () => {
    const matchSpy = { params : {
        id: 'This is some id'
    }};
    const expenseSpy = {
        id: 'oh god'
    };

    const removeExpenseSpy = jest.fn();

    const historySpy = { push: jest.fn()};

    const wrapper = shallow(
    <EditExpensePage 
    match={matchSpy} 
    expense={expenseSpy} 
    removeExpense={removeExpenseSpy}
    history={historySpy} />);

    wrapper.find('button').simulate('click');
    expect(removeExpenseSpy).toHaveBeenCalledWith({id: 'oh god'});
    expect(historySpy.push).toHaveBeenCalledWith('/');
});