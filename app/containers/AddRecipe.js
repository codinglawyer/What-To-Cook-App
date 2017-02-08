import React from 'react';
import { connect } from 'react-redux';
import RecipeForm from '../components/RecipeForm'

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps
    }
}

export default connect(mapStateToProps)(RecipeForm)
