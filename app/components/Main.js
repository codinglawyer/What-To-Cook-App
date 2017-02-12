import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from '../components/RecipeForm'

import LeftDrawer from '../components/LeftDrawer'
import DisplayedRecipe from '../components/DisplayedRecipe'
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/index'
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe } from '../reducers/recipeApp';

const Main = ({ dispatch, formDisplayed, recipes, displayedRecipe }) => {
    return(
        <div>
            <h1 className="title">What To Cook?</h1>
            <LeftDrawer
                recipes={recipes}
                dispatch={dispatch}
            />
            <div>OR</div>
            <RaisedButton
                className="newRecipe"
                labelStyle={{fontSize: '16px'}}
                label="Add A New Recipe"
                primary={true}
                type="button"
                onClick={() => dispatch(actions.displayRecipeForm(!formDisplayed))}
            />
            <div>
                {displayedRecipe ? (
                        <DisplayedRecipe displayedRecipe={displayedRecipe}/>
                    ) : (
                        <div>
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
