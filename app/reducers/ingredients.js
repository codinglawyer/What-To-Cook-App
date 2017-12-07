import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

const ingredientsEntity = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { ingredients } = action.payload.entities
      return { ...ingredients }
    default:
      return state
  }
}

export default ingredientsEntity

// selectors
export const getAllIngredients = state => state
