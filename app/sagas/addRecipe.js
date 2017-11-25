import { takeEvery, select } from 'redux-saga/effects'
import { v4 } from 'uuid'
import { get as g, map, keys } from 'lodash'
import { pipe } from 'lodash/fp'
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

function * addRecipe () {
  const formData = yield select(state => state.form.recipeForm.values)
  const ingredientsIds = createNewIngredientsIds(formData.ingredients)
  const ingredientsUpdates = pipe(getIngredientsUpdates, arrayToObject)(
    formData.ingredients,
    ingredientsIds
  )
  const recipesUpdates = pipe(createRecipe, getRecipesUpdates)(
    formData,
    ingredientsIds
  )
  const updates = { ...ingredientsUpdates, ...recipesUpdates }
  firebaseApp
    .database()
    .ref()
    .update(updates, addRecipe)
    .then(() => console.log('Recipes addition successful'))
    .catch(() => console.log('Recipes addition failed'))
}

export default function * watchAddRecipe () {
  yield takeEvery('ADD_RECIPE_REQUEST', addRecipe)
}
