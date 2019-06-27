import expensesReducer from '../../reducers/expenses';
import uuid from 'uuid';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);  
})

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description: 'This is some description',
            note: 'What a note you just wrote',
            amount: 6784,
            createdAt: 456
        }
    };
    const result = expensesReducer(expenses, action);
    expect(result).toEqual([...expenses, action.expense]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '2'
        } 
    }
    const result = expensesReducer(expenses, action);
    expect(result).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '-1'
        } 
    }
    const result = expensesReducer(expenses, action);
    expect(result).toEqual(expenses);
});

test('should edit an expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '3',
        updates: {
            description: 'more rent',
            note: 'added note'
        }
    }
    const result = expensesReducer(expenses, action);
    expect(result).toEqual([expenses[0], expenses[1], {...expenses[2], ...action.updates}]);
});

test('should not edit expense if id not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: 'more rent',
            note: 'added note'
        }
    }
    const result = expensesReducer(expenses, action);
    expect(result).toEqual(expenses);
});