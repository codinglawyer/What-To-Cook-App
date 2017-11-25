import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Flex } from 'reflexbox'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withHandlers } from 'recompose'

import { deleteRecipeRequest } from '../../actions/index'
import { getAllIngredients, getRecipe } from '../../reducers/index'
import { Screen, Container } from '../../styles/global-styles'
import { RecipeDirection, RecipeIngredients } from './styles'

const mapStateToProps = (state, { params }) => {
  const recipe = getRecipe(state, params.id)
  const allIngredients = getAllIngredients(state)
  const recipeIngredients = recipe ? recipe.ingredients.map(
      ingredient => allIngredients[ingredient]
    ) : []
  return {
    recipe,
    recipeIngredients
  }
}

const IngredientList = ({ children, ingredients }) => (
  <ul>{children(ingredients)}</ul>
)

const DisplayedRecipeScreen = ({
  recipe,
  recipeIngredients,
  params,
  handleDeleteRecipe
}) =>
    <Screen>
      {recipe && (
        <div>
          <h1 className="recipeTitle">{recipe.title}</h1>
          <Container>
          <Flex justify='space-between'>
            <div>{recipe.difficulty && `${recipe.difficulty} difficulty`}</div>
            <div>{recipe.servings && `${recipe.servings} servings`}</div>
            <div>{recipe.time && `${recipe.time} minutes`}</div>
            </Flex>
          </Container>
          <Container>
            <div className="subtitle">Directions:</div>
            <ol>
              {recipe.directions.map(direction => (
                <RecipeDirection key={direction}>{direction}</RecipeDirection>
              ))}
            </ol>
          </Container>
          <Container>
            <div className="subtitle">Ingredients:</div>
            <IngredientList ingredients={recipeIngredients}>
              {ingredients =>
                ingredients.map((ingredient, i) => (
                  <RecipeIngredients
                    key={`${i}-${ingredient}`}
                    className="ingredients"
                  >
                    {ingredient.name}{' '}
                    <span className="bold">{ingredient.amount}</span>
                    <span className="bold"> {ingredient.units}</span>
                  </RecipeIngredients>
                ))
              }
            </IngredientList>
          </Container>
          <RaisedButton
            label="Delete Recipe"
            backgroundColor="#e58f37"
            onClick={() => handleDeleteRecipe(params.id, recipe.ingredients)}
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
        </div>
      )}
    </Screen>

export default compose(
  connect(mapStateToProps),
  withHandlers({
    handleDeleteRecipe: ({ dispatch }) => (id, ingredientsIds) =>
      dispatch(deleteRecipeRequest(id, ingredientsIds))
  })
)(DisplayedRecipeScreen)
