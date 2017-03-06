import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import FetchError from '../components/FetchError';
import * as actions from '../actions/index';
import { getAllRecipes, getIsFetching, getErrorMessage } from '../reducers/index';


const renderHome = ({
    recipes,
    isFetching,
    errorMessage,
    ...props,
}) => {
    return (
        <div>
            <div>
                {isFetching && !recipes.allIds && (
                    <div>Loading</div>
                )}
            </div>
            <div>
                {errorMessage && !recipes.allIds && (
                    <FetchError
                        message={errorMessage}
                        onRetry={() => props.fetchRecipesRequest()}
                    />
                )}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    recipes: getAllRecipes(state),
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const Home = compose (
    connect(mapStateToProps, mapDispatchToProps),
)(renderHome);

export default Home;
