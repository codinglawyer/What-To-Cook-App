import test from 'tape'
import sagaWrapper from '../utils/sagaWrapper'
import { channel } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { connectionStatusChange } from '../../../sagas/databaseConnection'

test('app/sagas/databaseConnection: success', t => {
  let chan = channel()
  const saga = sagaWrapper(connectionStatusChange())

  t.deepEqual(saga.next(chan).value, call(channel), 'should spawn a Channel')

  t.deepEqual(
    saga.next(chan).value,
    take(chan),
    'should wait for a specified message from the provided Channel'
  )

  t.deepEqual(
    saga.next().value,
    put(chan),
    'should dispatch an action to the store'
  )

  t.end()
})
