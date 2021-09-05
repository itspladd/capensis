import { useState } from 'react';

export default function useControlledForms() {
  const [formValues, setFormValues] = useState({
    loginUsername: "",
    loginPass: "",
    registerUsername: "",
    registerPass: ""
  })

  const handleFormChange = event => {
    event.preventDefault();
    setFormValues(prev => {
      const newVals = {...prev};
      newVals[event.target.name] = event.target.value;
      return newVals;
    })
  }

  return [formValues, handleFormChange]
}