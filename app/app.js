import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import RecipeApp from './reducers/recipeApp';
import Main from './components/Main';

import { helloSaga } from './sagas'
import rootSaga from './sagas'

import './global-styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchRecipes } from './api/index'

// fetchRecipes().then(recipes =>
//     console.log(recipes)
// );


let localStorageState = JSON.parse(localStorage.getItem('recipes'));
localStorageState = localStorageState ? localStorageState : [];

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    RecipeApp,
    localStorageState,
    applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga)
// store.dispatch(fetchRecipes())


setInterval(() => {
    localStorage.setItem('recipes', JSON.stringify(store.getState()))
},1000);

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

