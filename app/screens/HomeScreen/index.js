import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import FetchError from '../../components/FetchError';
import * as actions from '../../actions/index';
import { getAllRecipes, getIsFetching, getErrorMessage, getCompleteRecipes, getAllIngredients } from '../../reducers/index';

import { HeaderPicture } from './styles';
import { Header } from '../../styles/global-styles';
import { Screen } from '../../styles/global-styles';


const renderHomeScreen = ({
    recipes,
    isFetching,
    errorMessage,
    ...props,
}) => {
    return (
        <Screen>
            <Header>What do you want to cook?</Header>
            <HeaderPicture />
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
        </Screen>
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
