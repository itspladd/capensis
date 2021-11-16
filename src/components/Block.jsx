import '../styles/Block.css'
import classNames from 'classnames'
import { makeShortIntervalString } from '../helpers/stringHelpers'
import { getHM } from '../helpers/timeHelpers'

import Button from 'react-bootstrap/Button'

export default function Block(props) {
  const { id, title, spacer, length, start_time, end_time, toggle } = props;

  const interval = makeShortIntervalString(start_time, end_time);

  // Is this block a placeholder?

  const lengthStr = spacer ? "1rem" : `${length}rem`

  const blockClass = classNames("block", "list-group-item", {
    spacer,
    project: !spacer,
    short: length === 1,
    "hour-end": spacer &&
                getHM(end_time)[1] === 0, // if we're a spacer and end-time minutes are 0
    "hour-start": spacer &&
                getHM(start_time)[1] === 0,
  });

  const handleClick = spacer ? (e) => {e.preventDefault()} : toggle

  const handleEdit = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log('clicked edit')
  }

  const handleDelete = e => {
    e.preventDefault();
    e.stopPropagation();
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
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </>
        }
    </li>
  )
}