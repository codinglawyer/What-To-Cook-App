import { takeEvery, call, put } from 'redux-saga/effects'
import { DELETE_RECIPE_REQUEST } from '../actions/actionTypes'
import { deleteRecipeSuccess, deleteRecipeFailure } from '../actions/index'

import firebaseApp from '../api/firebase'

const getRecipesPath = recipeId => `/entities/recipes/${recipeId}`

const getIngredientsPath = ingredientId =>
  `/entities/ingredients/${ingredientId}`

export function * deleteRecipe ({ recipeId, ingredientsIds }) {
  for (let i = 0; ingredientsIds.length > i; i++) {
    const ref = firebaseApp
      .database()
      .ref(getIngredientsPath(ingredientsIds[i]))
    yield call([ref, ref.remove])
  }
  try {
    const ref = firebaseApp.database().ref(getRecipesPath(recipeId))
    yield call([ref, ref.remove])
    yield put(deleteRecipeSuccess())
  } catch (error) {
    yield put(deleteRecipeFailure())
  }
}

export default function * watchDeleteRecipe () {
  yield takeEvery(DELETE_RECIPE_REQUEST, deleteRecipe)
}
