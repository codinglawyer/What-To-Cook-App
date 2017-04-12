import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DropDownMenuOpenImmediateExample from './SelectField'
import * as actions from '../../actions/index'
import { getRecipe, getAllIngredients } from '../../reducers/index'

import { Header } from '../../styles/global-styles'
import { RecipeHeading, ButtonContainer, RelativeContainer, Button } from './styles'
import TrashIcon from '../icons/TrashIcon'
import PlusIcon from '../icons/PlusIcon'

const mapStateToProps = (state, { params }) => {
    if (!params.params.id) {
        return {
            initialValues: {
                ingredients: [{ name: '', amount: '' }],
                directions: ['']
            }
        }
    }
    const recipe = getRecipe(state, params.params.id)
    const allIngredients = getAllIngredients(state)
    const ingredients = recipe.ingredients.map(ingredient => allIngredients[ingredient])
    return {
        initialValues: { ...recipe, ingredients: [...ingredients] }
    }
}

const renderField = ({
    input,
    label,
    multiLine,
    rows,
    style
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
                underlineFocusStyle={{borderColor: 'rgb(229, 143, 55)'}}
            />
        </div>
    </div>
)

const renderIngredients = ({ fields, style }) => (
    <RelativeContainer>
        <ButtonContainer>
            <Button
                type="button"
                onClick={() => fields.push()}
            >
                <PlusIcon /> Add ingredient
            </Button>
        </ButtonContainer>
        {fields.map((ingredient, index) =>
            <Flex
                wrap
                key={index}
            >
                <Box
                    col={12}
                    lg={4}
                    sm={6}
                >
                    <Field
                        name={`${ingredient}.name`}
                        type="text"
                        component={renderField}
                        label="Name"
                        style={style}
                    />
                </Box>
                <Box
                    col={12}
                    lg={2}
                    sm={6}
                >
                    <Field
                        name={`${ingredient}.amount`}
                        type="text"
                        component={renderField}
                        label="Amount"
                        style={{...style, width: '50%'}}
                    />
                </Box>
                <Box
                    col={12}
                    lg={2}
                    sm={6}
                >
                    <Field
                        name={`${ingredient}.units`}
                        type="text"
                        component={DropDownMenuOpenImmediateExample}
                        label="Units"
                        style={{...style, width: '50%'}}
                    />
                </Box> <Box
                    col={12}
                    lg={3}
                    sm={6}
                >
                    <Button onClick={() => fields.remove(index)}>
                        <TrashIcon />
                    </Button>
                </Box>
            </Flex>
        )}
    </RelativeContainer>
)

const renderDirections = ({ fields, style }) => (
    <RelativeContainer>
        <ButtonContainer>
            <Button
                type="button"
                onClick={() => fields.push()}
            >
                <PlusIcon /> Add direction
            </Button>
        </ButtonContainer>
        {fields.map((direction, index) =>
            <Flex
                wrap
                key={index}
            >
                <Box
                    col={12}
                    lg={7}
                    sm={6}
                >
                    <Field
                        name={`${direction}`}
                        type="text"
                        component={renderField}
                        label="Direction"
                        style={style}
                    />
                </Box>
                <Box
                    col={12}
                    lg={5}
                    sm={6}
                >
                    <Button onClick={() => fields.remove(index)}>
                        <TrashIcon />
                    </Button>
                </Box>
            </Flex>
        )}
    </RelativeContainer>
)

const renderRecipeForm = ({
    handleSubmit,
    pristine,
    submitting,
    reset,
    isFormDisplayed = true,
    recipe,
    params
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
                            style={{
                                width: '30%',
                                fontSize: '20px'
                            }}
                        />
                    </RecipeHeading>
                    <Flex wrap>
                        <Box
                            col={12}
                            lg={3}
                            sm={6}
                        >
                            <RecipeHeading>
                                <Field
                                    name="servings"
                                    type="text"
                                    component={renderField}
                                    label="Servings"
                                    style={{
                                        width: '40%',
                                        fontSize: '20px'
                                    }}
                                />
                            </RecipeHeading>
                        </Box>
                        <Box
                            col={12}
                            lg={3}
                            sm={6}
                        >
                            <RecipeHeading>
                                <Field
                                    name="time"
                                    type="text"
                                    component={renderField}
                                    label="Time"
                                    style={{
                                        width: '40%',
                                        fontSize: '20px'
                                    }}
                                />
                            </RecipeHeading>
                        </Box>
                        <Box
                            col={12}
                            lg={3}
                            sm={6}
                        >
                            <RecipeHeading>
                            <Field
                                name="difficulty"
                                type="text"
                                component={renderField}
                                label="Difficulty"
                                style={{
                                    width: '40%',
                                    fontSize: '20px'
                                }}
                            />
                            </RecipeHeading>
                        </Box>
                    </Flex>
                    <RecipeHeading>Ingredients</RecipeHeading>
                    <FieldArray
                        name="ingredients"
                        component={renderIngredients}
                        style={{
                            fontSize: '20px',
                            fontWeight: 300,
                            marginBottom: '25px'
                        }}
                    />
                    <RecipeHeading>Directions</RecipeHeading>
                    <FieldArray
                        name="directions"
                        component={renderDirections}
                        style={{
                            fontSize: '20px',
                            fontWeight: 300,
                            width: '90%',
                            marginBottom: '25px'
                        }}
                    />
                    <div>
                        <RaisedButton
                            label="Submit"
                            type="submit"
                            disabled={submitting}
                            backgroundColor="#e58f37"
                            style={{ margin: '20px' }}
                        />
                        <RaisedButton
                            label="Clear Values"
                            type="button"
                            disabled={pristine || submitting}
                            onClick={reset}
                            backgroundColor="#000000"
                            labelColor="#e58f37"
                            style={{ margin: '20px' }}
                        />
                    </div>
                </form>
            </div>
        ) : null}
    </div>
)

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

export default RecipeForm
