import { normalize } from 'normalizr';
import * as schema from './schema';

export const fetchDataRequest = () => ({
    type: 'FETCH_DATA_REQUEST',
});

export const fetchDataSuccess = ( response ) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload:response,
});

export const fetchDataFailure = ({ error }) => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error.message,
});


export const addRecipeRequest = () => ({
    type: 'ADD_RECIPE_REQUEST',
});

export const addRecipeSuccess = () => ({
    type: 'ADD_RECIPE_SUCCESS',
})

export const addRecipeFailure = ({ error }) => ({
    type: 'ADD_RECIPE_FAILURE',
    payload: error.message,
});


export const deleteRecipeRequest = (recipeId, ingredientsIds) => {
 console.log("REQU")
    return {
     type: 'DELETE_RECIPE_REQUEST',
     ingredientsIds,
     payload: recipeId,
}}

export const deleteRecipeSuccess = () => ({
    type: 'DELETE_RECIPE_SUCCESS',
});

export const deleteRecipeFailure = () => ({
   type: 'DELETE_RECIPE_FAILURE',
});


export const connected = () => {
    return {
        type: 'FIREBASE_CONNECTED',
    };
};

export const disconnected = () => {
    return {
        type: 'FIREBASE_DISCONNECTED',
    };
};
