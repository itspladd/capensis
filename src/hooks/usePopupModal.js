import { useState } from 'react'

export default function usePopupModal() {

  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return [showModal, closeModal, show]
}