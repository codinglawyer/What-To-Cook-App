import { combineReducers } from 'redux';
import { omit } from 'lodash';

const byId = (state = {}, action) => {
    const {payload} = action;
    switch(action.type) {
        case 'FETCH_RECIPES_SUCCESS':
        case 'ADD_RECIPE_SUCCESS':
            return {
                ...state,
                ...payload.entities.recipes,
            };
        case 'DELETE_RECIPE':
            return omit(state, payload);
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    const {payload} = action;
    switch(action.type) {
        case 'FETCH_RECIPES_SUCCESS':
            return [...state, ...payload.result];
        case 'ADD_RECIPE_SUCCESS':
            return [...state, payload.result];
        case 'DELETE_RECIPE':
            return state.filter(id => id !== payload);
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_RECIPES_REQUEST':
            return true;
        case 'FETCH_RECIPES_SUCCESS':
        case 'FETCH_RECIPES_FAILURE':
            return false;
        default:
            return state;
    }
}

const errorMessage = (state = null, action) => {
    const {payload} = action;
    switch (action.type) {
        case 'FETCH_RECIPES_FAILURE':
            return payload;
        case 'FETCH_RECIPES_REQUEST':
        case 'FETCH_RECIPES_SUCCESS':
            return null;
        default:
            return state;
    }
}

const recipes = combineReducers({
    byId,
    allIds,
    isFetching,
    errorMessage,
});

export default recipes;

export const getAllRecipes = (state) => state.allIds.map(id => state.byId[id]);
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
