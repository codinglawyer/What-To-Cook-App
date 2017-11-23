import React from 'react'
import { Link, IndexLink } from 'react-router'
import { compose, withState, withHandlers } from 'recompose'
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

import { isDataBeingFetched } from '../actions/index'
import { getAllRecipes } from '../reducers/index'

const navigationLifecycle = {
  componentDidMount ({ handleIsDataBeingFetched }) {
    handleIsDataBeingFetched()
  }
}

const mapStateToProps = state => ({
  recipes: getAllRecipes(state)
})

const renderNavigation = (
  { recipes, dropdownValue, setDropdownValue, children } = {}
) => (
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
        value={dropdownValue}
        onChange={(event, index, value) => setDropdownValue(value)}
        labelStyle={{ color: '#fff' }}
        listStyle={{
          color: '#fff',
          backgroundColor: '#291705',
          border: '5px solid #e58f37',
          marginLeft: '150px'
        }}
        selectedMenuItemStyle={{ color: '#e58f37' }}
        style={{ width: '250px' }}
      >
        <MenuItem
          key={0}
          value={0}
          primaryText='Select a Recipe'
          style={{ backgroundColor: '#291705', color: '#fff' }}
        />
        {recipes.map((recipe, index) => (
          <MenuItem
            key={`${recipe.id}-${index}`}
            value={index + 1}
            primaryText={recipe.title}
            containerElement={
              <Link to={recipe.id} activeClassName='activeLink' />
            }
            style={{ backgroundColor: '#291705', color: '#fff' }}
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
  lifecycle(navigationLifecycle),
  withState('dropdownValue', 'setDropdownValue', 0)
)(renderNavigation)

export default Navigation
