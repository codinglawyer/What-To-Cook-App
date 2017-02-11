import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from '../components/RecipeForm'

import Drawer from '../components/Drawer'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import * as actions from '../actions/index'
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe } from '../reducers/recipeApp';

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
};

const Main = ({ dispatch, formDisplayed, recipes, displayedRecipe }) => {
    return(
        <div>
            <h1 className="title">What To Cook?</h1>
            <Drawer
                recipes={recipes}
                dispatch={dispatch}
            />
            <h5>OR</h5>
                <div>
                {displayedRecipe ? (
                        <div>
                            <div>{displayedRecipe.title}</div>
                            <ul>
                                {displayedRecipe.ingredients.map(ingredient => (
                                    <li key={ingredient.id}>{ingredient.ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <NewRecipeButton dispatch={dispatch} formDisplayed={formDisplayed} />
                            <RecipeForm dispatch={dispatch} formDisplayed={formDisplayed} />
                        </div>
                    )}
                </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        displayedRecipe: getDisplayedRecipe(state)[0],
        recipes: getAllRecipes(state),
        formDisplayed: getDisplayFormState(state),
    }
};

export default connect(mapStateToProps, null)(Main);
