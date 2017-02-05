import React from 'react';
import { connect } from 'react-redux';

const RecipeDetail = ({ recipe }) => {
    console.log(recipe);
    return (
        <div>
            {recipe.map(recipe => (
                <div key={recipe.id}>
                    {recipe.recipe}
                </div>
            ))}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        recipe: state.Recipe
    }
};

export default connect(mapStateToProps)(RecipeDetail);
