import React from 'react'
import T from 'prop-types'
import { Link, IndexLink } from 'react-router'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { lifecycle } from '../utils/lifecycle-fp'

import { isDataBeingFetched } from '../actions'
import { getAllRecipes } from '../reducers/selectors'

const navigationLifecycle = {
  componentDidMount ({ handleIsDataBeingFetched }) {
    handleIsDataBeingFetched()
  }
}

const mapStateToProps = state => ({
  recipes: getAllRecipes(state)
})

// TODO: add what to do when database is in disconnected state
const renderNavigation = ({ recipes, children } = {}) => (
  <div>
    <Toolbar style={{ background: '#291705' }}>
      <IndexLink to='/'>
        <ToolbarTitle
          text='What To Cook?'
          style={{
            fontWeight: 500,
            fontSize: '25px',
            color: '#fff',
            textDecoration: 'none'
          }}
        />
      </IndexLink>
      <ToolbarGroup>
        <ToolbarSeparator style={{ backgroundColor: '#e58f37' }} />
      </ToolbarGroup>
      <ToolbarGroup>
        <RaisedButton
          className='newRecipe'
          label='Add A New Recipe'
          type='button'
          containerElement={<Link to='/createRecipe' />}
          backgroundColor='#e58f37'
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator style={{ backgroundColor: '#e58f37' }} />
      </ToolbarGroup>
      <DropDownMenu
        value={0}
        labelStyle={{ color: '#fff' }}
        listStyle={{
          color: '#fff',
          backgroundColor: '#291705',
          border: '5px solid #e58f37',
          marginLeft: '150px'
        }}
        selectedMenuItemStyle={{ color: '#e58f37' }}
        style={{ width: '250px', fontSize: '20px' }}
      >
        <MenuItem
          key={0}
          value={0}
          primaryText='Select a recipe'
          style={{
            backgroundColor: '#291705',
            color: '#fff',
            fontSize: '20px'
          }}
        />
        {recipes.map((recipe, index) => (
          <MenuItem
            key={`${recipe.id}-${index}`}
            value={index + 1}
            primaryText={recipe.title}
            containerElement={
              <Link to={recipe.id} activeClassName='activeLink' />
            }
            style={{
              backgroundColor: '#291705',
              color: '#fff',
              fontSize: '20px'
            }}
            hoverColor='black'
          />
        ))}
      </DropDownMenu>
    </Toolbar>
    {children}
  </div>
)

const Navigation = compose(
  connect(mapStateToProps),
  withHandlers({
    handleIsDataBeingFetched: ({ dispatch }) => () =>
      dispatch(isDataBeingFetched())
  }),
  lifecycle(navigationLifecycle)
)(renderNavigation)

Navigation.propTypes = {
  recipe: T.object,
  children: T.element
}

export default Navigation
