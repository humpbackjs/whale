import React from 'react'
import { useStore } from 'nycticorax'
import { Dustbin } from './dustbin'
import { Box } from './box'

export default function () {
  const { components } = useStore('components')

  return (
    <>
      <Dustbin />
      <div>
        {
          components.map(({ name }) => (
            <Box name={name} />
          ))
        }
      </div>
    </>
  )
}
