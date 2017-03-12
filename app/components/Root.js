import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from './Navigation';
import HomeScreen from '../screens/HomeScreen/index';
import CreateRecipeScreen from '../screens/CreateRecipeScreen/index';
import RecipeDetail from '../screens/RecipeDetail';

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Navigation}>
                    <IndexRoute component={HomeScreen}/>
                    <Route path="/editRecipe/(:id)" component={CreateRecipeScreen} />
                    <Route path="/createRecipe" component={CreateRecipeScreen} />
                    <Route path="/:id" component={RecipeDetail} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default Root;
