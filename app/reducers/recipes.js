const Recipes = (state = [], action) => {
    console.log("action", action);
    switch(action.type) {
        case 'ADD_RECIPE':
            return [
                ...state, {
                'id': action.id,
                'recipe': action.text}
            ];
        default:
            return state;
    }
};

export default Recipes;
