import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import RootReducer from './reducers/index'
import rootSaga from './sagas/sagas'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    RootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export default configureStore
