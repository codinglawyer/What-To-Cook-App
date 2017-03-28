const ingredientsEntity = (state = {}, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
        //case 'ADD_RECIPE_SUCCESS':
            return { ...payload.entities.ingredients };
        default:
            return state;

    }
};

export default ingredientsEntity;

export const getAllIngredients = state => state;
