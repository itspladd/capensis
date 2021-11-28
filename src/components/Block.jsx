import '../styles/Block.css'
import classNames from 'classnames'
import { makeShortIntervalString } from '../helpers/stringHelpers'
import { getHM } from '../helpers/timeHelpers'

import Button from 'react-bootstrap/Button'
import IconButton from './IconButton'
import axios from 'axios'

export default function Block(props) {
  const { id, title, spacer, length, start_time, end_time, toggle, edit, refreshData } = props;

  const interval = makeShortIntervalString(start_time, end_time);

  // Is this block a placeholder?

  const lengthStr = spacer ? "1rem" : `${length}rem`

  const blockClass = classNames("block", "list-group-item", {
    spacer,
    project: !spacer,
    tiny: length === 1,
    short: length === 2,
    "hour-end": spacer &&
                getHM(end_time)[1] === 0, // if we're a spacer and end-time minutes are 0
    "hour-start": spacer &&
                getHM(start_time)[1] === 0,
  });

  const handleClick = spacer ? (e) => {e.preventDefault()} : toggle

  const handleEdit = e => {
    e.preventDefault();
    e.stopPropagation();
    edit();
    console.log('clicked edit')
  }

  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('deleting block', `api/blocks/${id}`)
    axios.delete(`/api/blocks/${id}`)
      .then(refreshData)
    console.log('clicked delete')
  }

  return(
    <li
      id={id}
      className={blockClass}
      style={{height: lengthStr}}
      onClick={handleClick}
    >
        {!spacer &&
        <>
          <div className={"block-body"}>
            <p>{title}</p>
            <span className="text-muted">{interval}</span>
          </div>
          <div className={"block-controls"}>
            <IconButton
              fill="green"
              dimensions={[24, 24]}
              onClick={handleEdit}>
              <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
            </IconButton>
            <IconButton
              fill="red"
              dimensions={[24, 24]}
              onClick={handleDelete}>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </IconButton>
          </div>
        </>
        }
    </li>
  )
}