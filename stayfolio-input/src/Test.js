import React, { useState } from 'react';
import InputRange from 'react-input-range';
import './index.css'

const Test = () => {
  const [value, setValue] = useState({
    min: 2, max: 10
  });


  return (
    <InputRange
      maxValue={20}
      minValue={0}
      value={value}
      onChange={value => setValue(value)} />
  )
}

export default Test
