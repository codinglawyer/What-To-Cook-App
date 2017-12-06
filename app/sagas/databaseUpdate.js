import { channel } from 'redux-saga'
import { put, take, call } from 'redux-saga/effects'
import firebaseApp from '../api/firebase'
import * as actions from '../actions/index'

export function * databaseUpdate () {
  const databaseUpdateChannel = yield call(channel)
  const databaseUpdate = databaseUpdateWrapper(databaseUpdateChannel)
  const connectionRef = firebaseApp.database().ref()
  connectionRef.on('value', databaseUpdate)

  while (true) {
    const action = yield take(databaseUpdateChannel)
    yield put(action)
  }
}

const databaseUpdateWrapper = channel => snapshot => {
  if (snapshot.val()) {
    channel.put(actions.fetchDataSuccess(snapshot.val()))
  } else {
    channel.put(actions.fetchDataFailure(snapshot.val()))
  }
}

export default function * watchDatabaseUpdate () {
  yield call(databaseUpdate)
}
