import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from '../components/RecipeForm'

const mapStateToProps = (state) => {
    return {
        recipes: state.Recipe
    }
}

export default connect(mapStateToProps)(RecipeForm)
