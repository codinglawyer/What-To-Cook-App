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

import { Header } from '../../styles/global-styles';


const mapStateToProps = (state, { params }) => {
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
    <div>
        <div>
            <FlatButton
                className="addIngredient"
                labelStyle={{fontSize: '12px'}}
                label="Add Ingredient"
                type="button"
                onClick={() => fields.push()}
                style={{
                    height: '25px',
                    lineHeight: 0,
                }}
                backgroundColor="#efb982"
                hoverColor="#f5d2af"
            />
        </div>
        {fields.map((ingredient, index) =>
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
                    name={`${ingredient}.ingredient`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Ingredient`}
                    style={style}
                />
                <Field
                    name={`${ingredient}.amount`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Amount`}
                    style={style}
                />
            </div>
        )}
    </div>
);

const renderDirections = ({ fields, style }) => (
    <div>
        <div>
            <FlatButton
                className="addDirection"
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
        </div>
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
    </div>
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
                    <Field
                        name="title"
                        type="text"
                        component={renderField}
                        label="Title"
                        style={{width:'20%'}}

                    />
                    <Field
                        name="servings"
                        type="text"
                        component={renderField}
                        label="Servings"
                        style={{width:'10%'}}
                    />
                    <FieldArray
                        name="ingredients"
                        component={renderIngredients}
                        style={{width:'30%'}}
                    />
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
