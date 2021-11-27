import { makeTimeString } from '../../../helpers/stringHelpers'

const EN_US = {
  TAG: "EN-US",
  NEW_BLOCK_VALIDATION: {
    conflicts: (conflicts) => {
      const conflictList = conflicts.map(conflict => {
        const {title, start_time, end_time} = conflict.block;
        const startStr = makeTimeString(start_time)
        const endStr = makeTimeString(end_time)
        return `${title}, ${startStr} - ${endStr}`
      })
      conflictList.length && conflictList.unshift("That time conflicts with other block(s):");
      return conflictList;
    },
    noProject: () => "You must select a project.",
    endBeforeStart: () => "That block would end on or before its start time."
  },
  FORM_VALID: "Looks good!",
  FORM_ERRORS: "The following errors were found:",
}

export default EN_US;