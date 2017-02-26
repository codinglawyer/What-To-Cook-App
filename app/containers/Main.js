import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { lifecycle } from '../utils/lifecycle-fp';

import RecipeForm from '../components/forms/RecipeForm';
import RecipeDetail from '../components/RecipeDetail';
import Sidebar from '../components/Sidebar';
import * as actions from '../actions/index';
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe, getIsFetching } from '../reducers/index';


const mainLifecycle = {
    componentDidMount({fetchRecipesRequest }) {
        fetchRecipesRequest();
    }
};

const renderMain = ({ isFormDisplayed, recipes, displayedRecipe, isFetching, ...props }) => {
    return (
        <div>
            <Sidebar
                actions={props}
                isFormDisplayed={isFormDisplayed}
                recipes={recipes}
            />
            <div>
                {isFetching && !recipes.byId ? (
                        <div>Loading</div>
                    ) : (
                        <div>
                            {displayedRecipe ? (
                                <RecipeDetail
                                    displayedRecipe={displayedRecipe}
                                    actions={props}
                                />
                            ) : (
                                <div className="recipeForm">
                                    <RecipeForm
                                        isFormDisplayed={isFormDisplayed}
                                    />
                                </div>
                            )}
                        </div>
                    )}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    displayedRecipe: getDisplayedRecipe(state)[0],
    recipes: getAllRecipes(state),
    isFormDisplayed: getDisplayFormState(state),
    isFetching: getIsFetching(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const Main = compose (
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(mainLifecycle),
)(renderMain);

export default Main;
