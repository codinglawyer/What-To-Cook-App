import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as actions from '../../actions/index';
import { getAllIngredients, getRecipe } from '../../reducers/index';
import FlatButton from 'material-ui/FlatButton';


const mapStateToProps = (state, { params }) => {
    const recipe = getRecipe(state, params.id);
    const allIngredients = getAllIngredients(state);
    const recipeIngredients = recipe.ingredients.map(ingredient => allIngredients[ingredient]);
    return {
        recipe,
        recipeIngredients,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const IngredientList = ({ children, ingredients }) => (
    <div>
        {children(ingredients)}
    </div>
);

const DisplayedRecipeScreen = ({ recipe, recipeIngredients, params }) => {
    return(
        <div>
            <h3 className="recipeDetail">Recipe detail:</h3>
            <h1 className="recipeTitle">{recipe.title}</h1>
            <div className="recipeDirectionsTitle">Directions:</div>
            <ul className="directions">
                {recipe.directions.map(direction => (
                    <li className="recipeDirections"
                        key={direction}
                    >
                        {direction}
                    </li>
                ))}
            </ul>
            <br/>
            <div className="ingredientsTitle">Ingredients:</div>
            <IngredientList ingredients={recipeIngredients}>
                {(ingredients) => ingredients.map((ingredient, i) => (
                    <div
                        key={`${i}-${ingredient}`}
                        className="ingredients"
                    >
                        {ingredient.ingredient}
                    </div>
                ))}
            </IngredientList>
            <FlatButton
                label="Delete Recipe"
                secondary={true}
                onClick={() => actions.deleteRecipeRequest()}
            />
            <FlatButton
                label="Edit Recipe"
                secondary={true}
                containerElement={<Link to={`/editRecipe/${params.id}`} />}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayedRecipeScreen);
