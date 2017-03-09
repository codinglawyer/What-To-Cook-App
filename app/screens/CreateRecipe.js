import React from 'react';
import RecipeForm from '../components/forms/RecipeForm';

const CreateRecipe = ({ ...props }) => (
    <RecipeForm params={props}/>
);

export default CreateRecipe;

//TODO must be connected to the store - it should be a container
