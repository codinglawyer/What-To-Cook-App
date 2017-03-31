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


export const deleteRecipeRequest = (id) => {
 console.log("REQU")
    return {
     type: 'DELETE_RECIPE_REQUEST',
     payload: id,
}}

export const deleteRecipeSuccess = ({ response }) => ({
    type: 'DELETE_RECIPE_SUCCESS',
    payload: normalize(response, schema.arrayOfRecipes),
});

export const deleteRecipeFailure = ({ error }) => {
console.log("ERROR");
   return {type: 'DELETE_RECIPE_FAILURE',
    payload: error.message,
}}


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
