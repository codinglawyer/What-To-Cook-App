import React from 'react'
import TextField from 'material-ui/TextField'

const TextFieldForm = ({ input, label, multiLine, rows, style } = {}) => (
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
        underlineFocusStyle={{ borderColor: 'rgb(229, 143, 55)' }}
      />
    </div>
  </div>
)

export default TextFieldForm
