import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from '../components/RecipeForm'

import RecipeDetail from '../components/RecipeDetail'
import Sidebar from './Sidebar'
import * as actions from '../actions/index'
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe } from '../reducers/recipeApp';


const Main = ({ dispatch, formDisplayed, recipes, displayedRecipe }) => {
    const action = type => dispatch({type});
    return(
        <div>
            <button onClick={() => action('RECIPES_ASYNC')}>Fetch</button>
            <Sidebar
                dispatch={dispatch}
                actions={actions}
                formDisplayed={formDisplayed}
                recipes={recipes}
            />
            <div>
                {displayedRecipe ? (
                        <RecipeDetail displayedRecipe={displayedRecipe}/>
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
