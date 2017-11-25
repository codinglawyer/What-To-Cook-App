import React from 'react'
import { get as g } from 'lodash'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import ReactLoading from 'react-loading'
import { isDataBeingFetched } from '../../actions/index'
import {
  getAllRecipes,
  getIsFetching,
  getErrorMessage,
  getCompleteRecipes,
  getAllIngredients
} from '../../reducers/index'
import FetchError from '../../components/FetchError'
import { HeaderPicture } from './styles'
import { Header, Screen } from '../../styles/global-styles'

const mapStateToProps = state => ({
  recipes: getCompleteRecipes(state, getAllRecipes, getAllIngredients),
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state)
})

const renderHomeScreen = ({
  recipes,
  isFetching,
  errorMessage,
  isDataBeingFetched
}) => (
  <Screen>
    {isFetching && !g(recipes, 'allIds') ? (
      <ReactLoading type="bars" color="#444" className="createLoader" />
    ) : (
      <div>
        <Header>What do you want to cook?</Header>
        <HeaderPicture />
        <div>
          {errorMessage &&
            !g(recipes, 'allIds') && (
              <FetchError
                message={errorMessage}
                onRetry={() => isDataBeingFetched()}
              />
            )}
        </div>
      </div>
    )}
  </Screen>
)

const HomeScreen = compose(
  connect(mapStateToProps),
  withHandlers({
    handleIsDataBeingFetched: ({ dispatch }) => () =>
      dispatch(isDataBeingFetched())
  })
)(renderHomeScreen)

export default HomeScreen
