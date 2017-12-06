import test from 'tape'
import * as reducer from '../../../reducers/recipes'
import { FETCH_DATA_SUCCESS } from '../../../actions/actionTypes'

const getInitialStateById = () => ({})
const getInitialStateAllIds = () => []

test('app/reducers/recipes/byId: no action', t => {
  const initialState = getInitialStateById()
  t.deepEqual(
    initialState,
    reducer.byId(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/recipes/byId: ${FETCH_DATA_SUCCESS}`, t => {
  const initialState = getInitialStateById()
  const actual = reducer.byId(initialState, {
    type: FETCH_DATA_SUCCESS,
    payload: {
      entities: {
        recipes: {
          '123abc': 'recipe'
        }
      }
    }
  })

  const expected = {
    ...initialState,
    ...{ '123abc': 'recipe' }
  }

  t.deepEqual(actual, expected, 'set recipes as the state')

  t.end()
})

test('app/reducers/recipes/allIds: no action', t => {
  const initialState = getInitialStateAllIds()
  t.deepEqual(
    initialState,
    reducer.allIds(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/recipes/allIds: ${FETCH_DATA_SUCCESS}`, t => {
  const initialState = getInitialStateAllIds()
  const actual = reducer.allIds(initialState, {
    type: FETCH_DATA_SUCCESS,
    payload: {
      entities: {
        recipes: {
          '123abc': 'recipe'
        }
      }
    }
  })

  const expected = [...initialState, ...['123abc']]

  t.deepEqual(actual, expected, 'set recipes ids as a state')

  t.end()
})
