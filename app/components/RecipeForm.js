import React from 'react';
import uuidV4 from 'uuid';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/index'

const RecipeForm = ({ handleSubmit, pristine, submitting, reset, dispatch}) => {
    console.log("DISPATCJ", dispatch);
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Recipe Name</label>
                <div>
                    <Field
                        name="recipe"
                        component="input"
                        type="text"
                        placeholder="Recipe Name"
                    />
                </div>
            </div>
            <div>
                <label>Ingredients</label>
                <div>
                    <Field
                        name="ingredients"
                        component="input"
                        type="text"
                        placeholder="Recipe Name"
                    />
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'form',
    fields: ['recipe', 'ingredients'],
    onSubmit: function(recipeData, dispatch){
        recipeData.id = uuidV4();
        dispatch(actions.addRecipe(recipeData))
    }
})(RecipeForm)
