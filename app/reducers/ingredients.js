import { FETCH_DATA_SUCCESS } from '../actions/actionTypes'

const ingredientsEntity = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      const { payload } = action
      return { ...payload.entities.ingredients }
    default:
      return state
  }
}

export default ingredientsEntity

// selectors
export const getAllIngredients = state => state
