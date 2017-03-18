import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { toArray } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../../actions/index';
import { getRecipe, getAllIngredients } from '../../reducers/index';
import { Flex, Box } from 'reflexbox';

import { Header } from '../../styles/global-styles';
import { RecipeHeading, ButtonContainer, RelativeContainer} from './styles';


const mapStateToProps = (state, { params }) => {
    if (!params.params.id) {
        return {
            initialValues: {
                ingredients: [{name: '', amount: ''}],
                directions: [''],
            },
        };
    }
    const recipe = getRecipe(state, params.params.id);
    const allIngredients = getAllIngredients(state);
    const ingredients = recipe.ingredients.map(ingredient => allIngredients[ingredient]);
    return {
        initialValues: { ...recipe, ingredients: [...ingredients] },
    };
};

const renderField = ({
    input,
    label,
    multiLine,
    rows,
    style,
} = {}) => (
    <div>
        <label>{label}</label>
        <div>
            <TextField
                {...input}
                type="text"
                placeholder={label}
                multiLine={multiLine}
                rows={rows}
                className="textField"
                style={style}
        />
        </div>
    </div>
);

const renderIngredients = ({ fields, style }) => (
    <RelativeContainer>
        <ButtonContainer>
            <FlatButton
                label="Add Ingredient"
                type="button"
                onClick={() => fields.push()}
                style={{
                    height: '25px',
                    lineHeight: 0,
                    marginTop: 20,
                    marginBottom: 10,
                }}
                backgroundColor="#925313"
                hoverColor="#f5d2af"
                labelStyle={{
                    color: '#fff',
                    fontSize: '12px',
                }}
            />
        </ButtonContainer>
        {fields.map((ingredient, index) =>
            <Flex wrap key={index}>

                <Box>
                <Field
                    name={`${ingredient}.name`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} name`}
                    style={style}
                />
                </Box>
                <Box>
                <Field
                    name={`${ingredient}.amount`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Amount`}
                    style={style}
                />
                </Box>
                <Box>
                    <FlatButton
                        label="Delete"
                        secondary={true}
                        type="button"
                        title="remove"
                        onClick={() => fields.remove(index)}
                        labelStyle={{fontSize: 12, width:'30%'}}
                        style={{
                            height: '25px',
                            lineHeight: 0,
                        }}
                    />
                </Box>
            </Flex>
        )}
    </RelativeContainer>
);

const renderDirections = ({ fields, style }) => (
    <RelativeContainer>
        <ButtonContainer>
            <FlatButton
                label="Add Direction"
                type="button"
                onClick={() => fields.push()}
                style={{
                    height: '25px',
                    lineHeight: 0,
                    marginTop: 20,
                    marginBottom: 10,
                }}
                backgroundColor="#925313"
                hoverColor="#f5d2af"
                labelStyle={{
                    color: '#fff',
                    fontSize: '12px',
                }}
            />
        </ButtonContainer>
        {fields.map((direction, index) =>
            <div key={index}>
                <FlatButton
                    label="Delete"
                    secondary={true}
                    type="button"
                    title="remove"
                    onClick={() => fields.remove(index)}
                    labelStyle={{fontSize: 12, width:'30%'}}
                    style={{
                        height: '25px',
                        lineHeight: 0,
                    }}
                />
                <Field
                    name={`${direction}`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Direction`}
                    style={style}
                />
            </div>
        )}
    </RelativeContainer>
);

const renderRecipeForm = ({
    handleSubmit,
    pristine,
    submitting,
    reset,
    isFormDisplayed = true,
    recipe,
    params,
}) => (
    <div className="recipeForm">
        {isFormDisplayed ? (
            <div>
                <Header>Fill Recipe Information</Header>
                <form onSubmit={handleSubmit}>
                    <RecipeHeading>
                        <Field
                            name="title"
                            type="text"
                            component={renderField}
                            label="Title"
                            style={{width:'20%'}}
                        />
                    </RecipeHeading>
                    <RecipeHeading>
                        <Field
                            name="servings"
                            type="text"
                            component={renderField}
                            label="Servings"
                            style={{width:'10%'}}
                        />
                    </RecipeHeading>
                    <RecipeHeading>Ingredients</RecipeHeading>
                        <FieldArray
                            name="ingredients"
                            component={renderIngredients}
                            style={{width:'30%'}}
                        />
                    <RecipeHeading>Directions</RecipeHeading>
                        <FieldArray
                            name="directions"
                            component={renderDirections}
                            style={{width:'50%'}}
                        />
                    <div>
                        <RaisedButton
                            className="submitButton"
                            label="Submit"
                            type="submit"
                            disabled={submitting}
                            backgroundColor="#e58f37"
                            style={{ margin: '20px'}}
                        />
                        <RaisedButton
                            className="clearButton"
                            label="Clear Values"
                            type="button"
                            disabled={pristine || submitting}
                            onClick={reset}
                            backgroundColor="#000000"
                            labelColor="#e58f37"
                            style={{ margin: '20px'}}
                        />
                    </div>
                </form>
            </div>
        ) : null}
    </div>
);

const RecipeForm = compose(
    connect(mapStateToProps, null),
    reduxForm({
        form: 'form',
        fields: ['recipe', 'ingredients'],
        onSubmit: (_, dispatch) => {
            dispatch(actions.addRecipeRequest())
        }
    })
)(renderRecipeForm)

export default RecipeForm;
