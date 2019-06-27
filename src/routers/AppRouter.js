import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';




const AppRouter = () => {
    return (
        <div>
            {/* Container for all Routes */}
            <BrowserRouter>
                <div>
                    <Header />
                    {/* <Switch> is Responsible for 404 page showing alone and not with other pages */}
                    <Switch>
                        {/* For each Route use <Route> */}
                        <Route path="/" component={ExpenseDashboardPage} exact={true} />
                        <Route path="/create" component={AddExpensePage} />
                        <Route path="/edit/:id" component={EditExpensePage} />
                        <Route path="/help" component={HelpPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};


export default AppRouter;