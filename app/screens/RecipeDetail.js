import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as actions from '../actions/index';


const DisplayedRecipe = ({displayedRecipe, params}) => (
    <div>
        <h3 className="recipeDetail">Recipe detail:</h3>
        <h1 className="recipeTitle">{displayedRecipe.title}</h1>
        <div className="recipeDirectionsTitle">Directions:</div>
        <ul className="directions">
            {displayedRecipe.directions.map(direction => (
                <li className="recipeDirections" key={direction}>{direction}</li>
            ))}
        </ul>
        <br/>
        <div className="ingredientsTitle">Ingredients:</div>
        {/*<ul className="ingredients">*/}
            {/*{displayedRecipe.ingredients.map(ingredient => (*/}
                {/*<li key={ingredient.id}>{ingredient.ingredient}</li>*/}
            {/*))}*/}
        {/*</ul>*/}
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

const mapStateToProps = (state, ownProps) => ({
    displayedRecipe: state.recipesEntity.byId[ownProps.params.id],
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DisplayedRecipe);

//todo send recipe ID to editRecipe url
