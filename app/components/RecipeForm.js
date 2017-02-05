import React from 'react';
import uuidV4 from 'uuid';
import { Field, FieldArray, reduxForm } from 'redux-form';
import * as actions from '../actions/index';


const renderField = ({ input, label }) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <input
                    {...input}
                    type="text"
                    placeholder={label}
                />
            </div>
        </div>
    )
};

const renderIngredients = ({ fields }) => {
    return (
        <div>
            <div>
                <button
                    type="button"
                    onClick={() => fields.push({})}
                >
                    Add Ingredient
                </button>
            </div>
            {fields.map((ingredient, index) =>
                <div key={index}>
                    <button
                        type="button"
                        title="remove"
                        onClick={() => fields.remove(index)}
                    />
                    <Field
                        name={`${ingredient}.ingredient`}
                        type="text"
                        component={renderField}
                        label="ingredient"
                    />
                </div>
            )}
        </div>
    )
};

const RecipeForm = ({ handleSubmit, pristine, submitting, reset }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="title"
                type="text"
                component={renderField}
                label="Title"
            />
            <FieldArray
                name="ingredients"
                component={renderIngredients}
            />
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'form',
    fields: ['recipe', 'ingredients'],
    onSubmit: (recipeData, dispatch) => {
        recipeData.id = uuidV4();
        dispatch(actions.addRecipe(recipeData))
    }
})(RecipeForm)
