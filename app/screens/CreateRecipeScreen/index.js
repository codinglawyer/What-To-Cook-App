import React from 'react'
import RecipeForm from '../../components/forms/RecipeForm'
import { Screen } from '../../styles/global-styles'

const CreateRecipeScreen = ({ ...props }) => (
  <Screen>
    <RecipeForm params={props} />
  </Screen>
)

export default CreateRecipeScreen

// TODO must be connected to the store - it should be a container
