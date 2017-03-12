import React from 'react';
import RecipeForm from '../../components/forms/RecipeForm';

const CreateRecipeScreen = ({ ...props }) => (
    <RecipeForm params={props}/>
);

export default CreateRecipeScreen;

//TODO must be connected to the store - it should be a container
