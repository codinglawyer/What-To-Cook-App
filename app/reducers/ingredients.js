const ingredientsEntity = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'FETCH_RECIPES_SUCCESS':
        case 'ADD_RECIPE_SUCCESS':
            return {
                ...state,
                ...payload.entities.ingredients,
            };
        default:
            return state;

    }
};

export default ingredientsEntity;

export const getAllIngredients = state => state;
