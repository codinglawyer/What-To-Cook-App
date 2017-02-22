import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from './forms/RecipeForm';

import RecipeDetail from '../components/RecipeDetail';
import Sidebar from './Sidebar';
import * as actions from '../actions/index';
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe } from '../reducers/recipeApp';


const Main = ({ dispatch, formDisplayed, recipes, displayedRecipe }) => {
    return(
        <div>
            <Sidebar
                dispatch={dispatch}
                actions={actions}
                formDisplayed={formDisplayed}
                recipes={recipes}
            />
            <div>
                {displayedRecipe ? (
                        <RecipeDetail
                            displayedRecipe={displayedRecipe}
                            dispatch={dispatch}
                        />
                    ) : (
                        <div className="recipeForm">
                            <RecipeForm
                                dispatch={dispatch}
                                formDisplayed={formDisplayed}
                            />
                        </div>
                    )
                }
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
