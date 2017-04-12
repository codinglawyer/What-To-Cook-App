import React from 'react'
import { compose, withState } from 'recompose'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const renderSelect = ({
    value,
    setValue
} = {}) => (
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
            selectedMenuItemStyle={{ color: 'rgb(229, 143, 55)' }}
            value={value}
            onChange={(event, key, payload) => setValue(payload)}
        >
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
        </SelectField>
    </div>
)

const Select = compose(
    withState('value', 'setValue', 1)
)(renderSelect)

export default Select
