import uuid from 'uuid';
import database from '../firebase/firebase';


//================================ADD_EXPENSE
const addExpense = (expense) => {
    return{
        type: 'ADD_EXPENSE',
        expense
    }
};

//To add the redux-thunk functionality - this return the function as oppose to object
//Start Add Expenses
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt};

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        })
    }
};

//==============================REMOVE_EXPENSE
const removeExpense = (id) => {
    return{
        type: 'REMOVE_EXPENSE',
        expense: {
            id: id
        } 
    }
};

//Start Remove Epense
export const startRemoveExpense = (ids = {}) => {
    return (dispatch) => {
        const {id = ''} = ids;
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense(id));
        });
    }
}

//==============================EDIT_EXPENSE
const editExpense = (id, updates) => {
    return{
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updates
    }
};

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update({
            ...updates
        }).then(() => {
            dispatch(editExpense(id, updates));
        })
    };
};

export { addExpense, removeExpense, editExpense};

//SET_EXPENSES
export const setExpenses = (expenses) => {
    return {
        type: 'SET_EXPENSES',
        expenses
    }
};

//Start Set Expenses
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((expensesFirebase) => {
            const expensesStore = [];
            expensesFirebase.forEach((expense) => {
                expensesStore.push({
                    id: expense.key,
                    ...expense.val()
                });
            });
            dispatch(setExpenses(expensesStore));   
        });
    };
};