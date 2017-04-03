import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'

import * as actions from '../../actions/index'
import { getAllIngredients, getRecipe } from '../../reducers/index'
import { Screen } from '../../styles/global-styles'

const mapStateToProps = (state, { params }) => {
    const recipe = getRecipe(state, params.id)
    const allIngredients = getAllIngredients(state)
    const recipeIngredients = recipe.ingredients.map(ingredient => allIngredients[ingredient])
    return {
        recipe,
        recipeIngredients
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const IngredientList = ({ children, ingredients }) => (
    <div>
        {children(ingredients)}
    </div>
)

const DisplayedRecipeScreen = ({
   recipe,
   recipeIngredients,
   params,
   deleteRecipeRequest
}) => (
    <Screen>
        <h1 className="recipeTitle">{recipe.title}</h1>
        <div className="recipeDirectionsTitle">Directions:</div>
        <ul className="directions">
            {recipe.directions.map(direction => (
                <li
                    className="recipeDirections"
                    key={direction}
                >
                    {direction}
                </li>
            ))}
        </ul>
        <br />
        <div className="ingredientsTitle">Ingredients:</div>
        <IngredientList ingredients={recipeIngredients}>
            {ingredients => ingredients.map((ingredient, i) => (
                <div
                    key={`${i}-${ingredient}`}
                    className="ingredients"
                >
                    {ingredient.name}
                </div>
            ))}
        </IngredientList>
        <FlatButton
            label="Delete Recipe"
            secondary
            onClick={() => deleteRecipeRequest(params.id, recipe.ingredients)}
            containerElement={<Link to={`/`} />}
        />
        <FlatButton
            label="Edit Recipe"
            secondary
            containerElement={<Link to={`/editRecipe/${params.id}`} />}
        />
    </Screen>
)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayedRecipeScreen)
