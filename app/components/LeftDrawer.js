import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { compose, withState } from 'recompose';
import { Link } from 'react-router'


const RenderLeftDrawer = ({ isOpen, setIsOpen, recipes, actions}) => {
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
                <Link
                    to={recipe.id}
                    key={recipe.id}
                    onClick={() => {actions.displayRecipe({recipeId: recipe.id}); setIsOpen(false)}}
                >
                    {recipe.title}
                </Link>
            ))}
            </Drawer>
        </div>
    );
}


const LeftDrawer = compose(
    withState('isOpen', 'setIsOpen', false)
)(RenderLeftDrawer)

export default LeftDrawer;
