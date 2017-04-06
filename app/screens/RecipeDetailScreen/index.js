import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import * as actions from '../../actions/index'
import { getAllIngredients, getRecipe } from '../../reducers/index'
import { Screen, Box } from '../../styles/global-styles'
import { RecipeDirection, RecipeIngredients, Servings } from './styles'

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
    <ul>
        {children(ingredients)}
    </ul>
)

const DisplayedRecipeScreen = ({
   recipe,
   recipeIngredients,
   params,
   deleteRecipeRequest
}) => (
    <Screen>
        <h1 className="recipeTitle">{recipe.title}</h1>
        <Box>
            <Servings>{recipe.servings} servings</Servings>
        </Box>
        <Box>
            <div className="subtitle">Directions:</div>
            <ol>
                {recipe.directions.map(direction => (
                    <RecipeDirection key={direction}>{direction}</RecipeDirection>
                ))}
            </ol>
        </Box>
        <Box>
            <div className="subtitle">Ingredients:</div>
            <IngredientList ingredients={recipeIngredients}>
                {ingredients => ingredients.map((ingredient, i) => (
                    <RecipeIngredients
                        key={`${i}-${ingredient}`}
                        className="ingredients"
                    >
                        {ingredient.name} <span className="bold">{ingredient.amount}</span>
                    </RecipeIngredients>
                ))}
            </IngredientList>
        </Box>
        <RaisedButton
            label="Delete Recipe"
            backgroundColor="#e58f37"
            onClick={() => deleteRecipeRequest(params.id, recipe.ingredients)}
            containerElement={<Link to={`/`} />}
            className="submitButton"
            style={{ margin: '20px' }}
        />
        <RaisedButton
            label="Edit Recipe"
            type="button"
            backgroundColor="#000000"
            labelColor="#e58f37"
            style={{ margin: '20px' }}
            containerElement={<Link to={`/editRecipe/${params.id}`} />}
        />
    </Screen>
)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayedRecipeScreen)
