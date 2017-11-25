import React from 'react'
import T from 'prop-types'
import { compose, withState } from 'recompose'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const renderSelect = (
  { keyValue, setKeyValue, options, labelText, input: { onChange } } = {}
) => (
  <div>
    <SelectField
      floatingLabelText={labelText}
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
      <MenuItem value={1} primaryText="Select option" />
      {options.map((option, i) => (
        <MenuItem key={`${option}-${i}`} value={i + 2} primaryText={option} />
      ))}
    </SelectField>
  </div>
)

const Select = compose(withState('keyValue', 'setKeyValue', 1))(renderSelect)

SelectField.propTypes = {
  keyValue: T.number,
  setKeyValue: T.func,
  options: T.array,
  labelText: T.string,
  input: T.object
}

export default Select
