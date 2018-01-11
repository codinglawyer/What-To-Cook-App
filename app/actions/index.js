import * as actionTypes from './actionTypes'
import createActionCreator from '../utils/createActionCreator'
import { get as g } from 'lodash'

export const connected = createActionCreator(
  g(actionTypes, 'FIREBASE_CONNECTED')
)

export const disconnected = createActionCreator(
  g(actionTypes, 'FIREBASE_DISCONNECTED')
)

export const isDataBeingFetched = createActionCreator(
  g(actionTypes, 'IS_DATA_BEING_FETCHED')
)

export const fetchDataSuccess = createActionCreator(
  g(actionTypes, 'FETCH_DATA_SUCCESS'),
  'response'
)

export const fetchDataFailure = createActionCreator(
  g(actionTypes, 'FETCH_DATA_FAILURE'),
  'error'
)

export const addRecipeRequest = createActionCreator(
  g(actionTypes, 'ADD_RECIPE_REQUEST')
)

export const addRecipeSuccess = createActionCreator(
  g(actionTypes, 'ADD_RECIPE_SUCCESS')
)

export const addRecipeFailure = createActionCreator(
  g(actionTypes, 'ADD_RECIPE_FAILURE'),
  'error'
)

export const deleteRecipeRequest = createActionCreator(
  g(actionTypes, 'DELETE_RECIPE_REQUEST'),
  'recipeId',
  'ingredientsIds'
)

export const deleteRecipeSuccess = createActionCreator(
  g(actionTypes, 'DELETE_RECIPE_SUCCESS')
)

export const deleteRecipeFailure = createActionCreator(
  g(actionTypes, 'DELETE_RECIPE_FAILURE'),
  'error'
)
