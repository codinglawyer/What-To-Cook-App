import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import createLogger from 'redux-logger';

import RecipeApp from './reducers/recipeApp';
import Main from './components/Main';

import './global-styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';


let localStorageState = JSON.parse(localStorage.getItem('recipes'));
localStorageState = localStorageState ? localStorageState : [];

const logger = createLogger();
let store = createStore(RecipeApp,
    localStorageState,
    applyMiddleware(logger));

setInterval(() => {
    localStorage.setItem('recipes', JSON.stringify(store.getState()))
},1000);

setInterval(() => {
    console.log(store.getState())
},5000);

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Main} />
        </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);

