import test from 'tape'
import sagaWrapper from '../utils/sagaWrapper'
import { call, put } from 'redux-saga/effects'
import {
  deleteRecipe,
  getRecipesPath,
  getIngredientsPath
} from '../../../sagas/deleteRecipe'
import {
  deleteRecipeSuccess,
  deleteRecipeFailure
} from '../../../actions/index'
import firebaseApp from '../../../api/firebase'

test('app/sagas/deleteRecipe: success', t => {
  const action = {
    recipeId: 123,
    ingredientsIds: [1, 2, 3]
  }
  const transferResult = {}

  const saga = sagaWrapper(deleteRecipe(action))
  const { recipeId, ingredientsIds } = action
  for (let i = 0; ingredientsIds.length > i; i++) {
    const ref = firebaseApp
      .database()
      .ref(getIngredientsPath(ingredientsIds[i]))

    t.deepEqual(
      saga.next(transferResult).value,
      call([ref, ref.remove]),
      'should delete ingredients from Firebase'
    )
  }

  const ref = firebaseApp.database().ref(getRecipesPath(recipeId))

  t.deepEqual(
    saga.next(transferResult).value,
    call([ref, ref.remove]),
    'should delete recipe from Firebase'
  )

  t.deepEqual(
    saga.next().value,
    put(deleteRecipeSuccess()),
    'should dispatch recipe successful deletion action'
  )

  t.ok(saga.next().done, 'should finish saga')

  t.end()
})

test('app/sagas/deleteRecipe: failure', t => {
  const action = {
    recipeId: 123,
    ingredientsIds: [1, 2, 3]
  }
  const transferResult = {}
  const notFoundError = {
    code: 404,
    message: 'Not found'
  }

  const saga = sagaWrapper(deleteRecipe(action))
  const { recipeId, ingredientsIds } = action
  for (let i = 0; ingredientsIds.length > i; i++) {
    const ref = firebaseApp
      .database()
      .ref(getIngredientsPath(ingredientsIds[i]))

    t.deepEqual(
      saga.next(transferResult).value,
      call([ref, ref.remove]),
      'should delete ingredients from Firebase'
    )
  }

  const ref = firebaseApp.database().ref(getRecipesPath(recipeId))

  t.deepEqual(
    saga.throw(notFoundError).value,
    call([ref, ref.remove]),
    'should throw an error when delete recipe from Firebase fails'
  )

  t.deepEqual(
    saga.next(notFoundError).value,
    put(deleteRecipeFailure(notFoundError)),
    'should dispatch recipe failure deletion action'
  )

  t.ok(saga.next().done, 'should finish saga')

  t.end()
})
