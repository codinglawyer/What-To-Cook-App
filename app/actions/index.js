import * as actionTypes from './actionTypes'

export const connected = () => ({
    type: actionTypes.FIREBASE_CONNECTED
})

export const disconnected = () => ({
    type: actionTypes.FIREBASE_DISCONNECTED
})

export const fetchDataRequest = () => ({
    type: actionTypes.FETCH_DATA_REQUEST
})

export const fetchDataSuccess = response => ({
    type: actionTypes.FETCH_DATA_SUCCESS,
    payload: response
})

export const fetchDataFailure = ({ error }) => ({
    type: actionTypes.FETCH_DATA_FAILURE,
    payload: error.message
})

export const addRecipeRequest = () => ({
    type: actionTypes.ADD_RECIPE_REQUEST
})

export const deleteRecipeRequest = (recipeId, ingredientsIds) => ({
    type: actionTypes.DELETE_RECIPE_REQUEST,
    ingredientsIds,
    recipeId
})
