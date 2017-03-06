import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { toArray } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../../actions/index';


const mapStateToProps = (state, { params }) => ({
    initialValues: state.recipes.byId[params.params.id],
});

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
            <RaisedButton
                className="addIngredient"
                labelStyle={{fontSize: '12px'}}
                label="Add Ingredient"
                type="button"
                onClick={() => fields.push()}
            />
        </div>
        {fields.map((ingredient, index) =>
            <div key={index}>
                <FlatButton
                    label="Delete Ingredient"
                    secondary={true}
                    type="button"
                    title="remove"
                    onClick={() => fields.remove(index)}
                    labelStyle={{fontSize: 10, width:'30%'}}
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
            <RaisedButton
                className="addDirection"
                labelStyle={{fontSize: '12px'}}
                label="Add Direction"
                secondary={true}
                type="button"
                onClick={() => fields.push()}
                style={{marginTop: 20, marginBottom: 10}}
            />
        </div>
        {fields.map((direction, index) =>
            <div key={index}>
                <FlatButton
                    label="Delete Direction"
                    secondary={true}
                    type="button"
                    title="remove"
                    onClick={() => fields.remove(index)}
                    labelStyle={{fontSize: 10, width:'30%'}}
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
}) => {
    console.log("LOAD", params);
    return(
        <div className="recipeForm">
            {isFormDisplayed ? (
                    <div>
                        <h3>Fill Recipe Information</h3>
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
                                    primary={true}
                                    type="submit"
                                    disabled={submitting}
                                />
                                <RaisedButton
                                    className="clearButton"
                                    label="Clear Values"
                                    default={true}
                                    type="button"
                                    disabled={pristine || submitting}
                                    onClick={reset}
                                />
                            </div>
                        </form>
                    </div>
                ) : null}
        </div>
    );
}

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
