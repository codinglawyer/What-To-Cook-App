import connectionStatus from './connectionStatus'
import databaseUpdate from './databaseUpdate'
import watchAddRecipe from './addRecipe'
import watchDeleteRecipe from './deleteRecipe'

export default function * rootSaga () {
  yield [
    watchAddRecipe(),
    watchDeleteRecipe(),
    connectionStatus(),
    databaseUpdate()
  ]
}
