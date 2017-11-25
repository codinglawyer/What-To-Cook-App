import React from 'react'
import T from 'prop-types'
import { Flex, Box } from 'reflexbox'
import { Field } from 'redux-form'
import TrashIcon from '../icons/TrashIcon'
import PlusIcon from '../icons/PlusIcon'
import TextField from './TextField'
import { ButtonContainer, RelativeContainer, Button } from './styles'

const DirectionsForm = ({ fields, style }) => (
  <RelativeContainer>
    <ButtonContainer>
      <Button type="button" onClick={() => fields.push()}>
        <PlusIcon /> Add direction
      </Button>
    </ButtonContainer>
    {fields.map((direction, index) => (
      <Flex wrap key={index}>
        <Box col={12} lg={7} sm={6}>
          <Field
            name={`${direction}`}
            type="text"
            component={TextField}
            label="Direction"
            style={style}
          />
        </Box>
        <Box col={12} lg={5} sm={6}>
          <Button onClick={() => fields.remove(index)}>
            <TrashIcon />
          </Button>
        </Box>
      </Flex>
    ))}
  </RelativeContainer>
)

DirectionsForm.propTypes = {
  fields: T.object.isRequired,
  style: T.object
}

export default DirectionsForm
