import firebaseApp from '../api/firebase'
import { eventChannel, buffers } from 'redux-saga'
import { put, take } from 'redux-saga/effects'
import { connected, disconnected } from '../actions'

export default function * connectionStatus () {
  const chan = eventChannel(emit => {
    const connectionRef = firebaseApp.database().ref('.info/connected')
    connectionRef.on('value', snapshot => emit(snapshot.val()))
    // don't stop the channel
    return () => {}
  }, buffers.expanding(1))

  while (true) {
    let isConnected = yield take(chan)
    if (isConnected) {
      yield put(connected())
    } else {
      yield put(disconnected())
    }
  }
}
