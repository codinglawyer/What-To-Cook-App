import React from 'react';
import { Link, IndexLink } from 'react-router';
import { compose, withState} from 'recompose';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { getAllRecipes } from '../reducers/index';


const mapStateToProps = (state) => ({
    recipes: getAllRecipes(state),
})

const renderNavigation = ({
    recipes,
    dropdownValue,
    setDropdownValue,
    children,
}) => (
    <div>
    <Toolbar style={{ marginBottom: "50px"}}>
        <IndexLink to="/">
            <ToolbarTitle
                text="What To Cook?"
                style={{ fontWeight: 500, fontSize: "25px"}}
        />
        </IndexLink>
        <ToolbarGroup>
            <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
            <RaisedButton
                className="newRecipe"
                label="Add A New Recipe"
                type="button"
                containerElement={<Link to="/createRecipe"/>}
            />
        </ToolbarGroup>
        <ToolbarGroup>
            <ToolbarSeparator />
        </ToolbarGroup>
            <DropDownMenu
                value={dropdownValue}
                onChange={(event, index, value) => setDropdownValue(value)}
            >
                {recipes.map((recipe, index) => (
                    <MenuItem
                        key={recipe.id}
                        value={index}
                        primaryText={recipe.title}
                        containerElement={<Link to={recipe.id} activeClassName="activeLink" />}
                    >
                    </MenuItem>
                ))}
            </DropDownMenu>
    </Toolbar>
        {children}
    </div>
);

const Navigation = compose(
    connect(mapStateToProps),
    withState('dropdownValue', 'setDropdownValue', 0),
)(renderNavigation)
export default Navigation;
