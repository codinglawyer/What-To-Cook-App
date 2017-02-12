import React from 'react';

const DisplayedRecipe = ({displayedRecipe}) => {
    return (
        <div>
            <h2>Recipe detail:</h2>
            <h3>{displayedRecipe.title}</h3>
            <div><strong>Directions:</strong>
                <div>{displayedRecipe.directions}</div>
            </div>
            <br/>
            <div><strong>Ingredients:</strong>
                <ul>
                    {displayedRecipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>{ingredient.ingredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DisplayedRecipe;
