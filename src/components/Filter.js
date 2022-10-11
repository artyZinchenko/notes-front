/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterSelected = (filter) => {
    dispatch(setFilter(filter))
  }

  return (
    <div>
      <label>
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('ALL')}
          // eslint-disable-next-line react/no-unknown-property
          defaultChecked
        />
        all{'  '}
      </label>
      <label>
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('IMPORTANT')}
        />
        important{'  '}
      </label>
      <label>
        <input
          type='radio'
          name='filter'
          onChange={() => filterSelected('NONIMPORTANT')}
        />
        not important{' '}
      </label>
    </div>
  )
}

export default Filter
