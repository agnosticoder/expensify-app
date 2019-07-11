import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();


const AppRouter = () => {
    return (
        <div>
            {/* Container for all Routes */}
            <Router history={history}>
                <div>
                    {/* <Switch> is Responsible for 404 page showing alone and not with other pages */}
                    <Switch>
                        {/* For each Route use <Route> */}
                        <PublicRoute path="/" component={LoginPage} exact={true} />
                        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
                        <PrivateRoute path="/create" component={AddExpensePage} />
                        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};


export default AppRouter;