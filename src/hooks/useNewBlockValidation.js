import { useEffect, useState } from 'react';

import { minutesSinceMidnight, getBoundaryMinutes } from '../helpers/timeHelpers'


export default function useNewBlockValidation(values, blocks, currentDay) {

  const [errors, setErrors] = useState({
    noProject: true,
    endBeforeStart: false,
    conflicts: []
  })
  const [formIsValid, setFormIsValid] = useState(false)

  // If the values, blocks, or current day change, re-validate everything.
  useEffect(() => {
    const [newBlockStart, newBlockEnd] = getBoundaryMinutes({values})

    const blockIsToday = block => new Date(block.start_time).getDate() === currentDay.getDate();

    /* Turns a block into an object as follows:
    { block: the block in question,
      start: bool, true if block conflicts with start time value
      end: bool, true if block conflicts with end time value
    }
    */
    const makeConflictObject = block => {
      const [blockStartMins, blockEndMins] = getBoundaryMinutes({block});
      const badStart = (newBlockStart >= blockStartMins &&
                        newBlockStart < blockEndMins)
      const badEnd =   (newBlockEnd > blockStartMins &&
                        newBlockEnd <= blockEndMins);
      return {block, start: badStart, end: badEnd};
    }

    // Get a single conflict object (if it exists)
    // See previous function for object structure
    const conflict = blocks.filter(blockIsToday)
    .map(makeConflictObject)
    .filter(conflict => conflict.start || conflict.end)
    [0];

    setErrors({
      noProject: !values.project,
      endBeforeStart: (newBlockStart >= newBlockEnd),
      conflict
    })

  }, [values, blocks, currentDay])

  useEffect(() => {
    const valid = Object.values(errors)
      .filter(error => !!error) // Keep truthy values (indicating an error exists)
      .length === 0;
    console.log('form valid: ', valid)
    setFormIsValid(valid);
  }, [errors])


  return [errors, formIsValid]
}