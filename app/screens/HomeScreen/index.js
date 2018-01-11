import React from 'react'
import T from 'prop-types'
import { get as g, isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import ReactLoading from 'react-loading'
import { isDataBeingFetched } from '../../actions/index'
import {
  getAllRecipes,
  getIsDataFetching,
  getIsRecipeDeleting,
  getIsRecipeSaving,
  getCompleteRecipes,
  getAllIngredients
} from '../../reducers/selectors'
import FetchError from '../../components/FetchError'
import { HeaderPicture, SiteTitle } from './styles'
import { Screen } from '../../styles/global-styles'

const mapStateToProps = state => {
  const dataFetchingInfo = getIsDataFetching(state)
  const recipeDeletingInfo = getIsRecipeDeleting(state)
  const recipeSavingInfo = getIsRecipeSaving(state)
  return {
    recipes: getCompleteRecipes(state, getAllRecipes, getAllIngredients),
    isFetching: g(dataFetchingInfo, 'fetching'),
    isDeleting: g(recipeDeletingInfo, 'deleting'),
    isSaving: g(recipeSavingInfo, 'deleting'),
    fetchError: g(dataFetchingInfo, 'error')
  }
}

const renderHomeScreen = ({
  recipes,
  isFetching,
  isDeleting,
  isSaving,
  fetchError,
  handleIsDataBeingFetched
}) => (
  <Screen>
    {(isFetching && !g(recipes, 'allIds')) || isDeleting || isSaving ? (
      <ReactLoading type="bars" color="#444" className="createLoader" />
    ) : (
      <div>
        <SiteTitle>What do you want to cook?</SiteTitle>
        <HeaderPicture />
        <div>
          {!isEmpty(fetchError) &&
            !g(recipes, 'allIds') && (
              <FetchError
                message={fetchError}
                onRetry={() => handleIsDataBeingFetched()}
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

HomeScreen.propTypes = {
  recipes: T.object,
  isFetching: T.bool,
  isSaving: T.bool,
  isDeleting: T.bool,
  fetchError: T.object,
  handleIsDataBeingFetched: T.func
}

export default HomeScreen
