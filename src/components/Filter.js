import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { useEffect } from 'react'

const Filter = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('ALL')

  useEffect(() => {
    setValue('ALL')
  }, [])

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    dispatch(setFilter(newValue))
  }

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby='row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value='ALL'
          control={<Radio />}
          label='all'
          defaultChecked
        />
        <FormControlLabel
          value='IMPORTANT'
          control={<Radio />}
          label='important'
        />
      </RadioGroup>
    </FormControl>
  )
}

export default Filter
