import { normalize } from 'normalizr';
import * as schema from './schema';

export const fetchRecipesRequest = () => ({
    type: 'FETCH_RECIPES_REQUEST',
});

export const fetchRecipesSuccess = ({ response }) => ({
    type: 'FETCH_RECIPES_SUCCESS',
    payload: normalize(response, schema.arrayOfRecipes),
});

export const fetchRecipesFailure = ({ error }) => ({
    type: 'FETCH_RECIPES_FAILURE',
    payload: error.message,
});


export const addRecipeRequest = () => ({
    type: 'ADD_RECIPE_REQUEST',
});

export const addRecipeSuccess = ({ response }) => ({
    type: 'ADD_RECIPE_SUCCESS',
    payload: normalize(response, schema.recipe),
});

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

export const fetchDataSuccess = (recipe) => {
    return {
        type: 'FETCH_DATA_SUCCESS',
        payload: recipe,
    };
};
