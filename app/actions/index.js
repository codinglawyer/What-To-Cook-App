import uuidV4 from 'uuid';

const addRecipe = (text) => ({
    type: 'ADD_RECIPE',
    id: uuidV4(),
    text,
});

export default addRecipe;
