import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import Recipes from './reducers/recipes';
import Input from './containers/Input'

const logger = createLogger();
let store = createStore(Recipes, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <Input />
    </Provider>,
    document.getElementById('app')
);


