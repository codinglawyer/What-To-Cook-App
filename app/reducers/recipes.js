import Immutable from 'seamless-immutable'
import createReducer from '../utils/createReducer'
import { combineReducers } from 'redux'
import { keys } from 'lodash'
import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

export const byId = createReducer(
  {},
  {
    [FETCH_DATA_SUCCESS] (state, action) {
      const { recipes } = action.response.entities
      // use emptu object if there are no recipes
      // in such a case server will return no recipes attribute
      return state.merge(recipes || {})
    }
  }
)

export const allIds = createReducer([], {
  [FETCH_DATA_SUCCESS] (state, action) {
    const { recipes } = action.response.entities
    return Immutable(keys(recipes))
  }
})

const recipesEntity = combineReducers({
  byId,
  allIds
})

export default recipesEntity
