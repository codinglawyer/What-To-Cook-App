import createReducer from '../utils/createReducer'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED
} from '../actions/actionTypes'
import recipesEntity from './recipes'
import ingredientsEntity from './ingredients'
import dataStatuses from './dataStatuses'

export const connectionStatus = createReducer(false, {
  [FIREBASE_CONNECTED] (state, action) {
    return true
  },
  [FIREBASE_DISCONNECTED] (state, action) {
    return false
  }
})

const RootReducer = combineReducers({
  recipesEntity,
  ingredientsEntity,
  connectionStatus,
  dataStatuses,
  form: formReducer
})

export default RootReducer
