import { createStore, combineReducers } from 'redux';
import filtersReducer from '../reducers/filters';
import expensesReducer from '../reducers/expenses';



//======================================================================================Store
//Store Creation - with combineReducers helps us to set root 
//property to the state maintained by individual reducer
const getStore = () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};

export default getStore;