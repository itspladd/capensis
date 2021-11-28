import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SETTINGS from '../constants/settings';
import STRINGS from '../constants/strings';

import { truthyOrLengthy } from '../helpers/boolHelpers';
import { makeErrorString } from '../helpers/stringHelpers';
import { makeErrorList, makeHoursOptions, makeProjectOptions } from '../helpers/tagHelpers'

import '../styles/BlockFormModal.css'


const LANG = SETTINGS.LANGUAGES.EN_US;

export default function BlockFormModal(props) {
  const {
    currentDay,
    projects,
    state,
    actions
  } = props;

  const { errors, show, showErrors, valid, values } = state;
  const { submit, close, change } = actions;

  const currentDateText = currentDay && currentDay.toDateString();

  // Populate the list of errors.
  const errorStrings = Object.keys(errors)
    .filter(key => truthyOrLengthy(errors[key])) // Strip out empty errors
    .map(key => makeErrorString(key, errors[key], LANG))
  const errorList = makeErrorList(errorStrings, STRINGS[LANG].FORM_ERRORS)

  const projectOptions = makeProjectOptions(projects)
  const hoursOptions = makeHoursOptions();

  return (
    <Modal className="blockFormModal" show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Schedule a new Block</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submit}>
          Date: <strong>{currentDateText}</strong>
          <div className="row row-cols-sm-auto g-5 align-items-center">
            <label htmlFor="project">Project</label>
            <div className="col-12">
              <select className="form-select" name="project" id="project" value={values.project} onChange={change}>
                <option value="">Select a project</option>
                {projectOptions}
              </select>
            </div>
          </div>
          <div className="row row-cols-lg-auto g-2 mt-1 align-items-center">
            <label htmlFor="startHour">Starting at:</label>
            <div className="col-12">
              <select className="form-select" name="startHour" id="startHour" value={values.startHour} onChange={change}>
                {hoursOptions}
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="startMinute" id="startMinute" value={values.startMinute} onChange={change}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="startAMPM" id="startAMPM" value={values.startAMPM} onChange={change}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </div>
          </div>
          <div className="row row-cols-lg-auto g-2 mt-1 align-items-center">
            <label>Ending at:</label>
            <div className="col-12">
              <select className="form-select" name="endHour" id="endHour" value={values.endHour} onChange={change}>
                {hoursOptions}
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="endMinute" id="endMinute" value={values.endMinute} onChange={change}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </div>
            <div className="col-12">
              <select className="form-select" name="endAMPM" id="endAMPM" value={values.endAMPM} onChange={change}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </div>
          </div>
          { showErrors &&
              <section>
                {valid ?
                  <small>{STRINGS[LANG].FORM_VALID}</small>
                  :
                  errorList
                }
              </section>
            }
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={submit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
