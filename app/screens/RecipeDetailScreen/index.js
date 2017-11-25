import React from 'react'
import { get as g } from 'lodash'
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
  const recipeIngredients = recipe
    ? recipe.ingredients.map(ingredientId => allIngredients[ingredientId])
    : []
  return {
    recipe,
    recipeIngredients
  }
}

const IngredientList = ({ children, ingredients }) => (
  <ul>{children(ingredients)}</ul>
)

const renderRecipeDetailScreen = ({
  recipe,
  recipeIngredients,
  params: { id },
  handleDeleteRecipe
}) => (
  <Screen>
    {recipe && (
      <div>
        <h1 className="recipeTitle">{g(recipe, 'title')}</h1>
        <Container>
          <Flex justify="space-between">
            <div>
              {g(recipe, 'difficulty') &&
                `${g(recipe, 'difficulty')} difficulty`}
            </div>
            <div>
              {g(recipe, 'difficulty') && `${g(recipe, 'difficulty')} servings`}
            </div>
            <div>{g(recipe, 'time') && `${g(recipe, 'time')} minutes`}</div>
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
                  {g(ingredient, 'name')}{' '}
                  <span className="bold">{g(ingredient, 'amount')}</span>
                  <span className="bold"> {g(ingredient, 'units')}</span>
                </RecipeIngredients>
              ))
            }
          </IngredientList>
        </Container>
        <RaisedButton
          label="Delete Recipe"
          backgroundColor="#e58f37"
          onClick={() => handleDeleteRecipe(id, g(recipe, 'ingredients'))}
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
          containerElement={<Link to={`/editRecipe/${id}`} />}
        />
      </div>
    )}
  </Screen>
)

const RecipeDetailScreen = compose(
  connect(mapStateToProps),
  withHandlers({
    handleDeleteRecipe: ({ dispatch }) => (id, ingredientsIds) =>
      dispatch(deleteRecipeRequest(id, ingredientsIds))
  })
)(renderRecipeDetailScreen)

export default RecipeDetailScreen
