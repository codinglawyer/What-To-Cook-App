import { channel } from 'redux-saga'
import { put, call, take } from 'redux-saga/effects'
import firebaseApp from '../api/firebase'
import * as actions from '../actions/index'

export function * connectionStatusChange () {
  const connectionStatusChannel = yield call(channel)
  const connectionStatus = connectionStatusWrapper(connectionStatusChannel)
  const connectionRef = firebaseApp.database().ref('.info/connected')
  // connectionStatus callback will be triggered for the initial data and again whenever the data changes
  connectionRef.on('value', connectionStatus)

  while (true) {
    const action = yield take(connectionStatusChannel)
    yield put(action)
  }
}

export const connectionStatusWrapper = channel => snapshot => {
  if (snapshot.val() === true) {
    channel.put(actions.connected())
  } else {
    channel.put(actions.disconnected())
  }
}

export default function * watchConnectionStatus () {
  yield call(connectionStatusChange)
}
