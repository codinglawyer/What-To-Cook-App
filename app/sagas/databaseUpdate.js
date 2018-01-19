import firebaseApp from '../api/firebase'
import { eventChannel, buffers } from 'redux-saga'
import { put, take } from 'redux-saga/effects'
import { fetchDataSuccess, fetchDataFailure } from '../actions/index'

export default function * databaseUpdate () {
  const chan = eventChannel(emit => {
    const connectionRef = firebaseApp.database().ref()
    connectionRef.on('value', snapshot => emit(snapshot.val()))
    // don't stop the channel
    return () => {}
  }, buffers.expanding(1))

  while (true) {
    let data = yield take(chan)
    if (data) {
      yield put(fetchDataSuccess(data))
    } else {
      yield put(fetchDataFailure(data))
    }
  }
}
