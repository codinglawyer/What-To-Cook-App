import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { compose, withState } from 'recompose';

import * as actions from '../actions/index';

const RenderLeftDrawer = ({ isOpen, setIsOpen, dispatch, recipes}) => {
    return (
        <div>
            <RaisedButton
                label="Browse Recipes"
                onTouchTap={() => setIsOpen(true)}
                labelStyle={{fontSize: '16px'}}
            />
            <Drawer
                docked={false}
                width={200}
                open={isOpen}
                onRequestChange={(isOpen) => setIsOpen(false)}
            >
            {recipes.map(recipe => (
                <MenuItem
                    key={recipe.id}
                    onTouchTap={() => {dispatch(actions.displayRecipe(recipe.id)); setIsOpen(false)}}
                >
                    {recipe.title}
                </MenuItem>
            ))}
            </Drawer>
        </div>
    );
}


const LeftDrawer = compose(
    withState('isOpen', 'setIsOpen', false)
)(RenderLeftDrawer)

export default LeftDrawer;
