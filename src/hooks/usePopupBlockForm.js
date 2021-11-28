import { useState } from 'react'
import axios from 'axios'

import useControlledForms from './useControlledForms'
import useNewBlockValidation from './useNewBlockValidation'

import { getBoundaryMinutes, getHM } from '../helpers/timeHelpers'

const defaultFormValues = {
  project: "",
  startHour: "6",
  startMinute: "00",
  startAMPM: "0",
  endHour: "6",
  endMinute: "00",
  endAMPM: "0"
}

export default function usePopupBlockForm(blocks, currentDay, refreshData) {

  const [show, setShow] = useState(false);
  const [blockId, setBlockId] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [values, handleChange, setValues] = useControlledForms(defaultFormValues);
  const [errors, formIsValid] = useNewBlockValidation(values, blocks, currentDay)

  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!formIsValid) {
      setShowErrors(true);
    } else {
      setShowErrors(false);
      // Turn the raw values into ISO strings to send
      const [startMins, endMins] = getBoundaryMinutes({values});
      const startDate = new Date(currentDay);
      const endDate = new Date(currentDay);
      startDate.setHours(0, startMins);
      endDate.setHours(0, endMins);
      const startTime = startDate.toISOString();
      const endTime = endDate.toISOString();
      const blockData = { startTime, endTime, project: values.project };

      const method = blockId ? axios.patch : axios.post;
      method(`/api/blocks/${blockId || ""}`, blockData)
           .then(refreshData)
           .then(closeModal)
    }
  }

  const newBlock = () => {
    setValues(defaultFormValues);
    setBlockId(null);
    showModal();
  }

  const editBlock = block => {
    const { id, start_time, end_time, project_id } = block;
    const [startHour, startMinute, startAMPM] = getHM(start_time, "12h")
    const [endHour, endMinute, endAMPM] = getHM(end_time, "12h")
    setValues({
      startHour,
      startMinute,
      startAMPM,
      endHour,
      endMinute,
      endAMPM,
      project: project_id
    })
    setBlockId(id);
    showModal();
  }

  const state = {
    show,
    values,
    errors,
    showErrors,
    editing: !!blockId,
    valid: formIsValid
  }

  const actions = {
    new: newBlock,
    edit: editBlock,
    close: closeModal,
    change: handleChange,
    submit: handleSubmit
  }

  return [state, actions]
}