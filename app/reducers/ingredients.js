import createReducer from '../utils/createReducer'
import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

const ingredientsEntity = createReducer(
  {},
  {
    [FETCH_DATA_SUCCESS] (state, action) {
      const { ingredients } = action.response.entities
      // use emptu object if there are no ingredients
      // in such a case server will return no ingredients attribute
      return state.merge(ingredients || {})
    }
  }
)

export default ingredientsEntity
