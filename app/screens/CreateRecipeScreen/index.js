import React from 'react'
import RecipeForm from '../../components/forms/RecipeForm'
import ReactLoading from 'react-loading'
import { Screen } from '../../styles/global-styles'
import { connect } from 'react-redux'
import {
  getRecipe,
  getAllIngredients,
  getIsFetching
} from '../../reducers/index'

const mapStateToProps = (state, { params: { id } }) => {
  if (!id) {
    return {
      initialValues: {
        ingredients: [{ name: '', amount: '' }],
        directions: ['']
      }
    }
  }
  const recipe = getRecipe(state, id)
  const allIngredients = getAllIngredients(state)
  const ingredients = recipe
    ? recipe.ingredients.map(ingredient => allIngredients[ingredient])
    : []
  return {
    isFetching: getIsFetching(state),
    initialValues: { ...recipe, ingredients: [...ingredients] }
  }
}

const CreateRecipeScreen = ({ initialValues, dispatch, isFetching }) => (
  <Screen>
    {!isFetching ? (
      <RecipeForm
        initialValues={initialValues}
        dispatch={dispatch}
        isFetching={isFetching}
      />
    ) : (
      <ReactLoading type="bars" color="#444" className="createLoader" />
    )}
  </Screen>
)

export default connect(mapStateToProps)(CreateRecipeScreen)
