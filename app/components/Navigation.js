import React from 'react';
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const Navigation = ({ recipes }) => (
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
                <DropDownMenu value={1}>
                    {recipes.map((recipe, index) => (
                        <MenuItem
                            key={recipe.id}
                            value={index + 1}
                            primaryText={recipe.title}
                            containerElement={<Link to={recipe.id}/>}
                        >
                        </MenuItem>
                    ))}
                </DropDownMenu>
        </Toolbar>
    );

export default Navigation;
