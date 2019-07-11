import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const createMockStore = configureMockStore([thunk]);

//It set the data before each test run so the last picture you see might not be complete picture of what happened
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}
    })

    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => {
        done();
    });
});


//REMOVE EXPENSE    
test('should setup remove expense action object', () => {
    const id = '123abc'
    const action = removeExpense(id);
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        expense: {
            id: '123abc'
        }
    });
});

//Start Remove Expense
test('should remove expense from firebase', (done) => {
    const store = createMockStore({ auth: {uid}});

    store.dispatch(startRemoveExpense({id:'2'})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            expense: {
                id: '2'
            }
        });

        return database.ref(`users/${uid}/expenses/2`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

//EDIT EXPENSE
test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'new note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note value'
        }
    });
});

//Start Edit Expense
test('should edit expense correctly in firebase', (done) => {
    const store = createMockStore({auth: {uid}});
    const id = expenses[0].id;
    const updates = { amount: 21045}
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val().amount).toBe(21045);
        done();
    });
});

//Add Expense
test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[1]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    });
});

// Start Add Expense
test('should add expense to database and store', (done) => {
    const store = createMockStore({auth: {uid}});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store',(done) => {
    const store = createMockStore({auth: {uid}});

    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense:{
                id: expect.any(String),
                description : '',
                note : '',
                amount : 0,
                createdAt : 0
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            description : '',
            note : '',
            amount : 0,
            createdAt : 0
        });
        done();
    });
});

// Set Expenses
test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses: expenses
    })
});

// Set Start Expense
test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({auth: {uid}});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: expenses
        })
        done();
    });
});