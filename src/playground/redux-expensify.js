import { createStore, combineReducers} from 'redux';
//uuid is used for generating unique id(s) that we gonna use in expeses object
import uuid from 'uuid';




//=============================================================================Action Generators
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
//==============================SET_TEXT_FILTER
const setTextFilter = (text = '') => {
    return {
        type: 'SET_TEXT_FILTER',
        text: text
    };
};
//==============================SORT_BY_DATE
const sortByDate = () => {
    return {
        type: 'SORT_BY_DATE'
    };
};
//==============================SORT_BY_AMOUNT
const sortByAmount = () => {
    return {
        type: 'SORT_BY_AMOUNT',
    };
};
//==============================SET_START_DATE
const setStartDate = (startDate = undefined) => {
    return{
        type: 'SET_START_DATE',
        startDate: startDate
    }
};
//==============================SET_END_DATE
const setEndDate = (endDate = undefined) => {
    return{
        type: 'SET_END_DATE',
        endDate: endDate
    }
};

//==============================================================================Expenses Reducer
//variable for current default state
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];

        case 'REMOVE_EXPENSE':
            return state.filter((expense)=>{
                return expense.id !== action.expense.id;
            });

        case 'EDIT_EXPENSE':
            return state.map((expense) => {
               if(expense.id === action.id){
                   return{
                       ...expense ,
                       ...action.updates
                    };
               }else{
                   return expense;
               };
            });

        default:
            return state;
            break;
    }
};



//==============================================================================Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };

        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date'
            };

        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };

        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            }

        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            }


        default:
            return state;
            break;
    }
};

// Timestamps (milliseconds)
// 0 timestamp = 1st January, 1970, 12AM (unix epoch)
//==============================================================================Get Filtered Expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate  !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });   
};


//======================================================================================Store
//Store Creation - with combineReducers helps us to set root 
//property to the state maintained by individual reducer
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    }
));


//===========================================================================Subscribe Funciton
    store.subscribe(()=>{
        const state = store.getState();
        const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
        console.log(visibleExpenses); 
    });



//===============================================================================Dispatch Actions
const expenseOne = store.dispatch(addExpense({
    description: 'this is description Rent',
    note: 'and this is note nothing special',
    amount: 56,
    createdAt: 5
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'this is description rent',
    note: 'and this is note nothing special',
    amount: 100,
    createdAt: 7
}));

// store.dispatch(removeExpense({id: expenseTwo.expense.id}));
store.dispatch(editExpense(expenseOne.expense.id, { amount: 65, description: 'this is kinda new rent'}));
store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());//remove the text filter
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(1));
store.dispatch(setEndDate(10));
// store.dispatch(setStartDate()); // Remove StartDate
// store.dispatch(setEndDate()); // Remove EndDate



//====================================================================================PLANNING
//First of all look at the final state- what are we trying to build
const demoState = {
    expenses: [
        {
            id: 'kjd_ldjf_jsdf38434_lsdf343',
            description: 'Jenuary Rend',
            note: 'This was the final payment for that address',
            amount: 54500,
            createdAt: 0   
        }
    ],
    filters: {
        text: 'rent', //when user put some text to filter expense
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};


// //=============================================================================Object Spread Operator
// const user = {
//     name: 'Jen',
//     age: 23  
// };

// //Don't change the age property if before user and vice-versa
// console.log({
//     age: 36,
//     ...user,
//     hello: 'hello',
//     yo: 'yo'
// })

console.log(store.getState());


