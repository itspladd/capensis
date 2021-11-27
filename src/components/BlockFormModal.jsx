import { useState } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import useControlledForms from '../hooks/useControlledForms';
import useNewBlockValidation from '../hooks/useNewBlockValidation';

import SETTINGS from '../constants/settings'

import { getBoundaryMinutes } from '../helpers/timeHelpers'
import { makeErrorString } from '../helpers/stringHelpers'
import STRINGS from '../constants/strings';

const defaultFormValues = {
  project: "",
  startHour: "6",
  startMinute: "00",
  startAMPM: "0",
  endHour: "6",
  endMinute: "00",
  endAMPM: "0"
}
const LANG = SETTINGS.LANGUAGES.EN_US;

export default function BlockFormModal(props) {
  const { show, blockId, initValues = defaultFormValues, handleClose, currentDay, projects, blocks, refreshData } = props;

  const [values, handleChange] = useControlledForms(initValues);

  const [errors, formIsValid] = useNewBlockValidation(values, blocks, currentDay)
  const [showErrors, setShowErrors] = useState(false);

  const currentDateText = currentDay && currentDay.toDateString();

  // Make the options lists for the form <select> tags
  const projectOptions = projects &&
    Object.values(projects).reverse()
    .map(project => (
    <option value={project.id} key={project.id}>{project.title}</option>
  ));

  // Note that hoursOptions creates an anonymous function and then
  // runs it immediately.
  const hoursOptions = function() {
    const optionsList = [];
    for(let hour = 1; hour <= 12; hour++) {
      // The 12 hour should display as 12, but has a value of 0 for time calculations.
      // The PM value accounts for the 12-hour offset for noon.
      // (i.e. 12:00 AM is 00:00 (0 hours for '12' + 0 hours for 'AM'
      //  and 12:00 PM is 12:00 (0 hours for '12', 12 hours for 'PM'))
      optionsList.push(
        <option
          value={hour === 12 ? 0 : hour}
          key={hour === 12 ? 0 : hour}
        >
            {hour}
        </option>)
    }
    return optionsList;
  }()

  const makeErrorTag = errorString => {
    return (<small className="form-text text-muted">
    { errorString }
    </small>)
  }

  // Populate the list of errors.
  const errorList = Object.keys(errors)
    .filter(key => errors[key])
    .map(key => makeErrorString(key, errors[key], LANG))
    .map(error => {
      if (Array.isArray(error)) return error.map(makeErrorTag);

      return makeErrorTag(error);
    })

  !errorList.length && errorList.push(makeErrorTag(STRINGS[LANG].FORM_VALID))

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
           .then(handleClose)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule a new Block</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          Date: <strong>{currentDateText}</strong>
          <div className="row row-cols-sm-auto g-5 align-items-center">
            <label htmlFor="project">Project</label>
            <div className="col-12">
              <select className="form-select" name="project" id="project" value={values.project} onChange={handleChange}>
                <option value="">Select a project</option>
                {projectOptions}
              </select>
            </div>
          </div>
          <div className="row row-cols-lg-auto g-2 mt-1 align-items-center">
            <label htmlFor="startHour">Starting at:</label>
            <div className="col-12">
              <select className="form-select" name="startHour" id="startHour" value={values.startHour} onChange={handleChange}>
                {hoursOptions}
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="startMinute" id="startMinute" value={values.startMinute} onChange={handleChange}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="startAMPM" id="startAMPM" value={values.startAMPM} onChange={handleChange}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </div>
          </div>
          <div className="row row-cols-lg-auto g-2 mt-1 align-items-center">
            <label>Ending at:</label>
            <div className="col-12">
              <select className="form-select" name="endHour" id="endHour" value={values.endHour} onChange={handleChange}>
                {hoursOptions}
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="endMinute" id="endMinute" value={values.endMinute} onChange={handleChange}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="endAMPM" id="endAMPM" value={values.endAMPM} onChange={handleChange}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </div>
            { showErrors && errorList }
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
