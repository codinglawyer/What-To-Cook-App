import React from 'react'
import RecipeForm from '../../components/forms/RecipeForm'
import ReactLoading from 'react-loading'
import {get as g} from 'lodash'
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
        title: 'New recipe',
        difficulty: '',
        servings: '',
        time: '',
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

const CreateRecipeScreen = ({ initialValues, dispatch, isFetching, routeParams }) => (
  <Screen>
    {!isFetching ? (
      <RecipeForm
        initialValues={initialValues}
        dispatch={dispatch}
        isFetching={isFetching}
        isEdited={g(routeParams, 'id')}
      />
    ) : (
      <ReactLoading type="bars" color="#444" className="createLoader" />
    )}
  </Screen>
)

export default connect(mapStateToProps)(CreateRecipeScreen)
