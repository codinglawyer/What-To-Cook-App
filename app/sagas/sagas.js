import watchConnectionStatus from './databaseConnection'
import watchDatabaseUpdate from './databaseUpdate'
import watchAddRecipe from './addRecipe'
import watchDeleteRecipe from './deleteRecipe'

export default function * rootSaga () {
    yield [
        watchAddRecipe(),
        watchDeleteRecipe(),
        watchConnectionStatus(),
        watchDatabaseUpdate()
    ]
}
