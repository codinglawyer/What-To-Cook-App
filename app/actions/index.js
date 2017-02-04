import uuidV4 from 'uuid';

export const addRecipe = (text) => ({
    type: 'ADD_RECIPE',
    id: uuidV4(),
    text,
});

export const deleteRecipe = (id) => ({
    type: 'DELETE_RECIPE',
    id,
});

