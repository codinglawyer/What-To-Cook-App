import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { lifecycle } from '../utils/lifecycle-fp';

import Navigation from '../components/Navigation';
import FetchError from '../components/FetchError';
import * as actions from '../actions/index';
import { getAllRecipes, getIsFetching, getErrorMessage } from '../reducers/index';


const mainLifecycle = {
    componentDidMount({fetchRecipesRequest }) {
        fetchRecipesRequest();
    }
};

const renderHome = ({
    recipes,
    isFetching,
    errorMessage,
    params,
    children,
    ...props
}) => {
    console.log("PARAMS", params);
    return (
        <div>
            <Navigation
                actions={props}
                recipes={recipes}
            />
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
            {children}
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
    lifecycle(mainLifecycle),
)(renderHome);

export default Home;
