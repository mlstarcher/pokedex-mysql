import React from 'react'

export default function TypeOption({ currentType }) {
  return (
    <option>
      {currentType.type}
    </option>
  )
}
