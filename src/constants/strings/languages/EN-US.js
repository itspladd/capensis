const EN_US = {
  NEW_BLOCK_VALIDATION: {
    conflict: (block) => {
      const {title, start_time, end_time} = block;
      const startStr = new Date(start_time).toLocaleTimeString();
      const endStr = new Date(end_time).toLocaleTimeString();
      return `This time conflicts with another block: ${title}, ${startStr} - ${endStr}`
    },
    noProject: () => "You must select a project.",
    endBeforeStart: () => "That block would end on or before its start time."
  }
}

export default EN_US;