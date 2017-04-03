import { takeEvery, select } from 'redux-saga/effects'
import { v4 } from 'node-uuid'
import firebaseApp from '../api/firebase'

function * addRecipe () {
    const formData = yield select(state => state.form.form.values)
    const updates = {}
    const ingredientsIds = []
    formData.ingredients.map(ingredient => {
        const ingredientId = v4()
        updates[`/entities/ingredients/${ingredientId}`] = ingredient
        ingredientsIds.push(ingredientId)
    })
    const recipeId = v4()
    const recipe = {
        id: recipeId,
        title: formData.title,
        directions: formData.directions,
        servings: formData.servings,
        ingredients: ingredientsIds
    }
    updates[`/entities/recipes/${recipeId}`] = recipe
    firebaseApp.database().ref().update(updates, addRecipe)
        .then(() => console.log('Recipes addition successful'))
        .catch(() => console.log('Recipes addition failed'))
}

export default function * watchAddRecipe () {
    yield takeEvery('ADD_RECIPE_REQUEST', addRecipe)
}
