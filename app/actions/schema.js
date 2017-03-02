import { schema } from 'normalizr';

export const recipe = new schema.Entity('recipes');
export const arrayOfRecipes = new schema.Array(recipe);
