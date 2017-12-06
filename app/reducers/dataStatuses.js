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

export const dataFetching = (state = {}, action) => {
  switch (action.type) {
    case IS_DATA_BEING_FETCHED:
      return { fetching: true, error: '' }
    case FETCH_DATA_SUCCESS:
      return { fetching: false, error: '' }
    case FETCH_DATA_FAILURE:
      const { error } = action.payload
      return { fetching: false, error }
    default:
      return state
  }
}

export const recipeSaving = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECIPE_REQUEST:
      return { saving: true, error: '' }
    case ADD_RECIPE_SUCCESS:
      return { saving: false, error: '' }
    case ADD_RECIPE_FAILURE:
      const { error } = action.payload
      return { saving: false, error }
    default:
      return state
  }
}

export const recipeDeleting = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RECIPE_REQUEST:
      return { deleting: true, error: '' }
    case DELETE_RECIPE_SUCCESS:
      return { deleting: false, error: '' }
    case DELETE_RECIPE_FAILURE:
      const { error } = action.payload
      return { deleting: false, error }
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
