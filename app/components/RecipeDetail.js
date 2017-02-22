import React from 'react';
import * as actions from '../actions/index';
import FlatButton from 'material-ui/FlatButton';

const DisplayedRecipe = ({displayedRecipe, dispatch}) => {
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
            <FlatButton
                label="Delete Recipe"
                secondary={true}
                onClick={() => dispatch(actions.deleteRecipe(displayedRecipe.id))}
            />
        </div>
    )
};

export default DisplayedRecipe;
