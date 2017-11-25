import React from 'react'
import { compose, withState } from 'recompose'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const renderSelect = ({ keyValue, setKeyValue, input: {onChange} } = {}) => (
  <div>
    <SelectField
      floatingLabelText="Units"
      floatingLabelStyle={{
        fontSize: '22px',
        top: 21,
        fontWeight: 400,
        marginBottom: '25px',
        color: 'inherit'
      }}
      style={{
        fontSize: '20px',
        fontWeight: 300,
        marginBottom: '25px'
      }}
      selectedMenuItemStyle={{ color: 'rgb(229, 143, 55)' }}
      value={keyValue}
      onChange={(event, key, payload) => {
        onChange(event.target.textContent)
        setKeyValue(payload)
      }}
    >
      <MenuItem value={1} primaryText="Select units" />
      <MenuItem value={2} primaryText="g" />
      <MenuItem value={2} primaryText="ml" />
      <MenuItem value={3} primaryText="cup" />
      <MenuItem value={4} primaryText="oz" />
      <MenuItem value={5} primaryText="tsp" />
      <MenuItem value={6} primaryText="tbs" />
    </SelectField>
  </div>
)

const Select = compose(withState('keyValue', 'setKeyValue', 1))(renderSelect)

export default Select
