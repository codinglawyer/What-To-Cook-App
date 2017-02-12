import React from 'react';

const DisplayedRecipe = ({displayedRecipe}) => {
    return (
        <div>
            <h3 className="recipeDetail">Recipe detail:</h3>
            <h1 className="recipeTitle">{displayedRecipe.title}</h1>
            <div className="recipeDirectionsTitle">Directions:</div>
                <div className="recipeDirections">{displayedRecipe.directions}</div>
            <br/>
            <div className="ingredientsTitle">Ingredients:</div>
                <ul className="ingredients">
                    {displayedRecipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.ingredient}</li>
                    ))}
                </ul>
        </div>
    )
}

export default DisplayedRecipe;
