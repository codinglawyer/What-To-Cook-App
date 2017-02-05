import React from 'react';
import RecipeDetail from '../containers/RecipeDetail';
import AddRecipe from '../containers/AddRecipe'

const Main = () => {
    return(
        <div>
            <AddRecipe />
            <RecipeDetail />
        </div>
    )
}

export default Main;
