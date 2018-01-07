import Immutable from 'seamless-immutable'
import { combineReducers } from 'redux'
import { get as g } from 'lodash'
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

export const dataFetching = (
  state = Immutable({ fetching: false, error: '' }),
  action
) => {
  switch (action.type) {
    case IS_DATA_BEING_FETCHED:
      return state.merge({ fetching: true, error: '' })
    case FETCH_DATA_SUCCESS:
      return state.merge({ fetching: false, error: '' })
    case FETCH_DATA_FAILURE:
      const { error } = action.payload
      return state.merge({ fetching: false, error })
    default:
      return state
  }
}

export const recipeSaving = (
  state = Immutable({ saving: false, error: '' }),
  action
) => {
  switch (action.type) {
    case ADD_RECIPE_REQUEST:
      return state.merge({ saving: true, error: '' })
    case ADD_RECIPE_SUCCESS:
      return state.merge({ saving: false, error: '' })
    case ADD_RECIPE_FAILURE:
      const { error } = action.payload
      return state.merge({ saving: false, error })
    default:
      return state
  }
}

export const recipeDeleting = (
  state = Immutable({ deleting: false, error: '' }),
  action
) => {
  switch (action.type) {
    case DELETE_RECIPE_REQUEST:
      return state.merge({ deleting: true, error: '' })
    case DELETE_RECIPE_SUCCESS:
      return state.merge({ deleting: false, error: '' })
    case DELETE_RECIPE_FAILURE:
      const { error } = action.payload
      return state.merge({ deleting: false, error })
    default:
      return state
  }
}

const dataStatuses = combineReducers({
  dataFetching,
  recipeSaving,
  recipeDeleting
})

export default dataStatuses

const getFromState = (state, name) => g(state, name)

// selectors
export const getIsDataFetching = state => {
  return getFromState(state, 'dataFetching')
}
export const getIsRecipeSaving = state => getFromState(state, 'recipeSaving')
export const getIsRecipeDeleting = state =>
  getFromState(state, 'recipeDeleting')
