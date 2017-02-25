import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root'
import * as actions from './actions/index'

import './global-styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore()

//fetch recipes
store.dispatch(actions.receiveRecipes());

injectTapEventPlugin();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('app')
);
