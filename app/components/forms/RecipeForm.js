import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { compose } from 'recompose'

import TextField from './TextField'
import IngredientsForm from './IngredientsForm'
import DirectionsForm from './DirectionsForm'

import RaisedButton from 'material-ui/RaisedButton'
import { addRecipeRequest } from '../../actions/index'
import { Header } from '../../styles/global-styles'
import { RecipeHeading } from './styles'

const renderRecipeForm = ({
  handleSubmit,
  submitting,
  recipe,
  isFetching,
  isEdited
}) => (
  <div className="recipeForm">
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
                label="Time (min)"
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
            label={isEdited ? 'Create a new copy' : 'Submit'}
            type="submit"
            disabled={submitting}
            backgroundColor="#e58f37"
          />
        </div>
      </form>
    </div>
  </div>
)

const RecipeForm = compose(
  reduxForm({
    form: 'recipeForm',
    fields: ['recipe', 'ingredients'],
    enableReinitialize: true,
    onSubmit: (_, dispatch) => {
      dispatch(addRecipeRequest())
    },
    onSubmitSuccess: (_, __, { changeRoute }) => changeRoute('/')
  })
)(renderRecipeForm)

export default RecipeForm
