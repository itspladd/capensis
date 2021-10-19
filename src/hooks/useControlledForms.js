import { useState } from 'react';

export default function useControlledForms(fields) {
  const [formValues, setFormValues] = useState(fields)

  const handleFormChange = event => {
    event.preventDefault();
    setFormValues(prev => {
      const newVals = {...prev};
      newVals[event.target.id] = event.target.value;
      return newVals;
    })
  }

  return [formValues, handleFormChange]
}