import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Field } from 'redux-form'
import TrashIcon from '../icons/TrashIcon'
import PlusIcon from '../icons/PlusIcon'
import TextField from './TextField'
import { ButtonContainer, RelativeContainer, Button } from './styles'
import SelectField from './SelectField'

const IngredientsForm = ({ fields, style }) => (
  <RelativeContainer>
    <ButtonContainer>
      <Button type="button" onClick={() => fields.push()}>
        <PlusIcon /> Add ingredient
      </Button>
    </ButtonContainer>
    {fields.map((ingredient, index) => (
      <Flex wrap key={index}>
        <Box col={12} lg={4} sm={6}>
          <Field
            name={`${ingredient}.name`}
            type="text"
            component={TextField}
            label="Name"
            style={style}
          />
        </Box>
        <Box col={12} lg={2} sm={6}>
          <Field
            name={`${ingredient}.amount`}
            type="text"
            component={TextField}
            label="Amount"
            style={{ ...style, width: '50%' }}
          />
        </Box>
        <Box col={12} lg={2} sm={6}>
          <Field
            name={`${ingredient}.units`}
            type="text"
            component={SelectField}
            label="Units"
            labelText="Units"
            options={['g', 'ml', 'cup', 'oz', 'tsp', 'tbs', 'pieces']}
            style={{ ...style, width: '50%' }}
          />
        </Box>{' '}
        <Box col={12} lg={3} sm={6}>
          <Button onClick={() => fields.remove(index)}>
            <TrashIcon />
          </Button>
        </Box>
      </Flex>
    ))}
  </RelativeContainer>
)

export default IngredientsForm
