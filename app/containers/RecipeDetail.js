import React from 'react';
import { connect } from 'react-redux';

const RecipeDetail = ({ recipes }) => {
    return (
        <div>
            {/*{recipes.map(recipe => (*/}
                {/*<div key={recipe.id}>*/}
                    {/*{recipe.title}*/}
                {/*</div>*/}
            {/*))}*/}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        recipes: state.recipes
    }
};

export default connect(mapStateToProps)(RecipeDetail);
