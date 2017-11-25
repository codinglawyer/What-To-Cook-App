import React from 'react'
import T from 'prop-types'
import TextField from 'material-ui/TextField'

const TextFieldForm = (
  { input, label, multiLine, rows, style, meta: { error, touched } } = {}
) => (
  <div>
    <label>{label}</label>
    <div>
      <TextField
        {...input}
        type="text"
        errorText={error && touched ? 'Recipe title is required' : ''}
        placeholder={label}
        multiLine={multiLine}
        rows={rows}
        className="textField"
        style={style}
        underlineFocusStyle={{ borderColor: 'rgb(229, 143, 55)' }}
      />
    </div>
  </div>
)

TextField.propTypes = {
  input: T.object,
  label: T.string,
  multiLine: T.bool.isRequired,
  rows: T.number,
  style: T.object,
  meta: T.object
}

export default TextFieldForm
