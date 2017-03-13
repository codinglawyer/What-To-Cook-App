import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from './Navigation';
import HomeScreen from '../screens/HomeScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Navigation}>
                    <IndexRoute component={HomeScreen}/>
                    <Route path="/editRecipe/(:id)" component={CreateRecipeScreen} />
                    <Route path="/createRecipe" component={CreateRecipeScreen} />
                    <Route path="/:id" component={RecipeDetailScreen} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default Root;
