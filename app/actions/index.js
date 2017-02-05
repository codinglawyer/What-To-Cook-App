export const addRecipe = (recipeData) => ({
    type: 'ADD_RECIPE',
    recipeData,
});

export const deleteRecipe = (id) => ({
    type: 'DELETE_RECIPE',
    id,
});

