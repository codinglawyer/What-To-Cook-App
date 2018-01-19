import connectionStatus from './connectionStatus'
import databaseUpdate from './databaseUpdate'
import addRecipe from './addRecipe'
import deleteRecipe from './deleteRecipe'

export default function * rootSaga () {
  yield [
    addRecipe(),
    deleteRecipe(),
    connectionStatus(),
    databaseUpdate()
  ]
}
