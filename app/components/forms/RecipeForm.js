import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import TextField from './TextField'
import IngredientsForm from './IngredientsForm'
import DirectionsForm from './DirectionsForm'

import RaisedButton from 'material-ui/RaisedButton'
import * as actions from '../../actions/index'
import { getRecipe, getAllIngredients } from '../../reducers/index'

import { Header } from '../../styles/global-styles'
import { RecipeHeading } from './styles'

const mapStateToProps = (state, { params: { params: { id } } }) => {
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
  const ingredients = recipe.ingredients.map(
    ingredient => allIngredients[ingredient]
  )
  return {
    initialValues: { ...recipe, ingredients: [...ingredients] }
  }
}

const renderRecipeForm = ({
  handleSubmit,
  pristine,
  submitting,
  reset,
  isFormDisplayed = true,
  recipe,
  params
}) => (
  <div className="recipeForm">
    {isFormDisplayed && (
      <div>
        <Header>Fill Recipe Information</Header>
        <form onSubmit={handleSubmit}>
          <RecipeHeading>
            <Field
              name="title"
              type="text"
              component={TextField}
              label="Title"
              style={{
                width: '30%',
                fontSize: '20px'
              }}
            />
          </RecipeHeading>
          <Flex wrap>
            <Box col={12} lg={3} sm={6}>
              <RecipeHeading>
                <Field
                  name="servings"
                  type="text"
                  component={TextField}
                  label="Servings"
                  style={{
                    width: '40%',
                    fontSize: '20px'
                  }}
                />
              </RecipeHeading>
            </Box>
            <Box col={12} lg={3} sm={6}>
              <RecipeHeading>
                <Field
                  name="time"
                  type="text"
                  component={TextField}
                  label="Time"
                  style={{
                    width: '40%',
                    fontSize: '20px'
                  }}
                />
              </RecipeHeading>
            </Box>
            <Box col={12} lg={3} sm={6}>
              <RecipeHeading>
                <Field
                  name="difficulty"
                  type="text"
                  component={TextField}
                  label="Difficulty"
                  style={{
                    width: '40%',
                    fontSize: '20px'
                  }}
                />
              </RecipeHeading>
            </Box>
          </Flex>
          <RecipeHeading>Ingredients</RecipeHeading>
          <FieldArray
            name="ingredients"
            component={IngredientsForm}
            style={{
              fontSize: '20px',
              fontWeight: 300,
              marginBottom: '25px'
            }}
          />
          <RecipeHeading>Directions</RecipeHeading>
          <FieldArray
            name="directions"
            component={DirectionsForm}
            style={{
              fontSize: '20px',
              fontWeight: 300,
              width: '90%',
              marginBottom: '25px'
            }}
          />
          <div>
            <RaisedButton
              label="Submit"
              type="submit"
              disabled={submitting}
              backgroundColor="#e58f37"
              style={{ margin: '20px' }}
            />
            <RaisedButton
              label="Clear Values"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              backgroundColor="#000000"
              labelColor="#e58f37"
              style={{ margin: '20px' }}
            />
          </div>
        </form>
      </div>
    )}
  </div>
)

const RecipeForm = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'recipeForm',
    fields: ['recipe', 'ingredients'],
    onSubmit: (_, dispatch) => {
      dispatch(actions.addRecipeRequest())
    }
  })
)(renderRecipeForm)

export default RecipeForm
