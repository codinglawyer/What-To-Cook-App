const byIds = (state = [], action) => {
    switch(action.type) {
        case 'ADD_RECIPE':
            return [...state, action.recipeData.id]
        default:
            return state;
    }
};

export default byIds;
