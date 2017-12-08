import test from 'tape'
import sagaWrapper from '../utils/sagaWrapper'
import { select, call, put } from 'redux-saga/effects'
import {
  addRecipe,
  formValuesSelector,
  getUpdates
} from '../../../sagas/addRecipe'
import { addRecipeSuccess, addRecipeFailure } from '../../../actions/index'
import firebaseApp from '../../../api/firebase'

test('app/sagas/addRecipe: success', t => {
  const formData = []
  const updates = []
  const ingredientsIds = []
  const ref = firebaseApp.database().ref()
  const transferResult = {}

  const saga = sagaWrapper(addRecipe())

  t.deepEqual(
    saga.next(formData).value,
    select(formValuesSelector),
    'should select `formData` from the state'
  )

  t.deepEqual(
    saga.next(updates).value,
    call(getUpdates, formData, ingredientsIds),
    'should get recipes update data'
  )

  t.deepEqual(
    saga.next(transferResult).value,
    call([ref, ref.update], updates, addRecipe),
    'should save data to Firebase'
  )

  t.deepEqual(
    saga.next().value,
    put(addRecipeSuccess()),
    'should dispatch add recipe success action'
  )

  t.ok(saga.next().done, 'should finish saga')

  t.end()
})

test('app/sagas/addRecipe: failure', t => {
  const formData = []
  const updates = []
  const ingredientsIds = []
  const notFoundError = {
    code: 404,
    message: 'Not found'
  }
  const ref = firebaseApp.database().ref()

  const saga = sagaWrapper(addRecipe())

  t.deepEqual(
    saga.next(formData).value,
    select(formValuesSelector),
    'should select `formData` from the state'
  )

  t.deepEqual(
    saga.next(updates).value,
    call(getUpdates, formData, ingredientsIds),
    'should get recipes update data'
  )

  t.deepEqual(
    saga.throw(notFoundError).value,
    call([ref, ref.update], updates, addRecipe),
    'should throw an error when saving data to Firebase fails'
  )

  t.deepEqual(
    saga.next(notFoundError).value,
    put(addRecipeFailure(notFoundError)),
    'should dispatch add recipe failure action'
  )

  t.ok(saga.next().done, 'should finish saga')

  t.end()
})
