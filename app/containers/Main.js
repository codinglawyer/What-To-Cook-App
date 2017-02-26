import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { lifecycle } from '../utils/lifecycle-fp';

import RecipeForm from '../components/forms/RecipeForm';
import RecipeDetail from '../components/RecipeDetail';
import Sidebar from '../components/Sidebar';
import * as actions from '../actions/index';
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe } from '../reducers/index';


const mainLifecycle = {
    componentDidMount({receiveRecipes}) {
        receiveRecipes();
    }
};

const renderMain = ({ isFormDisplayed, recipes, displayedRecipe, ...props }) => {
    return (
        <div>
            <Sidebar
                actions={props}
                isFormDisplayed={isFormDisplayed}
                recipes={recipes}
            />
            <div>
                {displayedRecipe ? (
                    <RecipeDetail
                        displayedRecipe={displayedRecipe}
                        actions={props}
                    />
                ) : (
                    <div className="recipeForm">
                        <RecipeForm
                            formDisplayed={isFormDisplayed}
                        />
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
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const Main = compose (
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(mainLifecycle),
)(renderMain);

export default Main;
