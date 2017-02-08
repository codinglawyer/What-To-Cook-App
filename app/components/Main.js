import React from 'react';
import { connect } from 'react-redux';
import RecipeDetail from '../containers/RecipeDetail';
import AddRecipe from '../containers/AddRecipe'

import Drawer from '../components/Drawer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions/index'

const style = {
    marginRight: 20,
};

const CreateNewRecipe = ({ dispatch, formDisplayed }) => {
    return (
        <FloatingActionButton
            style={style}
            onClick={() => dispatch(actions.displayRecipeForm(!formDisplayed))}
        >
            <ContentAdd />
        </FloatingActionButton>
    )
}

const Main = ({ dispatch, formDisplayed }) => {
    return(
        <div>
            <h1 className="title">What To Cook?</h1>
            <CreateNewRecipe dispatch={dispatch} formDisplayed={formDisplayed} />
            <AddRecipe formDisplayed={formDisplayed}/>
            <RecipeDetail />
            <Drawer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        formDisplayed: state.displayRecipeForm
    }
}

export default connect(mapStateToProps, null)(Main);
