import 'regenerator-runtime/runtime'
import { takeEvery, select, call, put } from 'redux-saga/effects'
import { v4 } from 'uuid'
import { get as g, map, keys } from 'lodash'
import { pipe } from 'lodash/fp'
import { ADD_RECIPE_REQUEST } from '../actions/actionTypes'
import { addRecipeSuccess, addRecipeFailure } from '../actions/index'
import firebaseApp from '../api/firebase'

const createNewIngredientsIds = ingredients =>
  map(ingredients, ingredient => v4())

const getIngredientsUpdates = (ingredients, ingredientIds) =>
  map(ingredients, (ingredient, i) => ({
    [`/entities/ingredients/${ingredientIds[i]}`]: ingredient
  }))

const arrayToObject = arr =>
  arr.reduce((acc, item, i) => {
    let key = keys(item)
    acc[key] = item[key]
    return acc
  }, {})

const getRecipesUpdates = recipe => {
  const updates = {}
  updates[`/entities/recipes/${g(recipe, 'id')}`] = recipe
  return updates
}

const createRecipe = (
  { title, directions, servings, difficulty, time },
  ingredientsIds
) => ({
  id: v4(),
  title: title,
  directions: directions,
  servings: servings,
  difficulty: difficulty,
  time: time,
  ingredients: ingredientsIds
})

const getUpdates = (formData, ingredientsIds) => {
  const ingredientsUpdates = pipe(getIngredientsUpdates, arrayToObject)(
    formData.ingredients,
    ingredientsIds
  )
  const recipesUpdates = pipe(createRecipe, getRecipesUpdates)(
    formData,
    ingredientsIds
  )
  return { ...ingredientsUpdates, ...recipesUpdates }
}

export function * addRecipe () {
  const formData = yield select(state => state.form.recipeForm.values)
  const ingredientsIds = createNewIngredientsIds(formData.ingredients)
  const updates = yield call(getUpdates, formData, ingredientsIds)

  try {
    const ref = firebaseApp.database().ref()
    yield call([ref, ref.update], updates, addRecipe)
    yield put(addRecipeSuccess())
  } catch (error) {
    yield put(addRecipeFailure(error))
  }
}

export default function * watchAddRecipe () {
  yield takeEvery(ADD_RECIPE_REQUEST, addRecipe)
}
