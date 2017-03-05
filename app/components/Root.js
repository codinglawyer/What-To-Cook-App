import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from '../screens/Home';
import CreateRecipe from '../screens/CreateRecipe';
import RecipeDetail from '../screens/RecipeDetail';

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Home}>
                    <Route path="/recipeForm" component={CreateRecipe} />
                    <Route path="/(:id)" component={RecipeDetail} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default Root;
