import React from 'react';
import { Link } from 'react-router'
import { compose, withState} from 'recompose';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const renderNavigation = ({
    recipes,
    dropdownValue,
    setDropdownValue,
}) => (
    <Toolbar style={{ marginBottom: "50px"}}>
        <Link to="/">
            <ToolbarTitle
                text="What To Cook?"
                style={{ fontWeight: 500, fontSize: "25px"}}
        />
        </Link>
        <ToolbarGroup>
            <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
            <RaisedButton
                className="newRecipe"
                label="Add A New Recipe"
                type="button"
                containerElement={<Link to="/recipeForm"/>}
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
                        containerElement={<Link to={recipe.id}  activeStyle={{ color: 'red' }}/>}
                    >
                    </MenuItem>
                ))}
            </DropDownMenu>
    </Toolbar>
);

const Navigation = compose(
    withState('dropdownValue', 'setDropdownValue', 0),
)(renderNavigation)
export default Navigation;
