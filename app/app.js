import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import Root from './components/Root'

import './styles/global-styles';
import injectTapEventPlugin from 'react-tap-event-plugin';


const store = configureStore()
injectTapEventPlugin();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('app')
);
