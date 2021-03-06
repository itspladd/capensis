import { useState } from 'react'

import useControlledForms from './useControlledForms'
import useNewBlockValidation from './useNewBlockValidation'

import { getBoundaryMinutes, getHMO12 } from '../helpers/timeHelpers'

const defaultFormValues = {
  project: "",
  startHour: "6",
  startMinute: "00",
  startAMPM: "0",
  endHour: "6",
  endMinute: "00",
  endAMPM: "0"
}

export default function usePopupBlockForm(blocks, currentDay, dataActions) {

  const [show, setShow] = useState(false);
  const [blockId, setBlockId] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [values, handleChange, setValues] = useControlledForms(defaultFormValues);

  // Remove the currently-editing block (if we have one) from the list of conflicts
  const [errors, formIsValid] = useNewBlockValidation(values, blocks, currentDay, blockId)

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
      if (blockId) blockData.id = blockId;

      // If we have a block ID saved, we're updating an existing block.
      // If not, we're creating a new block.
      const method = blockId ? dataActions.editBlock : dataActions.scheduleBlock;
      method(blockData)
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
    const [startHour, startMinute, startAMPM] = getHMO12(start_time, true)
    const [endHour, endMinute, endAMPM] = getHMO12(end_time, true)
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