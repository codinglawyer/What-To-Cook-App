import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LeftDrawer from '../components/LeftDrawer'
import { Link } from 'react-router'


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
                <Link to="/recipeForm">
                    <RaisedButton
                        className="newRecipe"
                        labelStyle={{fontSize: '16px'}}
                        label="Add A New Recipe"
                        primary={true}
                        type="button"
                        onClick={() => actions.displayRecipeForm({isFormDisplayed: !isFormDisplayed})}
                    />
                </Link>
                <Link to="/browseRecipes">
                    <LeftDrawer
                        recipes={recipes}
                        actions={actions}
                    />
                </Link>
                <ToolbarSeparator />
            </ToolbarGroup>
        </Toolbar>
    );

export default Sidebar;
