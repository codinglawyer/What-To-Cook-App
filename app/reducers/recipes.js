import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
    const {payload} = action;
    switch(action.type) {
        case 'FETCH_DATA_SUCCESS':
        case 'ADD_RECIPE_SUCCESS':
            return {
                ...state,
                ...payload.entities.recipes,
            };
        case 'DELETE_RECIPE_SUCCESS':
            return payload.entities.recipes;
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    const {payload} = action;
    switch(action.type) {
        case 'FETCH_DATA_SUCCESS':
            return [...state, ...payload.result];
        case 'ADD_RECIPE_SUCCESS':
            return [...state, payload.result];
        case 'DELETE_RECIPE_SUCCESS':
            return payload.result;
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return true;
        case 'FETCH_DATA_SUCCESS':
        case 'FETCH_DATA_FAILURE':
            return false;
        default:
            return state;
    }
};

//TODO test if the error works with Firebase
const errorMessage = (state = null, action) => {
    const {payload} = action;
    switch (action.type) {
        case 'FETCH_DATA_FAILURE':
            return payload;
        case 'FETCH_DATA_REQUEST':
        case 'FETCH_DATA_SUCCESS':
            return null;
        default:
            return state;
    }
};

const recipesEntity = combineReducers({
    byId,
    allIds,
    isFetching,
    errorMessage,
});

export default recipesEntity;

export const getAllRecipes = (state) => state.allIds.map(id => state.byId[id]);
export const getRecipe = (state, recipeId) => state.byId[recipeId];
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;

