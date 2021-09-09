import { useState } from 'react';

export default function useControlledForms(fields) {
  const [formValues, setFormValues] = useState(fields)

  const handleFormChange = event => {
    event.preventDefault();
    setFormValues(prev => {
      const newVals = {...prev};
      newVals[event.target.name] = event.target.value;
      console.log(newVals)
      return newVals;
    })
  }

  return [formValues, handleFormChange]
}