import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { getDisplayedRecipe } from '../reducers/index';
import * as actions from '../actions/index';


const DisplayedRecipe = ({displayedRecipe, params }) => {
    console.log("PARAMS", params);
    return (
        <div>
            <h3 className="recipeDetail">Recipe detail:</h3>
            <h1 className="recipeTitle">{displayedRecipe.title}</h1>
            <div className="recipeDirectionsTitle">Directions:</div>
            <ul className="directions">
                {displayedRecipe.directions.map(direction => (
                    <li className="recipeDirections" key={direction}>{direction}</li>
                ))}
            </ul>
            <br/>F
            <div className="ingredientsTitle">Ingredients:</div>
            <ul className="ingredients">
                {displayedRecipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.ingredient}</li>
                ))}
            </ul>
            <FlatButton
                label="Delete Recipe"
                secondary={true}
                onClick={() => actions.deleteRecipeRequest()}
            />
            <Link to="/recipeForm">
                Click
            </Link>
            <FlatButton
                label="Load Values"
                default={true}
                type="button"
                onClick={() => actions.loadRecipeToForm({displayedRecipeId: params.id})}
            />
        </div>
    )
};

const mapStateToProps = (state) => ({
    displayedRecipe: getDisplayedRecipe(state)[0],
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DisplayedRecipe);

