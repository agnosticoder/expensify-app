import uuid from 'uuid';


//================================ADD_EXPENSE
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => {
    return{
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description: description,
            note: note,
            amount: amount,
            createdAt: createdAt
        }
    }
};
//==============================REMOVE_EXPENSE
const removeExpense = ({id = ''} = {}) => {
    return{
        type: 'REMOVE_EXPENSE',
        expense: {
            id: id
        } 
    }
};
//==============================EDIT_EXPENSE
const editExpense = (id, updates) => {
    return{
        type: 'EDIT_EXPENSE',
        id: id,
        updates: updates
    }
};

export { addExpense, removeExpense, editExpense};