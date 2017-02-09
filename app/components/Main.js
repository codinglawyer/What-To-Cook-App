import React from 'react';
import { connect } from 'react-redux';
import RecipeDetail from '../containers/RecipeDetail';
import RecipeForm from '../components/RecipeForm'


import Drawer from '../components/Drawer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions/index'
import { getAllRecipes } from '../reducers/recipeApp';
import { getDisplayRecipeState } from '../reducers/recipeApp';

const style = {
    marginRight: 20,
};

const NewRecipeButton = ({ dispatch, formDisplayed }) => {
    return (
        <div>
            <h4>Add New Recipe</h4>
            <FloatingActionButton
                style={style}
                onClick={() => dispatch(actions.displayRecipeForm(!formDisplayed))}
            >
                <ContentAdd />
            </FloatingActionButton>
        </div>
    )
}

const Main = ({ dispatch, formDisplayed, recipes, displayedRecipe }) => {
    console.log("displa", displayedRecipe);
    return(
        <div>
            <h1 className="title">What To Cook?</h1>
            <Drawer
                recipes={recipes}
                dispatch={dispatch}
            />
            <h5>OR</h5>
                <div>
                {/*{displayedRecipe[0] && displayedRecipe[0].displayed? (*/}
                        {/*<div>*/}
                            {/*<div>{displayedRecipe[0].title}</div>*/}
                        {/*</div>*/}
                    {/*) : (*/}
                        <div>
                            <NewRecipeButton dispatch={dispatch} formDisplayed={formDisplayed} />
                            <RecipeForm dispatch={dispatch} formDisplayed={formDisplayed} />
                        </div>
                    {/*)}*/}
                </div>
            <RecipeDetail />
        </div>
    )
}

const mapStateToProps = (state) => {
    // let displayedRecipe = state.recipes.filter(recipe => {
    //     return recipe.displayed
    // })
    // console.log("disp", displayedRecipe);
    return {
        // displayedRecipe,
        recipes: getAllRecipes(state),
        formDisplayed: getDisplayRecipeState(state)
    }
}

export default connect(mapStateToProps, null)(Main);
