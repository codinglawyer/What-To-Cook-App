import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import createLogger from 'redux-logger';
import Recipes from './reducers/recipes';
import Input from './containers/Input'

let localStorageState = JSON.parse(localStorage.getItem('recipes'));
localStorageState = localStorageState ? localStorageState : [];

const logger = createLogger();
let store = createStore(Recipes, localStorageState, applyMiddleware(logger));

setInterval(() => {
    localStorage.setItem('recipes', JSON.stringify(store.getState()))
},1000);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Input} />
        </Router>
    </Provider>,
    document.getElementById('app')
);
