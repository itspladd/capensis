import { makeTimeString } from '../../../helpers/stringHelpers'

const EN_US = {
  NEW_BLOCK_VALIDATION: {
    conflict: ({block}) => {
      const {title, start_time, end_time} = block;
      const startStr = makeTimeString(start_time)
      const endStr = makeTimeString(end_time)
      return `This time conflicts with another block: ${title}, ${startStr} - ${endStr}`
    },
    noProject: () => "You must select a project.",
    endBeforeStart: () => "That block would end on or before its start time."
  }
}

export default EN_US;