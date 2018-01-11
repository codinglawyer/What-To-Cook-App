import createReducer from '../utils/createReducer'
import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

const ingredientsEntity = createReducer(
  {},
  {
    [FETCH_DATA_SUCCESS] (state, action) {
      const { ingredients } = action.response.entities
      return state.merge(ingredients)
    }
  }
)

export default ingredientsEntity

// selectors
export const getAllIngredients = state => state
