import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import RecipeForm from '../components/forms/RecipeForm';
import RecipeDetail from '../components/RecipeDetail';
import Sidebar from '../components/Sidebar';
import * as actions from '../actions/index';
import { getAllRecipes, getDisplayFormState, getDisplayedRecipe } from '../reducers/recipeApp';
import { fetchRecipes } from '../api/index'


const mainLifecycle = {
    componentDidMount() {
        // fetchRecipes().then(recipes =>
        // console.log(recipes));
    }
}

const renderMain = ({ formDisplayed, recipes, displayedRecipe, ...props }) => {
    return (
        <div>
            <Sidebar
                actions={props}
                formDisplayed={formDisplayed}
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
                            formDisplayed={formDisplayed}
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
    formDisplayed: getDisplayFormState(state),
});

const Main = compose (
    connect(mapStateToProps, actions),
    lifecycle(mainLifecycle),
)(renderMain);

export default Main;
