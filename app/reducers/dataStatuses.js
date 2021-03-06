import createReducer from '../utils/createReducer'
import { combineReducers } from 'redux'
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  IS_DATA_BEING_FETCHED,
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
} from '../actions/actionTypes'

export const dataFetching = createReducer(
  { fetching: false, error: '' },
  {
    [IS_DATA_BEING_FETCHED] (state, action) {
      return state.merge({ fetching: true, error: '' })
    },
    [FETCH_DATA_SUCCESS] (state, action) {
      return state.merge({ fetching: false, error: '' })
    },
    [FETCH_DATA_FAILURE] (state, action) {
      const { message } = action.error
      return state.merge({ fetching: false, error: message })
    }
  }
)

export const recipeSaving = createReducer(
  { saving: false, error: '' },
  {
    [ADD_RECIPE_REQUEST] (state, action) {
      return state.merge({ saving: true, error: '' })
    },
    [ADD_RECIPE_SUCCESS] (state, action) {
      return state.merge({ saving: false, error: '' })
    },
    [ADD_RECIPE_FAILURE] (state, action) {
      const { message } = action.error
      return state.merge({ saving: false, error: message })
    }
  }
)

export const recipeDeleting = createReducer(
  { deleting: false, error: '' },
  {
    [DELETE_RECIPE_REQUEST] (state, action) {
      return state.merge({ deleting: true, error: '' })
    },
    [DELETE_RECIPE_SUCCESS] (state, action) {
      return state.merge({ deleting: false, error: '' })
    },
    [DELETE_RECIPE_FAILURE] (state, action) {
      const { message } = action.error
      return state.merge({ deleting: false, error: message })
    }
  }
)

const dataStatuses = combineReducers({
  dataFetching,
  recipeSaving,
  recipeDeleting
})

export default dataStatuses
