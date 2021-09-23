import { useState } from 'react'

export default function usePopupModal() {

  const [show, setShow] = useState(false);

  const closeForm = () => setShow(false);
  const showForm = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form and close it
    setShow(false);
  }

  return [showForm, closeForm, show]
}