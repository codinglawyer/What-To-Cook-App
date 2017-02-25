import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import RecipeApp from './reducers/recipeApp';
import rootSaga from './sagas';

const configureStore = () => {
    const logger = createLogger();
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        RecipeApp,
        applyMiddleware(logger, sagaMiddleware)
    );
    sagaMiddleware.run(rootSaga);
    return store;
}

export default configureStore;

