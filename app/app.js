import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Recipes from './reducers/recipes';
import Input from './containers/Input'


let store = createStore(Recipes, ["david"]);

ReactDOM.render(
    <Provider store={store}>
        <Input />
    </Provider>,
    document.getElementById('app')
);


