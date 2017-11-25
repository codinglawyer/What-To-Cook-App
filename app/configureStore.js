import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import RootReducer from './reducers/index'
import rootSaga from './sagas/sagas'

const configureStore = () => {
  const logger = createLogger()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    RootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger, sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
