import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { Title, Header } from './styles';

import FetchError from '../../components/FetchError';
import * as actions from '../../actions/index';
import { getAllRecipes, getIsFetching, getErrorMessage, getCompleteRecipes, getAllIngredients } from '../../reducers/index';


const renderHomeScreen = ({
    recipes,
    isFetching,
    errorMessage,
    ...props,
}) => {
    return (
        <div>
            <Title>What do you want to cook?</Title>
            <Header>asds</Header>
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
    recipes: getCompleteRecipes(state, getAllRecipes, getAllIngredients),
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const HomeScreen = compose (
    connect(mapStateToProps, mapDispatchToProps),
)(renderHomeScreen);

export default HomeScreen;
