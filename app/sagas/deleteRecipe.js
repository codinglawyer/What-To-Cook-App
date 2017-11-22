import { takeEvery } from 'redux-saga/effects'
import firebaseApp from '../api/firebase'

function * deleteRecipe ({ recipeId, ingredientsIds }) {
  ingredientsIds.map(
    id =>
      setTimeout(() =>
        firebaseApp
          .database()
          .ref()
          .child('entities')
          .child('ingredients')
          .child(id)
          .remove()
      ),
    100
  )
  firebaseApp
    .database()
    .ref()
    .child('entities')
    .child('recipes')
    .child(recipeId)
    .remove()
    .then(() => console.log('Recipe deletion successful'))
    .catch(() => console.log('Recipe deletion failed'))
}

export default function * watchDeleteRecipe () {
  yield takeEvery('DELETE_RECIPE_REQUEST', deleteRecipe)
}
