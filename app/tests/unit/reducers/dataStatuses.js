import test from 'tape'
import * as reducer from '../../../reducers/dataStatuses'
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  IS_DATA_BEING_FETCHED,
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAILURE,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAILURE
} from '../../../actions/actionTypes'

const getInitialState = process => ({ [process]: false, error: '' })

// dataFetching reducer tests
test('app/reducers/dataStatuses/dataFetching: no action', t => {
  const initialState = getInitialState('fetching')

  t.deepEqual(
    initialState,
    reducer.dataFetching(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/dataStatuses/dataFetching: ${IS_DATA_BEING_FETCHED}`, t => {
  const initialState = getInitialState('fetching')
  const actual = reducer.dataFetching(initialState, {
    type: IS_DATA_BEING_FETCHED
  })

  const expected = { fetching: true, error: '' }

  t.deepEqual(actual, expected, 'set data fetching status to true')

  t.end()
})

test(`app/reducers/dataStatuses/dataFetching: ${FETCH_DATA_SUCCESS}`, t => {
  const initialState = getInitialState('fetching')
  const actual = reducer.dataFetching(initialState, {
    type: FETCH_DATA_SUCCESS
  })

  const expected = { fetching: false, error: '' }

  t.deepEqual(actual, expected, 'set data fetching status to false')

  t.end()
})

test(`app/reducers/dataStatuses/dataFetching: ${FETCH_DATA_FAILURE}`, t => {
  const initialState = getInitialState('fetching')
  const notFoundError = {
    code: 404,
    message: 'Not found'
  }
  const actual = reducer.dataFetching(initialState, {
    type: FETCH_DATA_FAILURE,
    payload: {
      error: notFoundError
    }
  })

  const expected = { fetching: false, error: notFoundError }

  t.deepEqual(
    actual,
    expected,
    'set data fetching status to false with an error'
  )

  t.end()
})

// recipeSaving reducer tests
test('app/reducers/dataStatuses/recipeSaving: no action', t => {
  const initialState = getInitialState('saving')

  t.deepEqual(
    initialState,
    reducer.recipeSaving(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/dataStatuses/recipeSaving: ${ADD_RECIPE_REQUEST}`, t => {
  const initialState = getInitialState('saving')
  const actual = reducer.recipeSaving(initialState, {
    type: ADD_RECIPE_REQUEST
  })

  const expected = { saving: true, error: '' }

  t.deepEqual(actual, expected, 'set recipe saving status to true')

  t.end()
})

test(`app/reducers/dataStatuses/recipeSaving: ${ADD_RECIPE_SUCCESS}`, t => {
  const initialState = getInitialState('saving')
  const actual = reducer.recipeSaving(initialState, {
    type: ADD_RECIPE_SUCCESS
  })

  const expected = { saving: false, error: '' }

  t.deepEqual(actual, expected, 'set recipe saving status to false')

  t.end()
})

test(`app/reducers/dataStatuses/recipeSaving: ${ADD_RECIPE_FAILURE}`, t => {
  const initialState = getInitialState('saving')
  const notFoundError = {
    code: 404,
    message: 'Not found'
  }
  const actual = reducer.recipeSaving(initialState, {
    type: ADD_RECIPE_FAILURE,
    payload: {
      error: notFoundError
    }
  })

  const expected = { saving: false, error: notFoundError }

  t.deepEqual(
    actual,
    expected,
    'set recipe saving status to false with an error'
  )

  t.end()
})

// recipeDeleting reducer tests
test('app/reducers/dataStatuses/recipeDeleting: no action', t => {
  const initialState = getInitialState('deleting')

  t.deepEqual(
    initialState,
    reducer.recipeDeleting(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/dataStatuses/recipeDeleting: ${
  DELETE_RECIPE_REQUEST
}`, t => {
  const initialState = getInitialState('deleting')
  const actual = reducer.recipeDeleting(initialState, {
    type: DELETE_RECIPE_REQUEST
  })

  const expected = { deleting: true, error: '' }

  t.deepEqual(actual, expected, 'set recipe deleting status to true')

  t.end()
})

test(`app/reducers/dataStatuses/recipeDeleting: ${
  DELETE_RECIPE_SUCCESS
}`, t => {
  const initialState = getInitialState('deleting')
  const actual = reducer.recipeDeleting(initialState, {
    type: DELETE_RECIPE_SUCCESS
  })

  const expected = { deleting: false, error: '' }

  t.deepEqual(actual, expected, 'set recipe deleting status to false')

  t.end()
})

test(`app/reducers/dataStatuses/recipeDeleting: ${
  DELETE_RECIPE_FAILURE
}`, t => {
  const initialState = getInitialState('deleting')
  const notFoundError = {
    code: 404,
    message: 'Not found'
  }
  const actual = reducer.recipeDeleting(initialState, {
    type: DELETE_RECIPE_FAILURE,
    payload: {
      error: notFoundError
    }
  })

  const expected = { deleting: false, error: notFoundError }

  t.deepEqual(
    actual,
    expected,
    'set recipe deleting status to false with an error'
  )

  t.end()
})
