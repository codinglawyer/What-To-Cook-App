const Recipes = (state = [], action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return [
                ...state,
                {
                    'id': action.id,
                    'recipe': action.text
                }
            ];
        case 'DELETE_RECIPE':
            return state.filter(recipe => {
                return recipe.id !== action.id
            })
        default:
            return state;
    }
};

export default Recipes;
