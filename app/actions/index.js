import * as actionTypes from './actionTypes'
import { get as g } from 'lodash'

export const connected = () => ({
  type: g(actionTypes, 'FIREBASE_CONNECTED')
})

export const disconnected = () => ({
  type: g(actionTypes, 'FIREBASE_DISCONNECTED')
})

export const isDataBeingFetched = () => ({
  type: g(actionTypes, 'IS_DATA_BEING_FETCHED')
})

export const fetchDataSuccess = response => ({
  type: g(actionTypes, 'FETCH_DATA_SUCCESS'),
  payload: response
})

export const fetchDataFailure = ({ error }) => ({
  type: g(actionTypes, 'FETCH_DATA_FAILURE'),
  payload: g(error, 'message')
})

export const addRecipeRequest = () => ({
  type: g(actionTypes, 'ADD_RECIPE_REQUEST')
})

export const deleteRecipeRequest = (recipeId, ingredientsIds) => ({
  type: g(actionTypes, 'DELETE_RECIPE_REQUEST'),
  ingredientsIds,
  recipeId
})
