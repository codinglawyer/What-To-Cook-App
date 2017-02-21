import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import RecipeApp from './reducers/recipeApp';
import Main from './components/Main';
import * as actions from './actions/index'
import rootSaga from './sagas'

import './global-styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export let store = createStore(
    RecipeApp,
    applyMiddleware(logger, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

//fetch recipes
store.dispatch(actions.recipesAsync());

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
