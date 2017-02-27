import { combineReducers } from 'redux';
import { omit } from 'lodash';

const byId = (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_RECIPES_SUCCESS':
            let newState = {};
            for(let key in action.payload){
                newState[action.payload[key].id] = action.payload[key]
            }
            return newState;
        case 'ADD_RECIPE':
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case 'DELETE_RECIPE':
            return omit(state, action.payload);
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_RECIPES_SUCCESS':
            return action.payload.map(recipe => recipe.id);
        case 'ADD_RECIPE':
            return [...state, action.payload.id];
        case 'DELETE_RECIPE':
            return state.filter(id => id !== action.payload);
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
    switch (action.type) {
        case 'FETCH_RECIPES_FAILURE':
            return action.payload;
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
