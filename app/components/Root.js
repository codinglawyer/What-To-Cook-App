import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import Main from '../containers/Main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Main} />
            </Router>
        </MuiThemeProvider>
    </Provider>
);

export default Root;
