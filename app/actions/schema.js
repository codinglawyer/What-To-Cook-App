import { schema } from 'normalizr';

export const ingredient = new schema.Entity('ingredients');
export const arrayOfIngredients = new schema.Array(ingredient);
export const recipe = new schema.Entity('recipes',
    {
        ingredients: arrayOfIngredients,
    }
);
export const arrayOfRecipes = new schema.Array(recipe);
