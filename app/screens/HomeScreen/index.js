import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import FetchError from '../../components/FetchError'
import { isDataBeingFetched } from '../../actions/index'
import {
  getAllRecipes,
  getIsFetching,
  getErrorMessage,
  getCompleteRecipes,
  getAllIngredients
} from '../../reducers/index'
import { HeaderPicture } from './styles'
import { Header, Screen } from '../../styles/global-styles'

const renderHomeScreen = ({ recipes, isFetching, errorMessage, ...props }) => (
  <Screen>
    <Header>What do you want to cook?</Header>
    <HeaderPicture />
    <div>{isFetching && !recipes.allIds && <div>Loading</div>}</div>
    <div>
      {errorMessage &&
        !recipes.allIds && (
          <FetchError
            message={errorMessage}
            onRetry={() => props.isDataBeingFetched()}
          />
        )}
    </div>
  </Screen>
)

const mapStateToProps = state => ({
  recipes: getCompleteRecipes(state, getAllRecipes, getAllIngredients),
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state)
})

const HomeScreen = compose(
  connect(mapStateToProps),
  withHandlers({
    handleIsDataBeingFetched: ({ dispatch }) => () =>
      dispatch(isDataBeingFetched())
  })
)(renderHomeScreen)

export default HomeScreen
