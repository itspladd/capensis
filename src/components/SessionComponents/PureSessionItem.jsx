import { forwardRef, useRef, useImperativeHandle } from 'react'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import classNames from 'classnames'

import { makeDurationFromHHMM, makeWeekDayString, makeDateString, makeTimeString } from '../../helpers/stringHelpers'

import STATUSES from '../../constants/statuses'

import TabButton from '../TabButton'
import Loading from '../Loading'
import SuccessIcon from '../SuccessIcon'

import '../../styles/SessionItem.css'

const LANG = "EN-US"

function PureSessionItem (props, ref) {
  const {
    status,
    title,
    project,
    active,
    start,
    end,
    refDay,
    onChange,
    submit,
    deleteItem,
    setStatus,
    handleToggle
  } = props;

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusTime: () => {
      inputRef.current.focus();
    },
    scroll: () => {
      scrollRef.current.scrollIntoView(false);
    }
  }));

  const duration = `${makeDurationFromHHMM(start, end)}${active ? ", active" : ""}`;
  const weekday = makeWeekDayString(LANG, refDay);
  const date = makeDateString(LANG, refDay);

  // Statuses and their components
  const statusComponents = {
    active: <TabButton variant="outline-dark" size="sm" onClick={handleToggle}>Stop</TabButton>,
    stable: (
      <>
      <TabButton variant="outline-secondary" size="sm" onClick={() => setStatus(STATUSES.EDITING)}>Edit</TabButton>
      <TabButton variant="outline-danger" size="sm" onClick={deleteItem}>Delete</TabButton>
      </>
    ),
    editing: (
      <>
        <TabButton onClick={submit} variant="success" size="sm" type="submit">Save</TabButton>
        <TabButton onClick={() => setStatus(STATUSES.STABLE)} variant="danger" size="sm" >Cancel</TabButton>
      </>
    ),
    loading: <Loading iconOnly>Saving...</Loading>,
    deleting: "",
    success: <SuccessIcon />,
    failure: "Submit failed."
  }

  const outerClassName = classNames("session-item", {
    [status]: true,
    active,
    project
  })

  return (
    <ListGroupItem as="a" {...(project && {onClick: handleToggle})} className={outerClassName}>
      <div ref={scrollRef} className="session-item-content">
        {project && <strong className="session-item-title">{title}</strong>}
        { project ?
         <span className="text-muted">Click to start tracking</span>
        :
        <>
        <div className="session-item-date">
            <strong>{weekday}</strong>
            <span className="text-muted">{date}</span>
        </div>
        <div className="session-item-time">
          {/* If we're in the editing status, show the form. Otherwise, just display the times. */}
          {status === STATUSES.EDITING ?
            <form>
              <fieldset>
                <label htmlFor="start">Start</label>
                <input ref={inputRef} id="start" type="time" onChange={onChange} value={start}/>
              </fieldset>
              <fieldset>
                <label htmlFor="end">End</label>
                <input id="end" type="time" onChange={onChange} value={end}/>
                <span className="text-muted">({duration})</span>
              </fieldset>
            </form>
            :
            <>
              <span>{makeTimeString(start)} to {makeTimeString(end)}</span>
              <span className="text-muted">({duration})</span>
            </>
          }
        </div>
        </>
        }
      </div>
      <div className={`session-item-status ${status}`}>
        {statusComponents[status]}
      </div>
  </ListGroupItem>)
  }

// eslint-disable-next-line no-func-assign
export default PureSessionItem = forwardRef(PureSessionItem);