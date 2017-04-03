import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import recipesEntity, * as fromRecipes from './recipes'
import ingredientsEntity, * as fromIngredients from './ingredients'

const connectionStatus = (state = false, action) => {
    switch (action.type) {
        case 'FIREBASE_CONNECTED':
            return true
        case 'FIREBASE_DISCONNECTED':
            return false
        default:
            return state
    }
}

const RootReducer = combineReducers({
    recipesEntity,
    ingredientsEntity,
    connectionStatus,
    form: formReducer
})

export default RootReducer

export const getAllRecipes = state => fromRecipes.getAllRecipes(state.recipesEntity)
export const getRecipe = (state, recipeId) => fromRecipes.getRecipe(state.recipesEntity, recipeId)
export const getIsFetching = state => fromRecipes.getIsFetching(state.recipesEntity)
export const getErrorMessage = state => fromRecipes.getErrorMessage(state.recipesEntity)
export const getAllIngredients = state => fromIngredients.getAllIngredients(state.ingredientsEntity)
export const getCompleteRecipes = (state, getRecipes, getIngredients) => {
    const recipes = getRecipes(state)
    const allIngredients = getIngredients(state)
    const relevantIngredients = recipes.map(recipe => recipe.ingredients.map(elem => ({ [elem]: allIngredients[elem] })))
    const recipesWithIngredients = relevantIngredients.map((ing, i) => ({ ...recipes[i], ingredients: ing }))
    return recipesWithIngredients
}
