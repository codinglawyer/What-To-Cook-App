import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './configureStore'
import Root from './components/Root'

import './styles/global-styles'

const store = configureStore()
injectTapEventPlugin()

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('app')
)
