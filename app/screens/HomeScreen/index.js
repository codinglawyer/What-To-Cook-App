import React from 'react'
import T from 'prop-types'
import { get as g, isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { compose, withHandlers, branch, renderComponent } from 'recompose'
import { isDataBeingFetched } from '../../actions'
import {
  getIsDataFetching,
  getIsRecipeDeleting,
  getIsRecipeSaving,
  getCompleteRecipes
} from '../../reducers/selectors'
import FetchError from '../../components/FetchError'
import Spinner from '../../components/Spinner'
import { HeaderPicture, SiteTitle } from './styles'
import { Screen } from '../../styles/global-styles'

const mapStateToProps = state => {
  const dataFetchingInfo = getIsDataFetching(state)
  const recipeDeletingInfo = getIsRecipeDeleting(state)
  const recipeSavingInfo = getIsRecipeSaving(state)
  return {
    recipes: getCompleteRecipes(state),
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
  </Screen>
)

const HomeScreen = compose(
  connect(mapStateToProps),
  branch(
    ({ isFetching, recipes, isDeleting, isSaving }) =>
      (isFetching && !g(recipes, 'allIds')) || isDeleting || isSaving,
    renderComponent(Spinner)
  ),
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
