import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import useControlledForms from '../hooks/useControlledForms';

export default function NewBlockForm(props) {
  const { show, handleShow, handleClose, currentDay, projects, blocks, refreshBlocks } = props;

  const [badStart, setBadStart] = useState(false);
  const [badEnd, setBadEnd] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    valid: true,
    msg: ""
  })
  const [values, handleChange] = useControlledForms({
    project: "",
    startHour: "6",
    startMinute: "00",
    startAMPM: "0",
    endHour: "6",
    endMinute: "00",
    endAMPM: "0"
  });

  const currentDateText = currentDay.toDateString();

  const minutesSinceMidnight = (hours, minutes) => (hours * 60) + minutes;

  const getBoundaryMinutes = useCallback(values => {
    const startHours = Number(values.startHour) + Number(values.startAMPM);
    const startMinutes = Number(values.startMinute)
    const endHours = Number(values.endHour) + Number(values.endAMPM);
    const endMinutes = Number(values.endMinute)
    const startMins = minutesSinceMidnight(startHours, startMinutes);
    const endMins = minutesSinceMidnight(endHours, endMinutes);

    return [startMins, endMins]
  }, [])

  const handleSubmit = async event => {
    event.preventDefault();
    const [startMins, endMins] = getBoundaryMinutes(values);
    let valid, msg;
    if (startMins > endMins) {
      valid = false;
      msg = "Submit failed - that block starts before its end time!";
    } else if (badStart || badEnd) {
      valid = false;
      msg = "Submit failed - your start or end time conflicts with an existing block."
    } else if (values.project === "") {
      valid = false;
      msg = "Submit failed - select a project first!"
    } else {
      valid = true;
      msg = "Validation successful, submitting!"
      // Turn the raw values into ISO strings to send
      const startDateMs = currentDay.valueOf() + (startMins * 60 * 1000);
      const endDateMs = currentDay.valueOf() + (endMins * 60 * 1000);
      const startTime = new Date(startDateMs).toISOString();
      const endTime = new Date(endDateMs).toISOString();

      axios.post('/api/blocks', { startTime, endTime, project: values.project})
           .then(res => {
             console.log(res);
             refreshBlocks()
           })
      handleClose();
    }
    setSubmitStatus({ valid, msg });
  }

  // Check to see if the start/end times conflict with existing blocks
  useEffect(() => {

    setBadStart(false);
    setBadEnd(false);
    const [startMinutes, endMinutes] = getBoundaryMinutes(values);
    const dayBlocks = blocks.filter(block => new Date(block.start_time).getDate() === currentDay.getDate())
    dayBlocks.forEach(block => {
      const blockStart = new Date(block.start_time);
      const blockEnd = new Date(block.end_time);
      const blockStartMins = minutesSinceMidnight(blockStart.getHours(), blockStart.getMinutes())
      const blockEndMins = minutesSinceMidnight(blockEnd.getHours(), blockEnd.getMinutes())

      if (startMinutes >= blockStartMins &&
        startMinutes < blockEndMins) {
            setBadStart(true);
      }

      if (endMinutes > blockStartMins &&
        endMinutes <= blockEndMins) {
          setBadEnd(true);
      }
    })
  }, [values, currentDay, blocks, getBoundaryMinutes])

  // Make the options lists for the form <select> tags
  const projectOptions = Object.values(projects).reverse().map(project => (
    <option value={project.id}>{project.title}</option>
  ));

  const hoursOptions = function() {
    const optionsList = [];
    for(let i = 1; i <= 12; i++) {
      optionsList.push(<option>{i}</option>)
    }
    return optionsList;
  }()

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule a new Block </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Date: <strong>{currentDateText}</strong>
        <form onSubmit={handleSubmit}>
          <div className="row row-cols-lg-auto g-5 align-items-center">
            <label for="project">Project</label>
            <div class="col-12">
              <select class="form-select" name="project" id="project" value={values.project} onChange={handleChange}>
                <option value="">Select a project</option>
                {projectOptions}
              </select>
            </div>
          </div>
          <div className="row row-cols-lg-auto g-2 mt-1 align-items-center">
            <label for="startHour">Starting at:</label>
            <div className="col-12">
              <select className="form-select" name="startHour" id="startHour" value={values.startHour} onChange={handleChange}>
                {hoursOptions}
              </select>
            </div>
            <div className="col-12">
              <select class="form-select" name="startMinute" id="startMinute" value={values.startMinute} onChange={handleChange}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
            <div className="col-12">
              <select class="form-select" name="startAMPM" id="startAMPM" value={values.startAMPM} onChange={handleChange}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </div>
            {badStart &&
             (<small id="passwordHelpBlock" class="form-text text-muted">
             That start time conflicts with an existing Block!
             </small>)}
          </div>
          <div className="row row-cols-lg-auto g-2 mt-1 align-items-center">
            <label>Ending at:</label>
            <div className="col-12">
              <select class="form-select" name="endHour" id="endHour" value={values.endHour} onChange={handleChange}>
                {hoursOptions}
              </select>
            </div>
            <div className="col-12">
              <select class="form-select" name="endMinute" id="endMinute" value={values.endMinute} onChange={handleChange}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
            <div className="col-12">
              <select class="form-select" name="endAMPM" id="endAMPM" value={values.endAMPM} onChange={handleChange}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </div>
            {badEnd &&
             (<small id="passwordHelpBlock" class="form-text text-muted">
             That end time conflicts with an existing Block!
             </small>)}
          </div>
        </form>
        </Modal.Body>
          {!submitStatus.valid && (
            <Modal.Footer>{submitStatus.msg}</Modal.Footer>
          )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
