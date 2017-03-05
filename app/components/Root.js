import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import Main from '../containers/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RecipeForm from './forms/RecipeForm'
import RecipeDetail from './RecipeDetail'

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <Route path="/recipeForm" component={RecipeForm} />
                    <Route path="/(:id)" component={RecipeDetail} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default Root;
