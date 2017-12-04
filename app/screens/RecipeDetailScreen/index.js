import React from 'react'
import T from 'prop-types'
import { get as g } from 'lodash'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Flex } from 'reflexbox'
import RaisedButton from 'material-ui/RaisedButton'
import { compose, withHandlers } from 'recompose'
import ReactLoading from 'react-loading'
import { deleteRecipeRequest } from '../../actions/index'
import {
  getAllIngredients,
  getRecipe,
  getIsDataFetching
} from '../../reducers/index'
import { Screen, Container, Subtitle } from '../../styles/global-styles'
import { RecipeDirection, RecipeIngredients, RecipeTitle } from './styles'

const mapStateToProps = (state, { params }) => {
  const recipe = getRecipe(state, params.id)
  const allIngredients = getAllIngredients(state)
  const recipeIngredients = recipe
    ? recipe.ingredients.map(ingredientId => allIngredients[ingredientId])
    : []
  return {
    recipe,
    recipeIngredients,
    isFetching: g(getIsDataFetching(state), 'fetching')
  }
}

const IngredientList = ({ children, ingredients }) => (
  <ul>{children(ingredients)}</ul>
)

const renderRecipeDetailScreen = ({
  recipe,
  recipeIngredients,
  params: { id },
  isFetching,
  handleDeleteRecipe
}) => (
  <Screen>
    {!isFetching && recipe ? (
      <div>
        <RecipeTitle>{g(recipe, 'title')}</RecipeTitle>
        <Container>
          <Flex justify="space-between">
            <div>
              {g(recipe, 'difficulty') &&
                `Difficulty: ${g(recipe, 'difficulty')}`}
            </div>
            <div>
              {g(recipe, 'servings') && `${g(recipe, 'servings')} servings`}
            </div>
            <div>{g(recipe, 'time') && `${g(recipe, 'time')} minutes`}</div>
          </Flex>
        </Container>
        <Container>
          <Subtitle>Directions:</Subtitle>
          <ol>
            {recipe.directions.map(direction => (
              <RecipeDirection key={direction}>{direction}</RecipeDirection>
            ))}
          </ol>
        </Container>
        <Container>
          <Subtitle>Ingredients:</Subtitle>
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
    ) : (
      <ReactLoading type="bars" color="#444" className="createLoader" />
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

RecipeDetailScreen.propTypes = {
  recipes: T.object,
  recipeIngredient: T.object,
  params: T.object,
  isFetching: T.bool,
  errorMessage: T.object,
  handleDeleteRecipe: T.func
}

export default RecipeDetailScreen
