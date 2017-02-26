import React from 'react';
import uuidV4 from 'uuid';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { toArray } from 'lodash';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../../actions/index';

const renderField = ({
    input,
    label,
    multiLine,
    rows,
}) => (
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
                style={{width:'30%'}}
            />
        </div>
    </div>
);

const renderIngredients = ({ fields }) => (
    <div>
        <div>
            <RaisedButton
                className="addIngredient"
                labelStyle={{fontSize: '12px'}}
                label="Add Ingredient"
                secondary={true}
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
                />
                <Field
                    name={`${ingredient}.ingredient`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Ingredient`}
                />
                <Field
                    name={`${ingredient}.amount`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Amount`}
                />
            </div>
        )}
    </div>
);

const renderDirections = ({ fields }) => (
    <div>
        <div>
            <RaisedButton
                className="addIngredient"
                labelStyle={{fontSize: '12px'}}
                label="Add Direction"
                secondary={true}
                type="button"
                onClick={() => fields.push()}
            />
        </div>
        {fields.map((direction, index) =>
            <div key={index}>
                <FlatButton
                    label="Delete Ingredient"
                    secondary={true}
                    type="button"
                    title="remove"
                    onClick={() => fields.remove(index)}
                />
                <Field
                    name={`${direction}`}
                    type="text"
                    component={renderField}
                    label={`#${index + 1} Direction`}
                    multiLine={true}
                    rows={3}
                />
            </div>
        )}
    </div>
);

const RecipeForm = ({
    handleSubmit,
    pristine,
    submitting,
    reset,
    isFormDisplayed,
}) => (
    <div>
        {isFormDisplayed ? (
            <div>
                <h3>Fill Recipe Information</h3>
                <form onSubmit={handleSubmit}>
                    <Field
                        name="title"
                        type="text"
                        component={renderField}
                        label="Title"
                    />
                    <FieldArray
                        name="directions"
                        component={renderDirections}
                    />
                    <Field
                        name="servings"
                        type="text"
                        component={renderField}
                        label="Servings"
                    />
                    <FieldArray
                        name="ingredients"
                        component={renderIngredients}
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

export default reduxForm({
    form: 'form',
    fields: ['recipe', 'ingredients'],
    onSubmit: (recipeData, dispatch) => {
        recipeData.id = uuidV4();
        dispatch(actions.addRecipe({recipeData}))
    }
})(RecipeForm)

