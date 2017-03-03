import React from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const Sidebar = ({
    recipes,
    displayRecipeForm,
    isFormDisplayed,
    actions,
}) => (
        <Toolbar style={{ marginBottom: "50px"}}>
            <ToolbarTitle
                text="What To Cook?"
                style={{ fontWeight: 500, fontSize: "25px"}}
            />
            <ToolbarGroup>
                <ToolbarSeparator />
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarSeparator />
                <Link to="/recipeForm">
                    <RaisedButton
                        className="newRecipe"
                        label="Add A New Recipe"
                        type="button"
                        onClick={() => actions.displayRecipeForm({isFormDisplayed: !isFormDisplayed})}
                    />
                </Link>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarSeparator />
            </ToolbarGroup>
                <DropDownMenu value={1}>
                    {recipes.map((recipe, index) => (
                        <MenuItem
                            key={recipe.id}
                            value={index + 1}
                            primaryText={recipe.title}
                            onClick={() => {actions.displayRecipe({recipeId: recipe.id})}}
                            containerElement={<Link to={recipe.id}/>}
                        >
                        </MenuItem>
                    ))}
                </DropDownMenu>
        </Toolbar>
    );

export default Sidebar;
