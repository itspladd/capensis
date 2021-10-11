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
    const [newBlockStart, newBlockEnd] = getBoundaryMinutes(values)

    const blockIsToday = block => new Date(block.start_time).getDate() === currentDay.getDate();

    const blockConflictsWithCurrentTime = block => {
      const blockStart = new Date(block.start_time);
      const blockEnd = new Date(block.end_time);
      const blockStartMins = minutesSinceMidnight(blockStart.getHours(), blockStart.getMinutes())
      const blockEndMins = minutesSinceMidnight(blockEnd.getHours(), blockEnd.getMinutes())
      const badStart = (newBlockStart >= blockStartMins &&
                        newBlockStart < blockEndMins)
      const badEnd =   (newBlockEnd > blockStartMins &&
                        newBlockEnd <= blockEndMins);
      console.log('looking for conflict with block', block)
      console.log("blockStart", blockStart)
      console.log("blockEnd", blockEnd)
      console.log("blockStartMins", blockStartMins)
      console.log("blockEndMins", blockEndMins)
      console.log("badStart", badStart)
      console.log("badEnd", badEnd)
      return badStart || badEnd;
    }

    const conflicts = blocks.filter(blockIsToday)
    .filter(blockConflictsWithCurrentTime);

    setErrors({
      noProject: !values.project,
      endBeforeStart: (newBlockStart > newBlockEnd),
      conflicts
    })

  }, [values, blocks, currentDay])

  useEffect(() => {
    const valid = Object.values(errors)
      .filter(error => {
        if(Array.isArray(error)) {
          return error.length !== 0;
        } else {
          return error
        }
      })
      .length === 0;
    console.log('form valid: ', valid)
    setFormIsValid(valid);
  }, [errors])


  return [errors, formIsValid]
}