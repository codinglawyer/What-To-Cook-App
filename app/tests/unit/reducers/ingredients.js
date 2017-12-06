import test from 'tape'
import reducer from '../../../reducers/ingredients'
import { FETCH_DATA_SUCCESS } from '../../../actions/actionTypes'

const getInitialState = () => ({})

test('app/reducers/ingredients: no action', t => {
  const initialState = getInitialState()
  t.deepEqual(
    initialState,
    reducer(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/ingredients: ${FETCH_DATA_SUCCESS}`, t => {
  const initialState = getInitialState()
  const actual = reducer(initialState, {
    type: FETCH_DATA_SUCCESS,
    payload: {
      entities: {
        recipes: {
          '123abc': 'recipe'
        },
        ingredients: {
          '456def': 'ingredient'
        }
      }
    }
  })

  const expected = {
    ...initialState,
    ...{ '456def': 'ingredient' }
  }

  t.deepEqual(actual, expected, 'set ingredients as the state')

  t.end()
})
