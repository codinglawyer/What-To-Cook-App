import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import LeftDrawer from '../components/LeftDrawer'


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
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
                        onClick={() => this.props.dispatch(this.props.actions.displayRecipeForm(!this.props.formDisplayed))}
                    />
                    <LeftDrawer
                        recipes={this.props.recipes}
                        dispatch={this.props.dispatch}
                    />
                    <ToolbarSeparator />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}
