import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { compose, withState } from 'recompose';

import * as actions from '../actions/index'

export default class DrawerUndockedExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = (recipeID) => {
        this.props.dispatch(actions.displayRecipe(recipeID))
        this.setState({open: false})

    };

    render() {
        return (
            <div>
                <RaisedButton
                    label="Find A Recipe"
                    onTouchTap={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                {/*{this.props.recipes.map(recipe => (*/}
                    {/*<MenuItem*/}
                        {/*key={recipe.id}*/}
                        {/*onTouchTap={() => this.handleClose(recipe.id)}*/}
                    {/*>*/}
                        {/*{recipe.title}*/}
                    {/*</MenuItem>*/}
                {/*))}*/}
                </Drawer>
            </div>
        );
    }
}
