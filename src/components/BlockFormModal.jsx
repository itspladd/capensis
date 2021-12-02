import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import SETTINGS from '../constants/settings';
import STRINGS from '../constants/strings';

import { truthyOrLengthy } from '../helpers/boolHelpers';
import { makeErrorString } from '../helpers/stringHelpers';
import { makeErrorList, makeHoursOptions, makeProjectOptions } from '../helpers/tagHelpers'

import '../styles/modal.css'
import '../styles/BlockFormModal.css'

const LANG = SETTINGS.LANGUAGES.EN_US;

export default function BlockFormModal(props) {
  const {
    currentDay,
    projects = {},
    state,
    actions
  } = props;

  const { errors = {}, show, showErrors, valid, values = {}, editing } = state || {};
  const { submit, close, change } = actions || {};

  const currentDateText = currentDay && currentDay.toDateString();

  // Populate the list of errors.
  const errorStrings = Object.keys(errors)
    .filter(key => truthyOrLengthy(errors[key])) // Strip out empty errors
    .map(key => makeErrorString(key, errors[key], LANG))
  const errorList = makeErrorList(errorStrings, STRINGS[LANG].FORM_ERRORS)

  const projectOptions = makeProjectOptions(projects)
  const hoursOptions = makeHoursOptions();

  const title = editing ? STRINGS[LANG].FORM_EDITING : STRINGS[LANG].FORM_NEW

  return (
    <Modal className="block_form_modal" show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="block_form" onSubmit={submit}>
          <fieldset>
            <legend>Date:</legend><strong>{currentDateText}</strong>
          </fieldset>
          <fieldset>
            <legend>Project:</legend>
            <label className="visually-hidden" htmlFor="project">Project:</label>
            <select className="form-select" name="project" id="project" value={values.project} onChange={change}>
              <option value="">Select a project</option>
              {projectOptions}
            </select>
          </fieldset>
          <fieldset>
            <legend>Starting at:</legend>
            <ul>
              <label className="visually-hidden" htmlFor="startHour">Start hour</label>
              <select className="form-select" name="startHour" id="startHour" value={values.startHour} onChange={change}>
                {hoursOptions}
              </select>
              <label className="visually-hidden" htmlFor="startMinute">Start minute</label>
              <select className="form-select" name="startMinute" id="startMinute" value={values.startMinute} onChange={change}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
              <label className="visually-hidden" htmlFor="startAMPM">Start AM/PM</label>
              <select className="form-select" name="startAMPM" id="startAMPM" value={values.startAMPM} onChange={change}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </ul>
          </fieldset>
          <fieldset>
            <legend>Ending at:</legend>
            <ul>
              <label className="visually-hidden" htmlFor="endHour">End hour</label>
              <select className="form-select" name="endHour" id="endHour" value={values.endHour} onChange={change}>
                {hoursOptions}
              </select>
              <label className="visually-hidden" htmlFor="endMinute">End minute</label>
              <select className="form-select" name="endMinute" id="endMinute" value={values.endMinute} onChange={change}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
              <label className="visually-hidden" htmlFor="endAMPM">End AM/PM</label>
              <select className="form-select" name="endAMPM" id="endAMPM" value={values.endAMPM} onChange={change}>
                <option value="0">AM</option>
                <option value="12">PM</option>
              </select>
            </ul>
          </fieldset>
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
