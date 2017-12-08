import test from 'tape'
import * as reducer from '../../../reducers/index'
import {
  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED
} from '../../../actions/actionTypes'

const getInitialState = () => false

test('app/reducers/index/connectionStatus: no action', t => {
  const initialState = getInitialState()

  t.deepEqual(
    initialState,
    reducer.connectionStatus(undefined, {}),
    'should return the initial state'
  )

  t.end()
})

test(`app/reducers/index/connectionStatus: ${FIREBASE_CONNECTED}`, t => {
  const initialState = getInitialState()
  const actual = reducer.connectionStatus(initialState, {
    type: FIREBASE_CONNECTED
  })

  const expected = true

  t.deepEqual(actual, expected, 'set Firebase connection status to true')

  t.end()
})

test(`app/reducers/index/connectionStatus: ${FIREBASE_DISCONNECTED}`, t => {
  const initialState = getInitialState()
  const actual = reducer.connectionStatus(initialState, {
    type: FIREBASE_DISCONNECTED
  })

  const expected = false

  t.deepEqual(actual, expected, 'set Firebase connection status to false')

  t.end()
})
