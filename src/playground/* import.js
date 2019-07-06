//It takes all the named exports from firebase and dumps them on the variable firebase

import * as firebase from 'firebase';

//Example importing all the action expenses in single variable called 'expensesActions'
import * as expensesActions from '../actions/expenses';
//Now we have all actions on the expensesActions variable
// expensesActions.addExpense