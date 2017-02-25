import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LeftDrawer from '../components/LeftDrawer'


const Sidebar = ({
    recipes,
    displayRecipeForm,
    formDisplayed,
    actions,
}) => (
        <Toolbar style={{ marginBottom: "50px"}}>
            <ToolbarTitle
                text="What To Cook?"
                style={{ fontWeight: 500, fontSize: "25px"}}
            />
            <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton
                    className="newRecipe"
                    labelStyle={{fontSize: '16px'}}
                    label="Add A New Recipe"
                    primary={true}
                    type="button"
                    onClick={() => actions.displayRecipeForm(!formDisplayed)}
                />
                <LeftDrawer
                    recipes={recipes}
                    actions={actions}
                />
                <ToolbarSeparator />
            </ToolbarGroup>
        </Toolbar>
    );

export default Sidebar;
