import Immutable from 'seamless-immutable'
import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

const ingredientsEntity = (state = Immutable({}), action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { ingredients } = action.payload.entities
      return state.merge(ingredients)
    default:
      return state
  }
}

export default ingredientsEntity

// selectors
export const getAllIngredients = state => state
