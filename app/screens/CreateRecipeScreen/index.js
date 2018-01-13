import React from 'react'
import T from 'prop-types'
import RecipeForm from '../../components/forms/RecipeForm'
import ReactLoading from 'react-loading'
import { get as g } from 'lodash'
import { Screen } from '../../styles/global-styles'
import { connect } from 'react-redux'
import {
  getRecipe,
  getAllIngredients,
  getIsDataFetching
} from '../../reducers/selectors'

const mapStateToProps = (state, { params: { id } }) => {
  // new recipe being created
  if (!id) {
    return {
      initialValues: {
        title: '',
        difficulty: '',
        servings: '',
        time: '',
        ingredients: [{ name: '', amount: '', units: '' }],
        directions: ['']
      }
    }
  }
  // recipe being edited
  const recipe = getRecipe(id)(state)
  const allIngredients = getAllIngredients(state)
  const recipeIngredients = recipe
    ? recipe.ingredients.map(ingredientId => allIngredients[ingredientId])
    : []
  return {
    isFetching: g(getIsDataFetching(state), 'fetching'),
    initialValues: { ...recipe, ingredients: [...recipeIngredients] }
  }
}

const CreateRecipeScreen = ({
  initialValues,
  isFetching,
  routeParams,
  router: { push }
}) => (
  <Screen>
    {!isFetching ? (
      <RecipeForm
        initialValues={initialValues}
        isFetching={isFetching}
        isEdited={g(routeParams, 'id')}
        changeRoute={push}
      />
    ) : (
      <ReactLoading type="bars" color="#444" className="createLoader" />
    )}
  </Screen>
)

CreateRecipeScreen.propTypes = {
  initialValues: T.object.isRequired,
  isFetching: T.bool,
  routeParams: T.object,
  router: T.object
}

export default connect(mapStateToProps)(CreateRecipeScreen)
