import { useEffect, useState } from 'react';

import { blockIsOnDay, getBoundaryMinutes } from '../helpers/timeHelpers'
import { truthyOrLengthy } from '../helpers/boolHelpers'

export default function useNewBlockValidation(values, blocks, currentDay, currentBlockId) {

  const [errors, setErrors] = useState({})
  const [formIsValid, setFormIsValid] = useState(false)
  // If the values, blocks, or current day change, re-validate everything.
  useEffect(() => {
    const [newBlockStart, newBlockEnd] = getBoundaryMinutes({ values })

    /* Turns a block into an object as follows:
    { block: the block in question,
      start: bool, true if block conflicts with start time value
      end: bool, true if block conflicts with end time value
    }
    */
    const makeConflictObject = block => {
      const [blockStartMins, blockEndMins] = getBoundaryMinutes({ block });
      const badStart = (newBlockStart >= blockStartMins &&
        newBlockStart < blockEndMins)
      const badEnd = (newBlockEnd > blockStartMins &&
        newBlockEnd <= blockEndMins);
      return { block, start: badStart, end: badEnd };
    }

    const potentialConflicts = blocks
      .filter(block => blockIsOnDay(block, currentDay))
      .filter(block => block.id !== currentBlockId)

    // Get a single conflict object (if it exists)
    // See previous function for object structure
    const conflicts = potentialConflicts
      .map(makeConflictObject)
      .filter(conflict => conflict.start || conflict.end);

    // If there are any validation errors, store them in an object.
    const newErrors = {
      noProject: !values.project, // True if no project is selected
      endBeforeStart: newBlockStart >= newBlockEnd, // True if end time is earlier than start time
      conflicts
    };

    setErrors(newErrors)
  }, [values, blocks, currentDay, currentBlockId])

  useEffect(() => {
    const valid = Object.values(errors).filter(truthyOrLengthy).length === 0;
    setFormIsValid(valid);
  }, [errors])


  return [errors, formIsValid]
}